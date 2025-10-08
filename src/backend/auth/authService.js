import { authBaseUrl } from "./authApi.js";
import { authRoutes } from "./authRoutes.js";

export default class AuthService {
    async userLogin(requestBody) {
        const url = `${authBaseUrl}${authRoutes.login}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            return response.statusText;
        } catch (error) {
            throw error;
        }
    }
}
