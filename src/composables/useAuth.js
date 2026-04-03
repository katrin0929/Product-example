import { ref } from 'vue'

export function useAuth() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const password = ref('')
  const checkbox = ref(false)

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
        return await res.json()
    }

  return { baseUrl, email, password, checkbox, signIn}
  
}