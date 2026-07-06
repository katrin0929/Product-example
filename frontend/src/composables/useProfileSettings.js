import { ref } from "vue";
import { utils } from "../utils";
import router from "../router/index";


export function useProfileSettings() {
  const baseUrl = "http://localhost:3009";
  const { getTokens, uploadFile } = utils();
  let defaultState = {};
  const error = ref(null);
  const OTPcode = ref('')
  

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

  async function uploadAvatar(file) {
    if (!file) return;
    await uploadFile(file, false)
  }

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

    if (res.status === 204) {
      return { success: true };
    }

    const data = await res.json();
    return data;
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

      if (res.status === 204) {
        return { success: true };
      }

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
        if(res.ok) {
          router.push("/reg");
        }
        const data = await res.json();
        return data;
  }

  async function uploadDocument(file) {

    const msg = await uploadFile(file);

  }



  return {  getUserById, saveChange, uploadAvatar, error, saveEmail, saveOTP, savePass, deleteAccount, uploadDocument };
}



