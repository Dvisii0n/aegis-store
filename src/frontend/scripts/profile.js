import UsuariosService from "../../backend/services/usuariosService.js";
import { getAccessToken, getUserID } from "./utils.js";

const users = new UsuariosService();

async function getUserData() {
    const accessToken = getAccessToken();
    const userID = getUserID();
    return await users.fetchByID(userID, accessToken);
}

(async function renderUserData() {
    const name = document.querySelector("#profile-name");
    const email = document.querySelector("#profile-email");
    const profileNum = document.querySelector("#profile-num");
    const profileAddress = document.querySelector("#profile-address");
    try {
        const data = await getUserData();
        name.value = data.nombre;
        email.value = data.email;
        profileNum.value = data.telefono;
        profileAddress.value = data.direccion;
    } catch (error) {
        window.location.href = "../pages/login.html";
    }
})();
