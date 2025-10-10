import { baseURL } from "./api.js";
import { userRoutes } from "../routes/routes.js";

export default class UsuariosService {
    async createRow(requestBody, token) {
        const url = `${baseURL}${userRoutes.postData}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchRows(token) {
        const url = `${baseURL}${userRoutes.fetchData}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    async fetchByID(id, token) {
        const url = `${baseURL}${userRoutes.fetchById}/${id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateRow(id, requestBody, token) {
        const url = `${baseURL}${userRoutes.update}/${id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteRow(id, token) {
        const url = `${baseURL}${userRoutes.delete}/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchByName(name, token) {
        const url = `${baseURL}${userRoutes.fetchByName}/${name}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}
