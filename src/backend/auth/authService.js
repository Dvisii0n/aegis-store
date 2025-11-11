import { baseURL } from "../services/api.js";
import { authRoutes } from "./authRoutes.js";

export default class AuthService {
    async userLogin(requestBody) {
        const url = `${baseURL}/auth${authRoutes.login}`;
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
        const url = `${baseURL}/auth${authRoutes.signup}`;
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
        const url = `${baseURL}/auth${authRoutes.token}`;
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
        const url = `${baseURL}/auth${authRoutes.logout}`;
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
