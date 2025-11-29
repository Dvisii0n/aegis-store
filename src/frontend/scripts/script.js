import { setIsLoggedState, setRoleState } from "./utils.js";

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}

function setAdminPageLink() {
    const btn = document.querySelector("#navbar>.admin-btn");

    if (btn !== null) {
        btn.addEventListener("click", (e) => {
            window.location.href = "../pages/admin/stats.html";
        });
    }
}

setIsLoggedState();
setRoleState();
setAdminPageLink();
