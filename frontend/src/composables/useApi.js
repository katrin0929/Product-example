import { utils } from "../utils";
import router from "../router/index";

const BASE_URL = "http://localhost:3009";

// Единая реакция на 401 с защищённой страницы: чистим токены и уводим на логин.
export function handleUnauthorized() {
  utils().clearTokens();
  if (router.currentRoute.value.name !== "LogIn") {
    router.push("/LogIn");
  }
}

// Обёртка над fetch для авторизованных запросов: подставляет свежий Bearer
// и на 401 делает handleUnauthorized. Возвращает сырой Response —
// вызывающий код сохраняет свою логику res.ok / res.json() / blob.
export async function authFetch(url, options = {}) {
  const tokens = utils().getTokens();
  const headers = { ...(options.headers || {}) };
  if (tokens?.accessToken) {
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    handleUnauthorized();
  }
  return res;
}

// Загрузка файла в /me/<uploadPath>. Возвращает null при успехе или строку ошибки.
export async function uploadFile(file, uploadPath, extraFields = {}) {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  for (const [key, value] of Object.entries(extraFields)) {
    formData.append(key, value);
  }

  try {
    // FormData: Content-Type с boundary выставит браузер, Authorization — authFetch

    const res = await authFetch(`${BASE_URL}/me/${uploadPath}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message || `Upload failed (${res.status})`);
    }
  } catch (e) {
    return e.message;
  }
  return null;
}
