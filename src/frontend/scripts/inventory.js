import { getAccessToken, requestPgFunction } from "./utils.js";
import ProductosService from "../../backend/services/productosService.js";

const prods = new ProductosService();

function setAddProductEvent() {
    const btn = document.querySelector(".add-product");

    btn.addEventListener("click", (e) => {
        const modal = document.querySelector(".add-product-modal");
        modal.showModal();
    });
}

function setCloseModalEvent() {
    const btn = document.querySelector(".close");
    btn.addEventListener("click", (e) => {
        const modal = document.querySelector(".add-product-modal");
        modal.close();
    });
}

function setDeleteProduct(btn) {
    btn.addEventListener("click", async (e) => {
        if (confirm("Seguro que quieres eliminar este producto?")) {
            try {
                await prods.deleteRow(
                    e.target.getAttribute("data-id"),
                    getAccessToken(),
                    window.location.reload()
                );
            } catch (error) {
                alert("ERROR: Este producto no se puede eliminar");
            }
        }
    });
}

function setAddProductSubmit() {
    const form = document.querySelector(".product-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            nombre: formData.get("nombre"),
            descripcion: formData.get("descripcion"),
            precio: formData.get("precio"),
            stock: formData.get("stock"),
            categoria: formData.get("categoria"),
            talla: formData.get("talla"),
            color: formData.get("color"),
            imagen_url: URL.createObjectURL(formData.get("imagen")),
        };

        try {
            const token = getAccessToken();
            await prods.createRow(data, token);

            alert("Producto agregado con exito");
            const modal = document.querySelector(".add-product-modal");
            modal.close();
            window.location.reload();
        } catch (error) {
            alert("ERROR: No se pudo agregar el producto");
        }
    });
}

function buildProductContainer(product) {
    const tr = document.createElement("tr");

    let prodID = null;

    for (let key of Object.keys(product)) {
        if (key === "id") {
            prodID = product[key];
            continue;
        }
        const td = document.createElement("td");
        if (key === "imagen_url") {
            const img = document.createElement("img");
            img.className = "prod-img";
            img.setAttribute("src", product[key]);
            img.setAttribute("width", "100px");
            td.appendChild(img);
        } else {
            td.textContent =
                key !== "precio" ? product[key] : `MXN$${product[key]}`;
        }

        tr.appendChild(td);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Eliminar";
    setDeleteProduct(deleteBtn);

    if (prodID) {
        deleteBtn.setAttribute("data-id", prodID);
    }

    const tdBtn = document.createElement("td");
    tdBtn.appendChild(deleteBtn);
    tr.appendChild(tdBtn);

    return tr;
}

(async function renderInventory() {
    const container = document.querySelector(".inventory-table");
    const data = await requestPgFunction("fetchProductos", false);
    data.forEach((product) => {
        container.appendChild(buildProductContainer(product));
    });
    setAddProductEvent();
    setCloseModalEvent();
    setAddProductSubmit();
})();
