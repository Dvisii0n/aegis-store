import { app, connection } from "../server/server.js";
import { authenticateToken } from "../auth/auth.js";

async function routeService(query) {
    return async (request, response) => {
        connection.query(query, (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows[0]);
            }
        });
    };
}

async function setStatsRoutes() {
    app.get(
        `/stats/getOrderCount`,
        authenticateToken,
        await routeService("SELECT countOrders();")
    );

    app.get(
        `/stats/getOrderItemsCount`,
        authenticateToken,
        await routeService(`SELECT countOrderItems();`)
    );

    app.get(
        `/stats/getTotalSales`,
        authenticateToken,
        await routeService(`SELECT getTotalSales();`)
    );

    app.get(
        `/stats/getUserCount`,
        authenticateToken,
        await routeService(`SELECT countUsers();`)
    );

    app.get(
        `/stats/countOrders`,
        authenticateToken,
        async (request, response) => {
            connection.query(
                `SELECT * FROM count_pedidos_by_day()`,
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
        `/stats/countUsers`,
        authenticateToken,
        async (request, response) => {
            connection.query(
                `SELECT * FROM count_users_by_day()`,
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
        `/stats/getOrdersInfo`,
        authenticateToken,
        async (request, response) => {
            connection.query(
                `SELECT * FROM getOrderDataAdmin();`,
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
        "/stats/getOrderItems/:id",
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            connection.query(
                `SELECT * FROM getOrderItems(${id});`,
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
        "/stats/completeOrder/:id",
        authenticateToken,
        async (request, response) => {
            const id = request.params.id;
            connection.query(
                `UPDATE pedidos SET estado = 'completado' WHERE id = ${id};`,
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

export { setStatsRoutes };
