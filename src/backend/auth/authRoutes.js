import { authApp } from "./authServer.js";

import UsuariosService from "../services/usuariosService.js";

async function setAuthRoutes() {
    const usersService = new UsuariosService();

    authApp.post("/users/login", async (req, res) => {
        const user = usersService.fetchByName("mehashearon");
    });
}
