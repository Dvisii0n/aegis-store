import { app, connection } from "../server/server.js";

export async function setUsersRoute() {
    app.post("/postData", (request, response) => {
        const { nombre, email, password, telefono, direccion } = request.body;

        const insertQuery = `INSERT INTO usuarios (nombre, email, password, telefono, direccion ) VALUES ($1, $2, $3, $4, $5)`;
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

    app.get("/fetchData", (request, response) => {
        const query = "SELECT * FROM usuarios";
        connection.query(query, (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows);
            }
        });
    });
}

// app.get("/fetchById/:id", (request, response) => {
//     const id = request.params.id;
//     const fetchQuery = "SELECT * FROM orders WHERE id = $1";

//     connection.query(fetchQuery, [id], (error, result) => {
//         if (error) {
//             response.send(error);
//         } else {
//             console.log(response);
//             response.send(result.rows[0]);
//         }
//     });
// });

// app.put("/update/:id", (request, response) => {
//     const id = request.params.id;

//     const { name, quantity, price, address } = request.body;

//     const updateQuery =
//         "UPDATE orders SET name = $2, quantity = $3, price = $4, address = $5 WHERE id = $1";

//     connection.query(
//         updateQuery,
//         [id, name, quantity, price, address],
//         (error, result) => {
//             if (error) {
//                 response.send(error);
//             } else {
//                 console.log(result);
//                 response.send("UPDATED");
//             }
//         }
//     );
// });

// app.delete("/delete/:id", (request, response) => {
//     const id = request.params.id;

//     const deleteQuery = "DELETE FROM orders WHERE id = $1 ";

//     connection.query(deleteQuery, [id], (error, result) => {
//         if (error) {
//             response.send(error);
//         } else {
//             console.log(result);
//             response.send("DELETED ROW");
//         }
//     });
// });
