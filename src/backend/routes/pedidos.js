import { app, connection } from "../server/server.js";
import { pedidosRoutes } from "./routes.js";
import Crud from "./crud.js";
import { authenticateToken } from "../auth/auth.js";

async function setPedidosRoutes() {
    const tableName = "pedidos";
    const crud = new Crud(tableName, connection);

    app.post(
        pedidosRoutes.postData,
        authenticateToken,
        async (request, response) => {
            const body = request.body;

            console.log(`user order: ${JSON.stringify(body)} at ${new Date()}`);
            connection.query(
                `INSERT INTO pedidos (usuario_id, total) VALUES (${body.usuario_id}, ${body.total}) RETURNING id`,
                (error, result) => {
                    if (error) {
                        response.send(error);
                    } else {
                        response.send(result.rows[0].id);
                    }
                }
            );
        }
    );

    app.get(
        pedidosRoutes.fetchData,
        authenticateToken,
        async (request, response) => {
            await crud.setFetch(response);
        }
    );

    app.get(
        `${pedidosRoutes.fetchById}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setFetchById(id, response);
        }
    );

    app.put(
        `${pedidosRoutes.update}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            const body = request.body;
            await crud.setUpdate(id, body, response);
        }
    );

    app.delete(
        `${pedidosRoutes.delete}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setDelete(id, response);
        }
    );

    app.get(
        "/getOrderItems/:id",
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            connection.query(
                `SELECT * FROM getOrderItems(${id})`,
                (error, result) => {
                    if (error) {
                        response.send(error);
                    } else {
                        response.send(result.rows);
                    }
                }
            );
        }
    );

    app.get(
        "/getUserOrders/:id",
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            connection.query(
                `SELECT * FROM pedidos WHERE usuario_id = ${id}`,
                (error, result) => {
                    if (error) {
                        response.send(error);
                    } else {
                        response.send(result.rows);
                    }
                }
            );
        }
    );
}

export { setPedidosRoutes };
