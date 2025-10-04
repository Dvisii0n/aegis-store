import { app, connection } from "../server/server.js";
import { userRoutes } from "./routes.js";

const tableName = "usuarios";

async function setUsersRoutes() {
    app.post(userRoutes.postData, (request, response) => {
        const { nombre, email, password, telefono, direccion } = request.body;

        const insertQuery = `INSERT INTO ${tableName} (nombre, email, password, telefono, direccion ) VALUES ($1, $2, $3, $4, $5)`;
        connection.query(
            insertQuery,
            [nombre, email, password, telefono, direccion],
            (error, result) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("POSTED DATA");
                }
            }
        );
    });

    app.get(userRoutes.fetchData, (request, response) => {
        const query = `SELECT * FROM ${tableName}`;
        connection.query(query, (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows);
            }
        });
    });

    app.get(`${userRoutes.fetchById}/:id`, (request, response) => {
        const id = request.params.id;
        const fetchQuery = `SELECT * FROM ${tableName} WHERE id = $1`;

        connection.query(fetchQuery, [id], (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows[0]);
            }
        });
    });

    app.put(`${userRoutes.update}/:id`, (request, response) => {
        const id = request.params.id;

        const { nombre, email, password, telefono, direccion } = request.body;

        const updateQuery = `UPDATE ${tableName} SET nombre = $2, email = $3, password = $4, telefono = $5, direccion = $6 WHERE id = $1`;

        connection.query(
            updateQuery,
            [id, nombre, email, password, telefono, direccion],
            (error, result) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("UPDATED");
                }
            }
        );
    });

    app.delete(`${userRoutes.delete}/:id`, (request, response) => {
        const id = request.params.id;

        const deleteQuery = `DELETE FROM ${tableName} WHERE id = $1 `;

        connection.query(deleteQuery, [id], (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send("DELETED ROW");
            }
        });
    });
}

export { setUsersRoutes };
