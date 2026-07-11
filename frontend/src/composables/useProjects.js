import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { authFetch } from "./useApi";

export function useProjects() {

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
        const res = await authFetch(`${baseUrl}/projects`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          return await res.json();
        }
        return [];
    }
  async function deleteProj(projectId) {
    if (isDownloading.value) return;
    isDownloading.value = true;

    try {
      return await authFetch(`${baseUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      isDownloading.value = false;
    }
  }

  return { isModalOpen, openModal, closeModal, Modal, getProjects, deleteProj };
}
