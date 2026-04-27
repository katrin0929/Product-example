import { ref } from 'vue'
import  router  from '../router/index'
import { utils } from '../utils'

export function useAuth() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const password = ref('')
  const checkbox = ref(false)
  const { setTokens } = utils()

    async function signIn() {
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
        })

        
        if (res.ok) {
            const { tokens } = await res.json()
            const { accessToken, refreshToken, expiresIn } = tokens
            setTokens(accessToken, refreshToken, expiresIn)
            router.push('/Dashboard');
        } else {
            alert("privet")
        }
    }

  return { baseUrl, email, password, checkbox, signIn}
  
}