import { ref } from "vue";
import { utils } from "../utils";

export function useDropdown() {
  const baseUrl = "http://localhost:3009";
  const { getTokens } = utils();
  let defaultState = {};

  function authJsonHeaders() {
    const { accessToken } = getTokens();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }



  return {  }
}
