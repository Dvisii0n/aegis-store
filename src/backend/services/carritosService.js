import { baseURL } from "./api.js";
import { carritosRoutes } from "../routes/routes.js";

export default class CarritosService {
    async createRow(requestBody, token) {
        const url = `${baseURL}${carritosRoutes.postData}`;
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
        const url = `${baseURL}${carritosRoutes.fetchData}`;
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
        const url = `${baseURL}${carritosRoutes.fetchById}/${id}`;
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
        const url = `${baseURL}${carritosRoutes.update}/${id}`;
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
        const url = `${baseURL}${carritosRoutes.delete}/${id}`;
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

    async cartExists(userID, token) {
        const url = `${baseURL}${carritosRoutes.cartExists}/${userID}`;
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
            throw `Row With ID: ${userID} doesn't exist`;
        }
    }

    async fetchByUserID(userID, token) {
        const url = `${baseURL}${carritosRoutes.fetchByUserID}/${userID}`;
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
            throw `Row With ID: ${userID} doesn't exist`;
        }
    }
}
