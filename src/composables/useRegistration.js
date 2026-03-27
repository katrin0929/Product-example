import { ref } from 'vue'

export function useRegistration() {
  const baseUrl = "http://localhost:3000"
  const email = ref('')
  const password = ref('')
  const confirm = ref('')
  const checkbox = ref(false)

// спросить про Promise (как сделать то же самое с помощью промис)

  async function createAccount() {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: confirm.value
      }),
    })
    return await res.json()
  }

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


  return { baseUrl, email, password, confirm, checkbox, createAccount, signIn}
  
}
