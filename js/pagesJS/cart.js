import { state, watch } from "../store.js";

export function init() {
  const cartContainer = document.getElementById('cart-container');

  // Load cart from localStorage
  state.cart = [...JSON.parse(localStorage.getItem('cart') || '[]')];
  console.log(state.cart)

  // Render cart items
  function renderCartItems() {
    cartContainer.innerHTML = ''; // clear previous
    state.cart.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${item.img})`;

      card.innerHTML = `
        <div class="card-content">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button class="card-btn btn-type" id="btn-${item.title}-${item.price}">Buy Now</button>
        </div>
        <div class="card-layer"></div>
      `;
      cartContainer.appendChild(card);
    });
  }

  // 1. Render immediately when init
  renderCartItems();

  // 2. Watch for future changes
  watch('cart', renderCartItems);
}
