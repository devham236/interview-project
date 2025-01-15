import { menuData } from "./data/menuData.js";
import { calcTotalCookingTime } from "./utils/helperFunctions.js";
const menuList = document.getElementById("menu-list");
const wishListElement = document.getElementById("wish-list");
const toggleRecipesBtn = document.getElementById("toggle-recipes");
const totalCookingTimeEl = document.getElementById("total-cook-time");
const modalEl = document.getElementById("modal");

let wishList = [];
let recipesLimit = menuData.length >= 10 ? 5 : menuData.length;
let currentModal = null;

toggleRecipesBtn.addEventListener("click", () => {
  recipesLimit = recipesLimit === 5 ? menuData.length : 5;
  displayMenu();
});

function openModal(item) {
  currentModal = item;
  console.log(currentModal);

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

function closeModal() {
  currentModal = null;
  modalEl.innerHTML = "";
}

function displayMenu() {
  let menuItems = "";

  menuData.slice(0, recipesLimit).forEach((item) => {
    menuItems += `<li>
      <img src="${item.image}" />
      <div>
        <p>${item.name}</p>
        <p>${item.rating}/5</p>
      </div>
      <div>
        <button data-item='${JSON.stringify(
          item
        )}' class="wishlist-btn">Add to Wishlist</button>
        <button data-item='${JSON.stringify(
          item
        )}' class="details-btn">Details</button>
      </div>
    </li>`;
  });

  menuList.innerHTML = menuItems;

  const wishlistButtons = document.querySelectorAll(".wishlist-btn");
  wishlistButtons.forEach((button) => {
    const dataItem = JSON.parse(button.getAttribute("data-item"));
    button.addEventListener("click", () => {
      addToWishList(dataItem);
    });
  });

  const detailsButtons = document.querySelectorAll(".details-btn");
  detailsButtons.forEach((button) => {
    const dataItem = JSON.parse(button.getAttribute("data-item"));
    button.addEventListener("click", () => {
      openModal(dataItem);
    });
  });

  toggleRecipesBtn.textContent = recipesLimit === 5 ? "Show More" : "Show Less";
}

function addToWishList(wishListedItem) {
  const itemId = String(wishListedItem.id);
  const itemExists = wishList.some((item) => String(item.id) === itemId);

  if (!itemExists) {
    wishList.push(wishListedItem);
    displayWishlist();
  } else {
    alert("Item already in wishlist");
  }
}

function removeFromWishlist(id) {
  const idToRemove = String(id);
  wishList = wishList.filter((item) => String(item.id) !== idToRemove);
  displayWishlist();
}

function displayWishlist() {
  console.log(wishList);
  if (wishList.length > 0) {
    let wishListHTML = "";

    wishList.forEach((item) => {
      wishListHTML += `<li>
        <img src="${item.image}" />
        <div>
          <p>${item.name}</p>
          <p>${item.rating}/5</p>
        </div>
        <div>
          <button data-id="${item.id}" class="remove-btn">Remove</button>
          <button class="details-btn">Details</button>
        </div>
      </li>`;
    });

    const totalCookingTime = calcTotalCookingTime(wishList);
    totalCookingTimeEl.innerHTML = `Total Cooking Time: ${totalCookingTime} minutes`;
    wishListElement.innerHTML = wishListHTML;

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        removeFromWishlist(id);
      });
    });
  } else {
    wishListElement.innerHTML = "No items in wishlist";
    totalCookingTimeEl.innerHTML = "";
  }
}
console.log(menuData);

displayMenu();
displayWishlist();
