import { ref } from 'vue'
import { utils } from '../utils'


export function useVerify() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const otp = ref('') 
  const { getData } = utils()

function getDataFromLocalStorage() {
    const data = getData()
    email.value = data.email,
    otp.value = data.otp   
}

  async function verify() { 
    getDataFromLocalStorage()
    const res = await fetch(`${baseUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            code: otp.value
        })
    });
    
    return await res.json()
  }
  
  return { verify }
}