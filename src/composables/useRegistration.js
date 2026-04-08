import { ref } from 'vue'
import { utils } from '../utils'

export function useRegistration() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const password = ref('')
  const confirm = ref('')
  const checkbox = ref(false)
  const { setData } = utils()


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

  async function handleSubmit() {
    const res = await createAccount();
    console.log(res);
    setData(email.value, res.code)
  }

  return { baseUrl, email, password, confirm, checkbox, createAccount, handleSubmit }
}
