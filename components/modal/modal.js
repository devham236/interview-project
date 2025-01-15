const modalEl = document.getElementById("modal");
let currentModal = null;

export function openModal(item) {
  currentModal = item;
  modalEl.innerHTML = `<div id="modal-content">
            <h2 id="modal-title">${currentModal.name}</h2>
            <ul>
                ${currentModal.ingredients
                  .map((ing) => `<li>${ing}</li>`)
                  .join("")}
            </ul>
            <button class='modal-close-btn'>close</button>
        </div>`;

  const modalCloseBtn = document.querySelector(".modal-close-btn");
  modalCloseBtn.addEventListener("click", closeModal);
}

export function closeModal() {
  currentModal = null;
  modalEl.innerHTML = "";
}
