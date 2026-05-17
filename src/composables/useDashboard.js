import { ref } from 'vue'
import  router  from '../router/index'
import { utils } from '../utils'

export function useDashboard() {

 
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const password = ref('')
  const checkbox = ref(false)
  const { getTokens } = utils()

    async function getMe() {
        const { accessToken } = getTokens()
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
        })

        return await res.json()
    }

  return { baseUrl, email, password, checkbox, signIn}
  
}
