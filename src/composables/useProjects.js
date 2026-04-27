import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { utils } from "../utils";

export function useProjects() {

  const { getTokens } = utils()  
  const isModalOpen = ref(false);
  const baseUrl = "http://localhost:3009";

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

   async function getProjects() {
        const { accessToken } = getTokens();
        const res = await fetch(`${baseUrl}/projects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const items = await res.json();
          console.dir(items)
        } else {
          alert("privet");
        }
    }
getProjects()
  return { isModalOpen, openModal, closeModal, Modal };
}
