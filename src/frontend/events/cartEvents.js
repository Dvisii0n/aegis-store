import CarritoItemsService from "../../backend/services/carritoItemsService.js";
import { renderCartItems } from "../scripts/cart.js";

export function setDeleteCartItemEvents() {
    const cartItems = new CarritoItemsService();
    const removeBtns = document.querySelectorAll(".far.fa-times-circle");

    removeBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const dataID =
                btn.parentNode.parentNode.getAttribute("data-cart-item-id");
            const accessToken = localStorage.getItem("accessToken");
            await cartItems.deleteRow(dataID, accessToken);
            await renderCartItems();
        });
    });
}

export function setMakePaymentEvent() {
    const paymentBtn = document.querySelector("#Subtotal>button");

    paymentBtn.addEventListener("click", (e) => {
        window.location.href = "../pages/payment.html";
    });
}
