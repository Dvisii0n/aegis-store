import CarritosService from "../../backend/services/carritosService.js";
import CarritoItemsService from "../../backend/services/carritoItemsService.js";

export function setShowModalEvent() {
    const prodCards = Array.from(document.querySelectorAll(".pro"));

    prodCards.forEach((card) => {
        const img = card.firstChild;

        img.addEventListener("click", (e) => {
            const modal = document.querySelector(
                `.P${prodCards.indexOf(card)}`
            );

            modal.showModal();
        });
    });
}

export function setCloseModalEvent() {
    const modals = Array.from(document.querySelectorAll("dialog"));

    modals.forEach((modal) => {
        const closeBtn = document.querySelector(
            `.P${modals.indexOf(
                modal
            )}>#prodetails>.single-pro-details>.closeDialog`
        );

        closeBtn.addEventListener("click", (e) => {
            const currentModal = document.querySelector(
                `.P${modals.indexOf(modal)}`
            );

            currentModal.close();
        });
    });
}

export function setAddToCartEvent() {
    const cart = new CarritosService();
    const cartItems = new CarritoItemsService();
    const modals = Array.from(document.querySelectorAll("dialog"));
    modals.forEach((modal) => {
        const addToCartBtn = document.querySelector(
            `.P${modals.indexOf(modal)}>#prodetails>.single-pro-details>.normal`
        );

        const userID = localStorage.getItem("userID");
        const accessToken = localStorage.getItem("accessToken");
        addToCartBtn.addEventListener("click", async (e) => {
            const userCart = await cart.fetchByUserID(userID, accessToken);

            const productID = modal.parentNode.getAttribute("data-id");
            const currentModal = document.querySelector(
                `.P${modals.indexOf(modal)}`
            );
            const inputVal = document.querySelector(
                `.P${modals.indexOf(
                    modal
                )}>#prodetails>.single-pro-details>input`
            ).value;

            await cartItems.createRow(
                {
                    carrito_id: userCart.id,
                    producto_id: productID,
                    cantidad: inputVal,
                },
                accessToken
            );

            currentModal.close();
        });
    });
}
