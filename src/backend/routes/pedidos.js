import { app, connection } from "../server/server.js";
import { pedidosRoutes } from "./routes.js";
import Crud from "./crud.js";

async function setPedidosRoutes() {
    const tableName = "pedidos";
    const crud = new Crud(tableName, connection);

    app.post(pedidosRoutes.postData, async (request, response) => {
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(pedidosRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(`${pedidosRoutes.fetchById}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setFetchById(id, response);
    });

    app.put(`${pedidosRoutes.update}/:id`, async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(`${pedidosRoutes.delete}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setDelete(id, response);
    });
}

export { setPedidosRoutes };
