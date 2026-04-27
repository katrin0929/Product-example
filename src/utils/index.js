export function utils() {
    let data = JSON.parse(localStorage.getItem('data'))
    let tokens = JSON.parse(localStorage.getItem('tokens'))
    return {
        getData:() => {return data},
        setData:(email, otp) => {
            data = {email, otp}
            localStorage.setItem('data', JSON.stringify(data))
        },
        getTokens:() => {return tokens},
        setTokens:(accessToken, refreshToken, expiresIn) => {
            tokens = {accessToken, refreshToken, expiresIn}
            localStorage.setItem('tokens', JSON.stringify(tokens))
        }
    }
}