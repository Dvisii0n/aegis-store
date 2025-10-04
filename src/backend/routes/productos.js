import { app, connection } from "../server/server.js";
import { productosRoutes } from "./routes.js";
import Crud from "./crud.js";

async function setProductosRoutes() {
    const tableName = "productos";
    const crud = new Crud(tableName, connection);

    app.post(productosRoutes.postData, async (request, response) => {
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(productosRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(`${productosRoutes.fetchById}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setFetchById(id, response);
    });

    app.put(`${productosRoutes.update}/:id`, async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(`${productosRoutes.delete}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setDelete(id, response);
    });
}

export { setProductosRoutes };
