import { state, watch } from "../store.js";

export function init() {
  const cartContainer = document.getElementById('cart-container');

  // Load cart from localStorage
  let items = JSON.parse(localStorage.getItem('cart')) || [];

  // Render cart items
  function renderCartItems() {
    cartContainer.innerHTML = ''; // clear previous
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${item.img})`;

      card.innerHTML = `
        <div class="card-content">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button class="card-btn" style="background:white; color:red" id="btn-${item.title}-${item.price}">Remove From Cart</button>
        </div>
        <div class="card-layer"></div>
      `;
      cartContainer.appendChild(card);


      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        items = items.filter(i => i.title !== item.title || i.price !== item.price);
        localStorage.setItem('cart', JSON.stringify(items));
        state.cart = [...items]; // trigger reactivity
      }); 
    });

    if(items.length <= 0){
      cartContainer.classList.add('cart-empty');
      cartContainer.innerHTML = '<p class="cart-empty-text">Cart is empty</p>';
    }

  }

  // 1. Render immediately when init
  renderCartItems();

  // 2. Watch for future changes
  watch('cart', () => {
    renderCartItems();
    items = state.cart
  });


}
