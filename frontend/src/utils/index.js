export function utils() {
    let data = JSON.parse(localStorage.getItem('data'))
    let tokens = JSON.parse(localStorage.getItem('tokens'))
    const baseUrl = "http://localhost:3009";

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
      setTokens: (accessToken, refreshToken, expiresIn, checkbox, time) => {
        tokens = { accessToken, refreshToken, expiresIn, checkbox, time };
        localStorage.setItem("tokens", JSON.stringify(tokens));
      },
      clearTokens: () => {
        tokens = null;
        data = null;
        localStorage.removeItem("tokens");
        localStorage.removeItem("data");
      },
      refreshTokens: async () => {
        const { accessToken, refreshToken, expiresIn, checkbox, time } = tokens;
        const res = await fetch(`${baseUrl}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken,
          }),
        });

        const data = await res.json();
        console.log(data.tokens);
        return utils().setTokens(
          data.tokens.accessToken,
          data.tokens.refreshToken,
          data.tokens.expiresIn,
          checkbox,
          time,
        );
      },

      checkLoginSave: () => {
        if (!tokens) return false;
        const { checkbox, time } = tokens;
        const now = Date.now();

        return checkbox && now - time < 30 * 24 * 3600 * 1000;
      },

      checkLoginSaveForDay: () => {
        if (!tokens) return false;
        const { time } = tokens;
        const now = Date.now();

        return now - time < 24 * 3600 * 1000;
      },

      isNeedRefreshTokens: async () => {
        if (!tokens) return utils().clearTokens();

        const { checkbox } = tokens;
        const isUnder24Hours = utils().checkLoginSaveForDay();
        const isUnder30Days = utils().checkLoginSave();

        if (checkbox && !isUnder30Days) {
          return utils().clearTokens();
        }

        if (!isUnder24Hours) {
          await utils().refreshTokens();
        }
      },
    };


}
