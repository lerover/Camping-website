import { state, watch } from "../store.js";

export function init(){
    const productCardContainer = document.querySelector('.product-card-container');
    const cardBtns = [];

    const productCardInfo = [
        {
            title:'Tent',
            description:'Don\'t let the weather get you down',
            price: ' 25000',
            img: './assets/images/tent.png'
        },
        {
            title:'generator',
            description: 'Take your power with you',
            price: ' 25000',
            img: './assets/images/generator.png'
        },
        {
            title:'Camp Flash',
            description: 'Light up the night',
            price: ' 25000',
            img: './assets/images/flash.png'
        },
        {
            title:'Camp Ice Box',
            description: 'Keep your food fresh',
            price: ' 25000',
            img: './assets/images/iceBox.png'
        },
        {
            title: 'Camping Set',
            description: 'A complete camping set',
            price: ' 150000',
            img: './assets/images/campingSet.png'
        },
        {
            title: 'Backpack',
            description: 'A comfortable backpack',
            price: ' 90000',
            img: './assets/images/backPack.png'
        }
    ]
    
    productCardInfo.forEach((item,index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url(${item.img})`

        card.innerHTML = `
            <div class="card-content">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <p>${item.price}</p>
                <button class="card-btn btn-type" id="btn-${item.title}-${item.price}">Buy Now</button>
            </div>
            <div class="card-layer"></div>
            `;

        productCardContainer.appendChild(card);
        cardBtns.push(
            {
                btn: document.getElementById(`btn-${item.title}-${item.price}`),
                information: item,
                added: false
            }
        );
    }
    )

        cardBtns.forEach((cardBtn) => {
            cardBtn.btn.addEventListener('click', () => {
                if(!state.cart.some((item)=> item.title == cardBtn.information.title && item.price == cardBtn.information.price)){
                    state.cart = [...state.cart, cardBtn.information]
                    localStorage.setItem('cart', JSON.stringify(state.cart))
                }else{
                    state.cart = state.cart.filter((item) => item.title != cardBtn.information.title)
                    localStorage.setItem('cart', JSON.stringify(state.cart))
                }
            })
        })

        watch('cart', () => {
            cardBtns.forEach((cardBtn) => {
                if(state.cart.some((item)=> item.title == cardBtn.information.title && item.price == cardBtn.information.price)){
                    state.cart.forEach((item) => {
                        const btn = document.getElementById(`btn-${item.title}-${item.price}`);
                        btn.innerText = 'Remove From Cart';
                        btn.style.background = 'white';
                        btn.style.color = 'red'
                        btn.classList.remove('btn-type');
                    })
                }else{
                    const btn = document.getElementById(`btn-${cardBtn.information.title}-${cardBtn.information.price}`);
                    btn.innerText = 'Buy Now';
                    btn.removeAttribute('style');
                    btn.classList.add('btn-type');
                }
            })

            console.log(state.cart)
        })

}

