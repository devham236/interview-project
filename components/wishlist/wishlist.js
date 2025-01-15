import { calcTotalCookingTime } from "../../utils/helperFunctions.js";
import { openModal } from "../modal/modal.js";
const wishListElement = document.getElementById("wish-list");
const totalCookingTimeEl = document.getElementById("total-cook-time");

let wishList = [];

export function addToWishList(wishListedItem) {
  const itemId = String(wishListedItem.id);
  const itemExists = wishList.some((item) => String(item.id) === itemId);

  if (!itemExists) {
    wishList.push(wishListedItem);
    displayWishlist();
  } else {
    alert("Item already in wishlist");
  }
}

export function removeFromWishlist(id) {
  const idToRemove = String(id);
  wishList = wishList.filter((item) => String(item.id) !== idToRemove);
  displayWishlist();
}

export function displayWishlist() {
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
          <button data-item='${JSON.stringify(
            item
          )}' class="details-btn">Details</button>
        </div>
      </li>`;
    });

    const totalCookingTime = calcTotalCookingTime(wishList);
    totalCookingTimeEl.innerHTML = `Total Cooking Time: ${totalCookingTime} minutes`;
    wishListElement.innerHTML = wishListHTML;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        removeFromWishlist(id);
      });
    });

    const detailsButtons = document.querySelectorAll(".details-btn");
    detailsButtons.forEach((button) => {
      const dataItem = JSON.parse(button.getAttribute("data-item"));
      button.addEventListener("click", () => {
        openModal(dataItem);
      });
    });
  } else {
    wishListElement.innerHTML = "No items in wishlist";
    totalCookingTimeEl.innerHTML = "";
  }
}
