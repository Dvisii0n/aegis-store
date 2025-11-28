import ProductosService from "../../backend/services/productosService.js";
import {
    setShowModalEvent,
    setCloseModalEvent,
    setAddToCartEvent,
} from "../events/shopEvents.js";
import { createWaitingElement, setIsLoggedState } from "./utils.js";

const productsService = new ProductosService();

function createProductModal(product, identifier) {
    const dialog = document.createElement("dialog");
    dialog.className = identifier;
    const dialogContent = document.createElement("div");
    dialogContent.id = "prodetails";
    dialogContent.className = "section-p1";

    const imgContainer = document.createElement("div");
    imgContainer.className = "single-pro-image";

    const mainImg = document.createElement("img");
    mainImg.src = product.imagen_url;
    mainImg.id = "MainImg";
    mainImg.alt = "";
    imgContainer.appendChild(mainImg);

    const smallImgGroup = document.createElement("div");
    smallImgGroup.className = "small-img-group";

    for (let i = 0; i < 4; i++) {
        const col = document.createElement("div");
        col.className = "small-img-col";

        const smallImg = document.createElement("img");
        smallImg.src = product.imagen_url;
        smallImg.className = "small-img";
        smallImg.alt = "";

        col.appendChild(smallImg);
        smallImgGroup.appendChild(col);
    }

    imgContainer.appendChild(smallImgGroup);

    const details = document.createElement("div");
    details.className = "single-pro-details";

    const h6 = document.createElement("h6");
    h6.textContent = product.categoria;

    const h4Title = document.createElement("h4");
    h4Title.textContent = product.nombre;

    const h2 = document.createElement("h2");
    h2.textContent = `$${product.precio}`;

    const select = document.createElement("select");
    const options = ["Seleccionar talla", "XL", "L", "M", "S"];
    options.forEach((optText) => {
        const option = document.createElement("option");
        option.textContent = optText;
        select.appendChild(option);
    });

    const input = document.createElement("input");
    input.type = "number";
    input.value = "1";
    input.min = "1";

    const btnAdd = document.createElement("button");
    btnAdd.className = "normal";
    btnAdd.textContent = "Añadir al carrito";

    const h4Details = document.createElement("h4");
    h4Details.textContent = "Detalles del producto";

    const span = document.createElement("span");
    span.textContent = product.descripcion;

    const btnClose = document.createElement("button");
    btnClose.className = "closeDialog";
    btnClose.textContent = "Cerrar";

    details.appendChild(h6);
    details.appendChild(h4Title);
    details.appendChild(h2);
    details.appendChild(select);
    details.appendChild(input);
    details.appendChild(btnAdd);
    details.appendChild(h4Details);
    details.appendChild(span);
    details.appendChild(document.createElement("br"));
    details.appendChild(document.createElement("br"));
    details.appendChild(btnClose);

    dialogContent.appendChild(imgContainer);
    dialogContent.appendChild(details);
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);
    return dialog;
}

function createProductCard(product, identifier) {
    const container = document.createElement("div");
    container.className = "pro";
    container.setAttribute("data-id", product.id);

    const prodImg = document.createElement("img");
    prodImg.setAttribute("src", product.imagen_url);

    const descDiv = document.createElement("div");
    descDiv.className = "des";

    const span = document.createElement("span");
    span.textContent = product.categoria;

    const title = document.createElement("h5");
    title.textContent = product.nombre;

    const starDiv = document.createElement("div");
    starDiv.className = "star";

    const prodLink = document.createElement("a");
    prodLink.setAttribute("href", "#");

    const cartIcon = document.createElement("i");
    cartIcon.className = "fal fa-cart-shopping cart";

    const price = document.createElement("h4");
    price.textContent = `$${product.precio}`;

    prodLink.appendChild(cartIcon);

    for (let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        star.className = "fas fa-star";
        starDiv.appendChild(star);
    }

    descDiv.appendChild(span);
    descDiv.appendChild(title);
    descDiv.appendChild(starDiv);
    descDiv.appendChild(price);

    container.appendChild(prodImg);
    container.appendChild(descDiv);
    container.appendChild(prodLink);

    container.appendChild(createProductModal(product, identifier));

    return container;
}

(async function generateProducts() {
    const prodsContainer = document.querySelector(".pro-container");
    const loadingSvg = createWaitingElement();
    prodsContainer.appendChild(loadingSvg);
    try {
        const accessToken = localStorage.getItem("accessToken");

        const products = await productsService.fetchRows(accessToken);
        prodsContainer.removeChild(loadingSvg);
        products.forEach((prod) => {
            const identifier = `P${products.indexOf(prod)}`;
            const prodCard = createProductCard(prod, identifier);
            prodsContainer.appendChild(prodCard);
        });

        setShowModalEvent();
        setCloseModalEvent();
        setAddToCartEvent();
    } catch (error) {
        console.log("waiting for server");
    }
})();

setIsLoggedState();
