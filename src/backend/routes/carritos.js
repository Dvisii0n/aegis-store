import { app, connection } from "../server/server.js";
import { carritosRoutes } from "./routes.js";
import Crud from "./crud.js";
import { authenticateToken } from "../auth/auth.js";

async function setCarritosRoutes() {
    const tableName = "carritos";
    const crud = new Crud(tableName, connection);

    app.post(
        carritosRoutes.postData,
        authenticateToken,
        async (request, response) => {
            const body = request.body;
            await crud.setPost(body, response);
        }
    );

    app.get(
        carritosRoutes.fetchData,
        authenticateToken,
        async (request, response) => {
            await crud.setFetch(response);
        }
    );

    app.get(
        `${carritosRoutes.fetchById}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setFetchById(id, response);
        }
    );

    app.put(
        `${carritosRoutes.update}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            const body = request.body;
            await crud.setUpdate(id, body, response);
        }
    );

    app.delete(
        `${carritosRoutes.delete}/:id`,
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            await crud.setDelete(id, response);
        }
    );

    app.get(
        `${carritosRoutes.cartExists}/:userID`,
        authenticateToken,
        async (request, response) => {
            const userID = request.params.userID;
            await crud.setRowExists("usuario_id", userID, response);
        }
    );

    app.get(
        `${carritosRoutes.fetchByUserID}/:userID`,
        authenticateToken,
        async (request, response) => {
            const userID = request.params.userID;
            connection.query(
                `SELECT * FROM carritos WHERE usuario_id = ${userID}`,
                (error, result) => {
                    if (error) {
                        response.send(error);
                    } else {
                        response.send(result.rows[0]);
                    }
                }
            );
        }
    );
}

export { setCarritosRoutes };
