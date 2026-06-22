import { ref } from "vue";
import { utils } from "../utils";


export function useProfileSettings() {
  const baseUrl = "http://localhost:3009";
  const { getTokens } = utils();
  let defaultState = {};


  async function saveChange(userSettings) {
    const { accessToken } = getTokens();
    const fields = [
      "name",
      "phone",
      "address",
      "address.region",
      "address.city",
      "address.country",
    ];
    const data = fields.reduce((acc, field) => {
      if (defaultState[field] !== userSettings[field]) {
        acc[field] = userSettings[field];
      }
      return acc;
    }, {});
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

  return {  getUserById, saveChange };
}



