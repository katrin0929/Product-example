import { ref } from "vue";
import { utils } from "../utils";
import { authFetch, uploadFile } from "./useApi";
import router from "../router/index";


export function useProfileSettings() {
  const baseUrl = "http://localhost:3009";
  const { clearTokens, isNeedRefreshTokens } = utils();
  let defaultState = {};
  const error = ref(null);
  const isDownloading = ref(false)

  const jsonHeaders = { "Content-Type": "application/json" };

  async function readError(res, fallback) {
    const body = await res.json().catch(() => null);
    return body?.message || fallback;
  }

  async function saveChange(userSettings) {
    error.value = null;

    const fields = ["name", "phone"];
    const addressFields = [
      "line1",
      "line2",
      "region",
      "city",
      "country",
      "postalCode"
    ]
    const data1 = fields.reduce((acc, field) => {
      if (defaultState[field] !== userSettings[field]) {
        acc[field] = userSettings[field];
      }
      return acc;
    }, {});
    const defaultAddress = defaultState['address'] ?? {};
    const userAddress = userSettings['address'] ?? {};
    const data2 = addressFields.reduce((acc, field) => {
      if (defaultAddress[field] !== userAddress[field]) {
        acc[field] = userAddress[field];
      } else {
        acc[field] = defaultAddress[field];
      }
      return acc;
    }, {});

    const data = { ...data1, address: data2 };
    isNeedRefreshTokens()
    const res = await authFetch(`${baseUrl}/me`, {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      error.value = await readError(res, `Save failed (${res.status})`);
      return null;
    }

    const user = await res.json();
    defaultState = { ...user };
    return user;
  }

  async function getUserById() {
    isNeedRefreshTokens();
    const res = await authFetch(`${baseUrl}/me`, {
      method: "GET",
    });
    const user = await res.json();
    defaultState = { ...user };
    return user;
  }

  async function uploadAvatar(file) {
    if (!file) return false;
    error.value = null;
    isNeedRefreshTokens();
    const msg = await uploadFile(file, "avatar");
    if (msg) {
      error.value = msg;
      return false;
    }
    return true;
  }

  async function saveEmail(newEmail) {
    error.value = null;
    isNeedRefreshTokens();
    const res = await authFetch(`${baseUrl}/me/change-email`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ newEmail }),
    });
    if (!res.ok) {
      error.value = await readError(res, `Email change failed (${res.status})`);
      return false;
    }
    return true;
  }

  async function saveOTP(code) {
    error.value = null;
    isNeedRefreshTokens();
    const res = await authFetch(`${baseUrl}/me/confirm-email-change`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ code }),
    });
    if (!res.ok) {
      error.value = await readError(res, `Confirmation failed (${res.status})`);
      return false;
    }
    return true;
  }

  async function savePass(currentPassword, newPassword) {
    error.value = null;
    isNeedRefreshTokens();
    const res = await authFetch(`${baseUrl}/me/change-password`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
    if (!res.ok) {
      error.value = await readError(res, `Password change failed (${res.status})`);
      return false;
    }
    return true;
  }

  async function deleteAccount() {
    error.value = null;
    isNeedRefreshTokens();
    const res = await authFetch(`${baseUrl}/me`, {
      method: "DELETE",
    });
    if (!res.ok) {
      error.value = await readError(res, `Account deletion failed (${res.status})`);
      return false;
    }

    clearTokens();
    router.push("/reg");
    return true;
  }

   async function downloadDocument(documentId) {
     if (isDownloading.value) return;
     isDownloading.value = true;

     try {
       isNeedRefreshTokens();
       return await authFetch(`${baseUrl}/me/documents/${documentId}`, {
         method: "GET",
       });
     } finally {
       isDownloading.value = false;
     }
   }

   async function deleteDocument(documentId) {
     if (isDownloading.value) return;
     isDownloading.value = true;

     try {
       await isNeedRefreshTokens();
       return await authFetch(`${baseUrl}/me/documents/${documentId}`, {
         method: "DELETE",
       });
     } finally {
       isDownloading.value = false;
     }
   }


  return {
    getUserById,
    saveChange,
    uploadAvatar,
    error,
    saveEmail,
    saveOTP,
    savePass,
    deleteAccount,
    downloadDocument,
    deleteDocument,
  };
}
