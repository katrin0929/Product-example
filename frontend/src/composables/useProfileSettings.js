import { ref } from "vue";
import { utils } from "../utils";
import router from "../router/index";


export function useProfileSettings() {
  const baseUrl = "http://localhost:3009";
  const { getTokens, clearTokens, uploadFile } = utils();
  let defaultState = {};
  const error = ref(null);

  function authJsonHeaders() {
    const { accessToken } = getTokens();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }

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
      }
      return acc;
    }, {});

    const data = { ...data1, address: data2 };
    const res = await fetch(`${baseUrl}/me`, {
      method: "PATCH",
      headers: authJsonHeaders(),
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
    const res = await fetch(`${baseUrl}/me`, {
      method: "GET",
      headers: authJsonHeaders(),
    });
    const user = await res.json();
    defaultState = { ...user };
    return user;
  }

  async function uploadAvatar(file) {
    if (!file) return false;
    error.value = null;

    const msg = await uploadFile(file, "avatar");
    if (msg) {
      error.value = msg;
      return false;
    }
    return true;
  }

  async function saveEmail(newEmail) {
    error.value = null;
    const res = await fetch(`${baseUrl}/me/change-email`, {
      method: "POST",
      headers: authJsonHeaders(),
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
    const res = await fetch(`${baseUrl}/me/confirm-email-change`, {
      method: "POST",
      headers: authJsonHeaders(),
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
    const res = await fetch(`${baseUrl}/me/change-password`, {
      method: "POST",
      headers: authJsonHeaders(),
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
    const res = await fetch(`${baseUrl}/me`, {
      method: "DELETE",
      headers: authJsonHeaders(),
    });
    if (!res.ok) {
      error.value = await readError(res, `Account deletion failed (${res.status})`);
      return false;
    }

    clearTokens();
    router.push("/reg");
    return true;
  }

  return { getUserById, saveChange, uploadAvatar, error, saveEmail, saveOTP, savePass, deleteAccount };
}
