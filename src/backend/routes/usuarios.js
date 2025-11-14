import { app, connection } from "../server/server.js";
import { userRoutes } from "./routes.js";
import Crud from "./crud.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../auth/auth.js";

async function hashPassword(req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    } catch (error) {
        res.status(501).send();
    }
}

async function setUsersRoutes() {
    const tableName = "usuarios";
    const crud = new Crud(tableName, connection);

    app.post(
        userRoutes.postData,
        authenticateToken,
        async (request, response) => {
            await hashPassword(request, response);
            const body = request.body;
            await crud.setPost(body, response);
        }
    );

    app.get(
        userRoutes.fetchData,
        authenticateToken,
        async (request, response) => {
            await crud.setFetch(response);
        }
    );

    app.get(
        `${userRoutes.fetchById}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setFetchById(id, response);
        }
    );

    app.put(
        `${userRoutes.update}/:id`,
        authenticateToken,
        async (request, response) => {
            if (request.body.password !== null) {
                await hashPassword(request, response);
            }
            const id = request.params.id;
            const body = request.body;
            await crud.setUpdate(id, body, response);
        }
    );

    app.delete(
        `${userRoutes.delete}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setDelete(id, response);
        }
    );

    app.get(
        `${userRoutes.fetchByName}/:name`,
        authenticateToken,
        async (request, response) => {
            const name = request.params.name;
            await crud.setFetchByName(name, response);
        }
    );

    app.get(
        `${userRoutes.fetchByEmail}/:email`,
        authenticateToken,
        async (request, response) => {
            const email = request.params.email;
            await crud.setFetchByEmail(email, response);
        }
    );
}

export { setUsersRoutes };
