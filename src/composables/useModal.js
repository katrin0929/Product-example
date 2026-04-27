import { ref } from "vue";
import router from "../router/index";
import { utils } from "../utils";

export function useModal() {
    const baseUrl = "http://localhost:3009"
    const projName = ref('')
    const projDescription = ref('')
    const radioPublic = ref(true)
    const radioPrivate = ref(false)
    const { getTokens } = utils()

    async function createProj() {
        const { accessToken } = getTokens();
        if (projName && projDescription) {
            router.push("/ProjSet");
            const res = await fetch(`${baseUrl}/projects`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: projName.value,
            description: projDescription.value
          })
        });
        

        } else {
            alert("Обязательные поля не заполнены")
        }
        
    }
    return { baseUrl, projName, projDescription, radioPrivate, radioPublic, createProj }

}