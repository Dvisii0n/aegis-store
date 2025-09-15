import routes from "./routes.js";

function getTimestamp() {
    const now = new Date();
    return now.toISOString();
}
//request body must be an object, example: { name: "John", lastname: "Doe" }
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

const sampleBody = {
    name: "Camisa",
    id: 11,
    quantity: 1,
    price: 100,
    timestamp: getTimestamp(),
    address: "Calle V No. #300, Col. N",
};
const sampleUpdate = {
    name: "Short",
    quantity: "2",
    price: "500",
    address: "Calle Y, Col. Z #666",
};

// await createRow(routes.post, sampleBody);

// await updateRow(routes.update, sampleUpdate, 10);

// console.log(await fetchByID(routes.getByID, 11));

// await deleteRow(routes.delete, 10);

console.log(await fetchRows(routes.get));
