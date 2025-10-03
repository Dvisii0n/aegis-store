async function createRow(url, requestBody) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        console.log("POSTED DATA");
    } catch (error) {
        throw error;
    }
}

async function fetchRows(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

async function fetchByID(url, id) {
    try {
        const response = await fetch(`${url}${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw `Row With ID: ${id} doesn't exist`;
    }
}

async function updateRow(url, requestBody, id) {
    try {
        const response = await fetch(`${url}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        console.log("UPDATED DATA");
    } catch (error) {
        throw `Row With ID: ${id} doesn't exist`;
    }
}

async function deleteRow(url, id) {
    try {
        const response = await fetch(`${url}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("DELETED ROW");
    } catch (error) {
        throw `Row With ID: ${id} doesn't exist`;
    }
}
