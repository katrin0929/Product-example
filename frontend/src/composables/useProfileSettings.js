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
      "phone"
    ];
    const addressFields = [
      "line1",
      "line2",
      "region",
      "city",
      "country",
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

  return {  getUserById, saveChange };
}



