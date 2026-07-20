import router from "../router/index";
import { authFetch } from "./useApi";


export function useProjectEdit() {
    const baseUrl = "http://localhost:3009";
    let defaultState = {}



    function openProjectEdit(id) {
      router.push(`/ProjSet/${id}`);
    }
    

   async function saveChange(projectId, projectSettings) {
    console.log(`вызов из useProjectEdit - ${JSON.stringify(projectSettings)}`);
    const fields = ["title", "status", "description"];
    const data = fields.reduce((acc, field) => {
    if (defaultState[field] !== projectSettings[field]) {
        acc[field] = projectSettings[field];
    }
    return acc;
    }, {});
     const res = await authFetch(`${baseUrl}/projects/${projectId}`, {
       method: "PATCH",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });

     return await res.json();
   }

   async function getProjectById(projectId) {
        const res = await authFetch(`${baseUrl}/projects/${projectId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const project = await res.json();
        defaultState = {...project}
        return project
    }
    
    return { openProjectEdit, getProjectById, saveChange };
}



