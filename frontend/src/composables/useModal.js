import { ref } from "vue";
import router from "../router/index";
import { authFetch } from "./useApi";

export function useModal() {
    const baseUrl = "http://localhost:3009"
    const projName = ref('')
    const projDescription = ref('')
    const radioPublic = ref(true)
    const radioPrivate = ref(false)

    async function createProj() {
        if (projName && projDescription) {
            router.push("/Projects");
            const res = await authFetch(`${baseUrl}/projects`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: projName.value,
            description: projDescription.value
          })
        });
        return await res.json();


        } else {
            alert("Обязательные поля не заполнены")
        }

    }
    return { baseUrl, projName, projDescription, radioPrivate, radioPublic, createProj }

}