import { app, connection } from "../server/server.js";
import { productosRoutes } from "./routes.js";
import Crud from "./crud.js";
import { authenticateToken } from "../auth/auth.js";

async function setProductosRoutes() {
    const tableName = "productos";
    const crud = new Crud(tableName, connection);

    app.post(
        productosRoutes.postData,
        authenticateToken,
        async (request, response) => {
            const body = request.body;
            await crud.setPost(body, response);
        }
    );

    app.get(
        productosRoutes.fetchData,
        authenticateToken,
        async (request, response) => {
            await crud.setFetch(response);
        }
    );

    app.get(
        `${productosRoutes.fetchById}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setFetchById(id, response);
        }
    );

    app.put(
        `${productosRoutes.update}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            const body = request.body;
            await crud.setUpdate(id, body, response);
        }
    );

    app.delete(
        `${productosRoutes.delete}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setDelete(id, response);
        }
    );
}

export { setProductosRoutes };
