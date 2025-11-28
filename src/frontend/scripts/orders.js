import PedidosService from "../../backend/services/pedidosService.js";
import {
    getAccessToken,
    getUserID,
    formatTimestamp,
    setIsLoggedState,
} from "./utils.js";

const orders = new PedidosService();

function buildOrderContainer(orderData) {
    const tr = document.createElement("tr");

    const tdState = document.createElement("td");
    tdState.textContent = orderData.state;

    const tdDesc = document.createElement("td");
    tdDesc.className = "desc-td";
    tdDesc.textContent = buildDescription(orderData.items);

    const tdDate = document.createElement("td");
    tdDate.textContent = orderData.date;

    const tdTotal = document.createElement("td");
    tdTotal.textContent = orderData.total;

    tr.appendChild(tdState);
    tr.appendChild(tdDesc);
    tr.appendChild(tdDate);
    tr.appendChild(tdTotal);

    return tr;
}

function buildDescription(itemsData) {
    let desc = "";
    itemsData.forEach((item) => {
        desc = desc.concat(`${item.name} x${item.quantity}\n`);
    });

    return desc;
}

async function getOrderData() {
    const accessToken = getAccessToken();
    const container = document.querySelector("table>tbody");
    const userID = getUserID();
    try {
        const userOrders = await orders.getUserOrders(userID, accessToken);
        userOrders.forEach(async (order) => {
            const orderID = order.id;
            const orderData = {
                state: order.estado,
                items: [],
                total: `MXN$${order.total}`,
                date: formatTimestamp(order["fecha_pedido"]),
            };

            const orderItems = await orders.getOrderItems(orderID, accessToken);

            orderItems.forEach((item) => {
                orderData.items.push({
                    name: item.product_name,
                    price: item.price,
                    quantity: item.quantity,
                });
            });

            container.appendChild(buildOrderContainer(orderData));
        });
    } catch (error) {
        console.error(error);
    }
}

setIsLoggedState();
getOrderData();
