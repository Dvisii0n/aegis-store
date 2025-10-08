import { baseURL } from "./api.js";
import { userRoutes } from "../routes/routes.js";

export default class UsuariosService {
    async createRow(requestBody) {
        const url = `${baseURL}${userRoutes.postData}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            throw error;
        }
    }

    async fetchRows() {
        const url = `${baseURL}${userRoutes.fetchData}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async fetchByID(id) {
        const url = `${baseURL}${userRoutes.fetchById}/${id}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw `Row With ID: ${id} doesn't exist`;
        }
    }

    async updateRow(id, requestBody) {
        const url = `${baseURL}${userRoutes.update}/${id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        } catch (error) {
            throw `Row With ID: ${id} doesn't exist`;
        }
    }

    async deleteRow(id) {
        const url = `${baseURL}${userRoutes.delete}/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            throw `Row With ID: ${id} doesn't exist`;
        }
    }

    async fetchByName(name) {
        const url = `${baseURL}${userRoutes.fetchByName}/${name}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return null;
        }
    }
}
