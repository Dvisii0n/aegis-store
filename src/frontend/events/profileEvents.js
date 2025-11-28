(function setLogoutEvent() {
    const btn = document.querySelector(".logout-btn");
    btn.addEventListener("click", (e) => {
        if (confirm("Seguro que quieres cerrar la sesion?")) {
            localStorage.clear();
            window.location.href = "../pages/login.html";
        }
    });
})();
