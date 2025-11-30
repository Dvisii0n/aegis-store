import {
    requestPgFunction,
    formatTimestamp,
    buildDescription,
} from "./utils.js";

function setCompleteEvent(btn) {
    btn.addEventListener("click", async (e) => {
        const orderID = e.target.getAttribute("data-id");

        await requestPgFunction(`completeOrder/${orderID}`, true);
        window.location.reload();

        await renderOrdersInfo();
    });
}

function buildOrderAdminContainer(orderData) {
    const tr = document.createElement("tr");

    const tdState = document.createElement("td");
    tdState.textContent = orderData.state;
    if (orderData.state === "completado") {
        tdState.className = "completed";
    }
    const tdClient = document.createElement("td");
    tdClient.textContent = orderData.client;

    const tdDesc = document.createElement("td");
    tdDesc.className = "desc-td";
    tdDesc.textContent = buildDescription(orderData.items);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = orderData.total;

    const tdDate = document.createElement("td");
    tdDate.textContent = orderData.date;

    const tdAddress = document.createElement("td");
    tdAddress.textContent = orderData.address;
    const tdPhone = document.createElement("td");
    tdPhone.textContent = orderData.phone;

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Completar";
    completeBtn.setAttribute("data-id", orderData.order_id);
    setCompleteEvent(completeBtn);

    const tdComplete = document.createElement("td");
    tdComplete.appendChild(completeBtn);

    tr.appendChild(tdState);
    tr.appendChild(tdClient);
    tr.appendChild(tdDesc);
    tr.appendChild(tdTotal);
    tr.appendChild(tdDate);
    tr.appendChild(tdAddress);
    tr.appendChild(tdPhone);
    tr.appendChild(tdComplete);

    return tr;
}

async function renderOrdersInfo() {
    const container = document.querySelector(".orders-table");
    const data = await requestPgFunction("getOrdersInfo", true);

    data.forEach(async (order) => {
        const orderItems = await requestPgFunction(
            `getOrderItems/${order.order_id}`,
            true
        );
        const orderData = {
            order_id: order.order_id,
            state: order.status,
            client: order.user_name,
            items: [],
            desc: "",
            total: `MXN$${order.order_total}`,
            date: formatTimestamp(order.order_date),
            address: order.address,
            phone: order.phone,
        };

        orderItems.forEach((item) => {
            orderData.items.push({
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
            });
        });

        orderData.desc = buildDescription(orderData.items);
        container.appendChild(buildOrderAdminContainer(orderData));
    });
}

await renderOrdersInfo();
