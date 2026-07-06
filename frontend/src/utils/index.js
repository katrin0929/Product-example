export function utils() {
    let data = JSON.parse(localStorage.getItem('data'))
    let tokens = JSON.parse(localStorage.getItem('tokens'))
    let formData = new FormData();
    const BASE_URL = "http://localhost:3009";
    let uploadPath = "";

    return {

      getData: () => {
        return data;
      },
      setData: (email, otp) => {
        data = { email, otp };
        localStorage.setItem("data", JSON.stringify(data));
      },
      getTokens: () => {
        return tokens;
      },
      setTokens: (accessToken, refreshToken, expiresIn) => {
        tokens = { accessToken, refreshToken, expiresIn };
        localStorage.setItem("tokens", JSON.stringify(tokens));
      },

      uploadFile: async (file, isDocuments = true) => {
        if (!file) return;
  
        if (!formData.values().length) {
            formData.append("file", file);
        }

        uploadPath = isDocuments ? "documents" : "avatar";

        try {
            const res = await fetch(`${BASE_URL}/me/${uploadPath}`, {
                method: "POST",
                headers:  {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
                body: formData,
            });
            if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        } catch (e) {
            return e.message;
        } 
        return false
      }
    };
}