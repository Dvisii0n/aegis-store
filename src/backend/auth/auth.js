import { authApp } from "./authServer.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authRoutes } from "./authRoutes.js";

import UsuariosService from "../services/usuariosService.js";

async function setAuthRoutes() {
    const usersService = new UsuariosService();

    authApp.post(authRoutes.login, async (req, res) => {
        const user = await usersService.fetchByName(req.body.nombre);

        if (user === null) {
            res.statusMessage = "User does not exist";
            return res.status(400).send();
        }

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.statusMessage = "Login Succesful";
                res.send();
            } else {
                res.statusMessage = "Password does not match user";
                res.send();
            }
        } catch (error) {
            res.status(500).send();
        }
    });
}

export { setAuthRoutes };
