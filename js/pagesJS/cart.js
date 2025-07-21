import { state, watch } from "../store.js";

export function init() {
  state.routePath = 'cart';
  const cartContainer = document.getElementById('cart-container');

  // Load cart from localStorage
  let items = JSON.parse(localStorage.getItem('cart'))|| [];

  const totalQty = document.getElementById('total-qty');
  const totalPrice = document.getElementById('total-price');
  let totalQtyCount = 0;

  
  items.forEach(item => {
    state.cartCount = [...state.cartCount, {title: item.title, count: item.count}]
  })
  
 
  // Render cart items
  function renderCartItems() {
    cartContainer.innerHTML = ''; // clear previous

    if(totalQtyCount != 0){
      totalQtyCount = 0;
    }
   
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${item.img})`;

      console.log(state.cartCount.find((cartItem)=> cartItem.title == item.title))

      card.innerHTML = `
        <div class="card-content">

            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <div class="quantity-box center-box">
                <button class="quantity-btn" id="quantity-btn-minus-${item.title}-${item.price}">−</button>
                <div class="quantity-value" id="quantity-value-${item.title}-${item.price}">${state.cartCount.find((cartItem)=> cartItem.title == item.title).count}</div>
                <button class="quantity-btn" id="quantity-btn-plus-${item.title}-${item.price}">+</button>
            </div>
            
            <button class="card-btn" style="background:white; color:red" id="btn-${item.title}-${item.price}">Remove From Cart</button>
        </div>
        <div class="card-layer"></div>
      `;
      cartContainer.appendChild(card);


      const btn = document.getElementById(`btn-${item.title}-${item.price}`);
      btn.addEventListener('click', () => {
        items = items.filter(i => i.title !== item.title || i.price !== item.price);
        localStorage.setItem('cart', JSON.stringify(items));
        state.cart = [...items]; // trigger reactivity

      }); 

      const plusBtn = document.getElementById(`quantity-btn-plus-${item.title}-${item.price}`);
      const minusBtn = document.getElementById(`quantity-btn-minus-${item.title}-${item.price}`);

      if(plusBtn){
        plusBtn.addEventListener('click', () => calculateQty('plus'));
      }

      if(minusBtn){
        minusBtn.addEventListener('click', () => calculateQty('minus'));
      }

    

      const calculateQty = (type = 'plus') =>{
        if(type === 'plus'){
          item.count++
          state.cartCount.find((cartItem)=> cartItem.title == item.title).count++
          totalQtyFunc();
        }else{
          if(item.count > 0){
            item.count--
            state.cartCount.find((cartItem)=> cartItem.title == item.title).count--
            totalQtyFunc();
          }         
        }

        document.getElementById(`quantity-value-${item.title}-${item.price}`).textContent = item.count;
      }

      const totalQtyFunc = () => {
        if(totalQtyCount == 0){
          totalQtyCount += state.cartCount.find((cartItem)=> cartItem.title == item.title).count;
        }else{
          totalQtyCount++
        }
        
        totalQty.textContent = totalQtyCount;
        totalPrice.textContent = totalQtyCount * item.price;
        console.log(item.count, totalQtyCount)
      }

      totalQtyFunc();

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
    console.log(state.cartCount)
  });


}
