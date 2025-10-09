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
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async registerUser(requestBody) {
        const url = `${authBaseUrl}${authRoutes.signup}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getNewAccessToken(refreshTokenObj) {
        const url = `${authBaseUrl}${authRoutes.token}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(refreshTokenObj),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async logout(refreshTokenObj) {
        const url = `${authBaseUrl}${authRoutes.logout}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(refreshTokenObj),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}
