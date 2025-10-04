import { app, connection } from "../server/server.js";
import { carritosRoutes } from "./routes.js";
import Crud from "./crud.js";

async function setCarritosRoutes() {
    const tableName = "carritos";
    const crud = new Crud(tableName, connection);

    app.post(carritosRoutes.postData, async (request, response) => {
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(carritosRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(`${carritosRoutes.fetchById}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setFetchById(id, response);
    });

    app.put(`${carritosRoutes.update}/:id`, async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(`${carritosRoutes.delete}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setDelete(id, response);
    });
}

export { setCarritosRoutes };
