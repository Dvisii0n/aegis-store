import { app, connection } from "../server/server.js";
import { userRoutes } from "./routes.js";
import Crud from "./crud.js";
import bcrypt from "bcrypt";

async function setUsersRoutes() {
    const tableName = "usuarios";
    const crud = new Crud(tableName, connection);

    async function hashPassword(req, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
        } catch (error) {
            res.status(501).send();
        }
    }

    app.post(userRoutes.postData, async (request, response) => {
        await hashPassword(request, response);
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(userRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(`${userRoutes.fetchById}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setFetchById(id, response);
    });

    app.put(`${userRoutes.update}/:id`, async (request, response) => {
        if (request.body.password !== null) {
            await hashPassword(request, response);
        }
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(`${userRoutes.delete}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setDelete(id, response);
    });

    app.get(`${userRoutes.fetchByName}/:name`, async (request, response) => {
        const name = request.params.name;
        await crud.setFetchByName(name, response);
    });
}

export { setUsersRoutes };
