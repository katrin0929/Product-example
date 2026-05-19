import router from "../router/index";
import { ref } from "vue";
import { utils } from "../utils";


export function useProjectEdit() {
    const baseUrl = "http://localhost:3009";
    const { getTokens } = utils()


    function goToSettings(id) {
        router.push(`/ProjSet/${id}`);
        
    }

   async function saveChange(projectId, projectSettings) {
    const projSet = Object.assign({}, projectSettings)
    console.log(projSet.title);
    
     const { accessToken } = getTokens();
     const res = await fetch(`${baseUrl}/projects/${projectId}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${accessToken}`,
       },
       body: JSON.stringify({
         title: projectSettings.title,
         status: projectSettings.status,
         description: projectSettings.description,
         team: ["usr_4ed9f3d9"],
         icon: "string",
       }),
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
        
        return await res.json();
    }
    
    return { goToSettings, getProjectById, saveChange };
}



