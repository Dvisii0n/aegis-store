import { authApp } from "./authServer.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import UsuariosService from "../services/usuariosService.js";

async function setAuthRoutes() {
    const usersService = new UsuariosService();

    authApp.post("/login", async (req, res) => {
        const user = await usersService.fetchByName(req.body.name);

        if (user === null) {
            return res.status(400).send("Cannot find user");
        }

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send("Login Successful");
            } else {
                res.send("Wrong password");
            }
        } catch (error) {
            res.status(500).send();
        }
    });
}

export { setAuthRoutes };
