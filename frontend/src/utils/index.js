export function utils() {
    let data = JSON.parse(localStorage.getItem('data'))
    let tokens = JSON.parse(localStorage.getItem('tokens'))
    const BASE_URL = "http://localhost:3009";

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
      clearTokens: () => {
        tokens = null;
        data = null;
        localStorage.removeItem("tokens");
        localStorage.removeItem("data");
      },

      // Returns null on success, an error message string on failure
      uploadFile: async (file, uploadPath, extraFields = {}) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("file", file);
        for (const [key, value] of Object.entries(extraFields)) {
          formData.append(key, value);
        }

        try {
            const res = await fetch(`${BASE_URL}/me/${uploadPath}`, {
                method: "POST",
                headers:  {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
                body: formData,
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `Upload failed (${res.status})`);
            }
        } catch (e) {
            return e.message;
        }
        return null;
      }
    };
}
