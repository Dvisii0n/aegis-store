import { baseURL } from "../../backend/services/api.js";

export function createWaitingElement() {
    const svg = document.createElement("img");
    svg.className = "waiting-svg";
    svg.src = "../assets/svg/loading.svg";
    svg.height = "40";
    svg.width = "40";
    return svg;
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function getUserID() {
    return localStorage.getItem("userID");
}

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    hours = String(hours).padStart(2, "0");

    const formatted = `${day}/${month}/${year} ${hours}:${minutes} ${suffix}`;
    return formatted;
}

export function setIsLoggedState() {
    const isLogged = localStorage.getItem("userID");
    if (isLogged !== null) {
        const profileLink = document.querySelector(".profile-link > a");
        profileLink.href = "profile.html";
    }
}

export function setRoleState() {
    const role = localStorage.getItem("role");

    if (role === "admin") {
        const navbar = document.querySelector("#navbar");
        const button = document.createElement("button");
        button.className = "admin-btn";
        button.textContent = "Administrar Tienda";
        navbar.appendChild(button);
    }
}

export async function requestPgFunction(endpoint, stats) {
    const token = getAccessToken();
    let url = `${baseURL}/stats/${endpoint}`;

    if (!stats) {
        url = `${baseURL}/${endpoint}`;
    }

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

export function buildDescription(itemsData) {
    let desc = "";
    itemsData.forEach((item) => {
        desc = desc.concat(`${item.name} x${item.quantity}\n`);
    });

    return desc;
}
