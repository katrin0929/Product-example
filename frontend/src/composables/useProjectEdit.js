import router from "../router/index";
import { ref } from "vue";
import { utils } from "../utils";


export function useProjectEdit() {
    const baseUrl = "http://localhost:3009";
    const { getTokens } = utils()
    let defaultState = {}



    function openProjectEdit(id) {
      router.push(`/ProjSet/${id}`);
    }

   async function saveChange(projectId, projectSettings) {
    
    
     const { accessToken } = getTokens();
    const fields = ["title", "status", "description"];
    const data = fields.reduce((acc, field) => {
    if (defaultState[field] !== projectSettings[field]) {
        acc[field] = projectSettings[field];
    }
    return acc;
    }, {});
     const res = await fetch(`${baseUrl}/projects/${projectId}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
       },
       body: JSON.stringify(data),
     });

     return await res.json();
   }

   async function getProjectById(projectId) {
        const { accessToken } = getTokens();
        const res = await fetch(`${baseUrl}/projects/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        const project = await res.json();
        defaultState = {...project}
        return project
    }
    
    return { openProjectEdit, getProjectById, saveChange };
}



