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
