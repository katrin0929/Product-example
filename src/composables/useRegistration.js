import { ref } from 'vue'

export function useRegistration() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const password = ref('')
  const confirm = ref('')
  const checkbox = ref(false)



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
    });
    
    

    return await res.json()
  }

  return { baseUrl, email, password, confirm, checkbox, createAccount}
  
}
