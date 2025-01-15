import { menuData } from "../../data/menuData.js";
import { openModal } from "../modal/modal.js";
import { addToWishList } from "../wishlist/wishlist.js";
const menuList = document.getElementById("menu-list");
const toggleRecipesBtn = document.getElementById("toggle-recipes");

let recipesLimit = menuData.length >= 10 ? 5 : menuData.length;

export function displayMenu() {
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

  toggleRecipesBtn.innerHTML = recipesLimit === 5 ? "Show More" : "Show Less";
}

toggleRecipesBtn.addEventListener("click", () => {
  recipesLimit = recipesLimit === 5 ? menuData.length : 5;
  displayMenu();
});
