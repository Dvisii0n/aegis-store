import { app, connection } from "../server/server.js";
import { carritoItemsRoutes } from "./routes.js";
import Crud from "./crud.js";

async function setCarritoItemsRoutes() {
    const tableName = "carrito_items";
    const crud = new Crud(tableName, connection);

    app.post(carritoItemsRoutes.postData, async (request, response) => {
        const body = request.body;
        await crud.setPost(body, response);
    });

    app.get(carritoItemsRoutes.fetchData, async (request, response) => {
        await crud.setFetch(response);
    });

    app.get(
        `${carritoItemsRoutes.fetchById}/:id`,
        async (request, response) => {
            const id = request.params.id;
            await crud.setFetchById(id, response);
        }
    );

    app.put(`${carritoItemsRoutes.update}/:id`, async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        await crud.setUpdate(id, body, response);
    });

    app.delete(
        `${carritoItemsRoutes.delete}/:id`,
        async (request, response) => {
            const id = request.params.id;
            await crud.setDelete(id, response);
        }
    );
}

export { setCarritoItemsRoutes };
