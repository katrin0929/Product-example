import { ref } from "vue";
import { utils } from "../utils";


export function useProfileSettings() {
  const baseUrl = "http://localhost:3009";
  const { getTokens } = utils();
  let defaultState = {};
  const error = ref(null);
  const formData = new FormData();
  const OTPcode = ref('')
  

  function authHeaders() {
    const tokens = getTokens();
    return tokens?.accessToken
      ? { Authorization: `Bearer ${tokens.accessToken}` }
      : {};
  }

  async function saveChange(userSettings) {
    const { accessToken } = getTokens();
    
    const fields = [
      "name",
      "phone",
      "avatarUrl"
    ];
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

       try {
         const res = await fetch(`${baseUrl}/me/avatar`, {
           method: "POST",
           headers: { ...authHeaders() },
           body: formData,
         });
         if (!res.ok) throw new Error(`Upload failed (${res.status})`);
       } catch (e) {
         error.value = e.message;
       }
    const data = { ...data1, address: data2 };
    const res = await fetch(`${baseUrl}/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  }

  async function getUserById() {
    const { accessToken } = getTokens();
    const res = await fetch(`${baseUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = await res.json();
    defaultState = { ...user };
    return user;
  }

  function uploadAvatar(file) {
    if (!file) return;
    formData.append("file", file);
  }

  // function addDocument(file) {
  //   if (!file) return;
  //   formData.append("file", file);
  // }

  async function saveEmail(newEmail) {
    const { accessToken } = getTokens();
    const res = await fetch(`${baseUrl}/me/change-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        newEmail
      })
      
    });
    
    const data = await res.json();
    OTPcode.value = data.code;
  }

  async function saveOTP() {
    const { accessToken } = getTokens();
    const res = await fetch(`${baseUrl}/me/confirm-email-change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        code: OTPcode.value,
      }),
    });
    return await res.json();
  }

  async function savePass(currentPassword, newPassword) {    
    const { accessToken } = getTokens();
    const res = await fetch(`${baseUrl}/me/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
      const data = await res.json();
      return data;
  }

  async function deleteAccount() {
        const { accessToken } = getTokens();
        const res = await fetch(`${baseUrl}/me`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        return data;
  }



  return {  getUserById, saveChange, uploadAvatar, error, saveEmail, saveOTP, savePass, deleteAccount };
}



