export function utils() {
    let data = JSON.parse(localStorage.getItem('data'))
    return {
        getData:() => {return data},
        setData:(email, otp) => {
            data = {email, otp}
            localStorage.setItem('data', JSON.stringify(data))
        }
    }
}