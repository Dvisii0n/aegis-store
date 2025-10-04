import { app, connection } from "../server/server.js";
import { pedidoItemsRoutes } from "./routes.js";
import Crud from "./crud.js";

async function setPedidoItemsRoutes() {
    const tableName = "pedido_items";
    const crud = new Crud(tableName, connection);

    app.post(pedidoItemsRoutes.postData, async (request, response) => {
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(pedidoItemsRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(`${pedidoItemsRoutes.fetchById}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setFetchById(id, response);
    });

    app.put(`${pedidoItemsRoutes.update}/:id`, async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(`${pedidoItemsRoutes.delete}/:id`, async (request, response) => {
        const id = request.params.id;
        await crud.setDelete(id, response);
    });
}

export { setPedidoItemsRoutes };
