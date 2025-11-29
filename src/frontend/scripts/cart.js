import CarritosService from "../../backend/services/carritosService.js";
import CarritoItemsService from "../../backend/services/carritoItemsService.js";
import ProductosService from "../../backend/services/productosService.js";
import {
    setDeleteCartItemEvents,
    setMakePaymentEvent,
} from "../events/cartEvents.js";
import { createWaitingElement } from "./utils.js";

async function getCartItemsInfo() {
    const cart = new CarritosService();
    const cartItems = new CarritoItemsService();
    const prods = new ProductosService();
    const userID = localStorage.getItem("userID");
    const accessToken = localStorage.getItem("accessToken");
    const userCart = await cart.fetchByUserID(userID, accessToken);

    const cartItemsInfo = await cartItems.fetchByCartID(
        userCart.id,
        accessToken
    );

    const itemsInfo = [];

    for (let item of cartItemsInfo) {
        const prodInfo = await prods.fetchByID(item.producto_id, accessToken);
        prodInfo["quantity"] = item.cantidad;
        prodInfo["prodID"] = item.producto_id;
        prodInfo["itemCartID"] = item.id;
        itemsInfo.push(prodInfo);
    }

    return itemsInfo;
}

function createCartItemDisplay(prodInfo) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-cart-item-id", prodInfo.itemCartID);
    tr.setAttribute("data-prod-id", prodInfo.prodID);

    const tdRemove = document.createElement("td");

    const icon = document.createElement("i");
    icon.className = "far fa-times-circle";
    tdRemove.appendChild(icon);

    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = prodInfo.imagen_url;
    img.alt = "";
    tdImg.appendChild(img);

    const tdTitle = document.createElement("td");
    tdTitle.textContent = prodInfo.nombre;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `MXN$${prodInfo.precio}`;

    const tdQty = document.createElement("td");
    const quantityDiv = document.createElement("div");
    quantityDiv.textContent = prodInfo.quantity;
    tdQty.appendChild(quantityDiv);

    const tdTotal = document.createElement("td");
    const sub = prodInfo.precio * prodInfo.quantity;
    tdTotal.textContent = `MXN$${sub}`;
    tdTotal.className = "subtotal-prod";
    tdTotal.setAttribute("subtotal-amount", sub);

    tr.appendChild(tdRemove);
    tr.appendChild(tdImg);
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdQty);
    tr.appendChild(tdTotal);

    return tr;
}

export async function renderCartItems() {
    try {
        const itemsInfo = await getCartItemsInfo();
        const container = document.querySelector("tbody");

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const prodIDs = [];
        for (let item of itemsInfo) {
            const prodRow = createCartItemDisplay(item);
            prodIDs.push({ id: item.prodID, quantity: item.quantity });
            container.appendChild(prodRow);
        }

        const subtotals = document.querySelectorAll(".subtotal-prod");

        let cartSubtotal = 0;
        subtotals.forEach((subtotal) => {
            cartSubtotal += Number.parseFloat(
                subtotal.getAttribute("subtotal-amount")
            );
        });

        const cartSub = document.querySelector(".cart-subtotal");
        const cartTotal = document.querySelector(".cart-total");

        cartSub.textContent = `MXN$${cartSubtotal}`;

        cartTotal.textContent = `MXN$${cartSubtotal}`;

        localStorage.setItem("orderItems", JSON.stringify(prodIDs));
        localStorage.setItem("total", cartSubtotal);

        setDeleteCartItemEvents();
        setMakePaymentEvent();
    } catch (error) {
        const section = document.querySelector("#cart");
        section.appendChild(createWaitingElement());
    }
}

renderCartItems();
