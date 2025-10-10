import { baseURL } from "./api.js";
import { pedidosRoutes } from "../routes/routes.js";

export default class PedidosService {
    async createRow(requestBody, token) {
        const url = `${baseURL}${pedidosRoutes.postData}`;
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
        const url = `${baseURL}${pedidosRoutes.fetchData}`;
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

    async fetchByID(id, token) {
        const url = `${baseURL}${pedidosRoutes.fetchById}/${id}`;
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
            throw `Row With ID: ${id} doesn't exist`;
        }
    }

    async updateRow(id, requestBody, token) {
        const url = `${baseURL}${pedidosRoutes.update}/${id}`;
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
            throw `Row With ID: ${id} doesn't exist`;
        }
    }

    async deleteRow(id, token) {
        const url = `${baseURL}${pedidosRoutes.delete}/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            throw `Row With ID: ${id} doesn't exist`;
        }
    }
}
