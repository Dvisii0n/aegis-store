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

            console.log(currentModal);
            currentModal.close();
        });
    });
}
