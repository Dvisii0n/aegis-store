export default class Crud {
    constructor(tableName, connection) {
        this.tableName = tableName;
        this.connection = connection;
    }

    #getQueryComponents(body) {
        let keys = [];
        let valuesArr = [];
        for (let field of Object.keys(body)) {
            keys.push(field);
            valuesArr.push(body[field]);
        }
        let formattedFields = keys[0];
        let formattedValuesQuery = "$1";
        for (let i = 1; i < keys.length; i++) {
            formattedFields = formattedFields.concat(", ", keys[i]);
            formattedValuesQuery = formattedValuesQuery.concat(
                ", ",
                `$${i + 1}`
            );
        }

        return {
            formattedFields,
            formattedValuesQuery,
            valuesArr,
        };
    }

    #getUpdateQueryComponents(id, body) {
        let keys = [];
        let updateArr = [id];
        for (let key of Object.keys(body)) {
            keys.push(key);
            updateArr.push(body[key]);
        }

        let updateQueryFormat = `${keys[0]} = $2`;
        if (keys.length > 1) {
            for (let i = 1; i < keys.length; i++) {
                updateQueryFormat = updateQueryFormat.concat(
                    ", ",
                    `${keys[i]} = $${i + 2}`
                );
            }
        }

        return { updateArr, updateQueryFormat };
    }

    async setPost(body, response) {
        const queryComponents = this.#getQueryComponents(body);

        const insertQuery = `INSERT INTO ${this.tableName} (${queryComponents.formattedFields}) VALUES (${queryComponents.formattedValuesQuery})`;
        await this.connection.query(
            insertQuery,
            queryComponents.valuesArr,
            (error, result) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("POSTED DATA");
                }
            }
        );
    }

    async setFetch(response) {
        const query = `SELECT * FROM ${this.tableName}`;
        await this.connection.query(query, (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows);
            }
        });
    }

    async setFetchById(id, response) {
        const fetchQuery = `SELECT * FROM ${this.tableName} WHERE id = $1`;

        await this.connection.query(fetchQuery, [id], (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows[0]);
            }
        });
    }

    async setUpdate(id, body, response) {
        const updateQueryComponents = this.#getUpdateQueryComponents(id, body);
        const updateQuery = `UPDATE ${this.tableName} SET ${updateQueryComponents.updateQueryFormat} WHERE id = $1`;

        await this.connection.query(
            updateQuery,
            updateQueryComponents.updateArr,
            (error, result) => {
                if (error) {
                    response.send(error);
                } else {
                    response.send("UPDATED");
                }
            }
        );
    }

    async setDelete(id, response) {
        const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1 `;

        await this.connection.query(deleteQuery, [id], (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send("DELETED ROW");
            }
        });
    }

    async setFetchByName(name, response) {
        const fetchQuery = `SELECT * FROM ${this.tableName} WHERE nombre = $1`;

        await this.connection.query(fetchQuery, [name], (error, result) => {
            if (error) {
                response.send(error);
            } else {
                response.send(result.rows[0]);
            }
        });
    }
}
