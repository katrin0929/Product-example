import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { utils } from "../utils";

export function useProjects() {

  const { getTokens } = utils() 
  const isModalOpen = ref(false);
  const baseUrl = "http://localhost:3009"
  const isDownloading = ref(false);


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
          return await res.json();
        } else {
          alert("privet");
        }
    }
  async function deleteProj(projectId) {
    const { accessToken } = getTokens();
    if (isDownloading.value) return;
    isDownloading.value = true;

    try {
      return await fetch(`${baseUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } finally {
      isDownloading.value = false;
    }
  } 

  return { isModalOpen, openModal, closeModal, Modal, getProjects, deleteProj };
}
