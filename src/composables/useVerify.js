import { ref } from 'vue'
import { utils } from '../utils'


export function useVerify() {
  const baseUrl = "http://localhost:3009"
  const email = ref('')
  const otp = ref('') 
  const {getData} = utils()

//   написать  функцию которая забирает данные из локал стор по ключу дата , получаем емейл и отп и записываем эти значения в емейл велью и отп велью
function getDataFromLocalStorage() {
    const data = getData()
    email.value = data.email,
    otp.value = data.otp   
}

  async function verify() {
    // вызов функции 
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