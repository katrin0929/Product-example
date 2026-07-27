import { ref } from 'vue'
import { utils } from '../utils'
import  router  from '../router/index'

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

     if (res.ok) {
      const data = await res.json()
      setData(email.value, data.code);
      router.push('/Verify');
      }
    

  }

  async function handleSubmit() {
    await createAccount();
  }

  return { baseUrl, email, password, confirm, checkbox, createAccount, handleSubmit }
}
