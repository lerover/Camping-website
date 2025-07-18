import { state, watch } from "../store.js";

export function init(){
    state.routePath = 'products';
    const productCardContainer = document.querySelector('.product-card-container');
    // state.cart = [...JSON.parse(localStorage.getItem('cart') || '[]')];
    const cardBtns = [];

    const productCardInfo = [
        {
            title:'Tent',
            description:'Don\'t let the weather get you down',
            price: ' 25000',
            img: './assets/images/tent.png',
            category: 'tent'
        },
        {
            title:'generator',
            description: 'Take your power with you',
            price: ' 25000',
            img: './assets/images/generator.png',
            category: 'generator'
        },
        {
            title:'Camp Flash',
            description: 'Light up the night',
            price: ' 25000',
            img: './assets/images/flash.png',
            category: 'flash'
        },
        {
            title:'Camp Ice Box',
            description: 'Keep your food fresh',
            price: ' 25000',
            img: './assets/images/iceBox.png',
            category: 'iceBox'
        },
        {
            title: 'Camping Set',
            description: 'A complete camping set',
            price: ' 150000',
            img: './assets/images/campingSet.png',
            category: 'campingSet'
        },
        {
            title: 'Backpack',
            description: 'A comfortable backpack',
            price: ' 90000',
            img: './assets/images/backPack.png',
            category: 'backPack'
        }
    ]

    const render = (data) => {
        productCardContainer.innerHTML = '';
        if(data.length === 0){
            productCardContainer.style.gridTemplateColumns = '1fr';
            productCardContainer.innerHTML = `<h1 style="text-align: center; grid-column: 1/4; font-size: 50px; margin-top: 150px;">No products found</h1>`;
            return;
        }

        if(data.length > 0){
            productCardContainer.style = 'none'
        }
        data.forEach((item,index) => {

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
    }

    render(productCardInfo)
    //filter part here 
    const searchBar = document.getElementById('search-bar')
    searchBar.addEventListener('input', () => {
        const searchValue = searchBar.value.toLowerCase();
        const filteredData = productCardInfo.filter((item) => item.title.toLowerCase().includes(searchValue));
        render(filteredData);   
    })

    const category = ['all','tent','generator','flash','iceBox','campingSet','backPack']
    const filter = document.querySelector('.product-filter')
    category.forEach((item) => {
        const option = document.createElement('option')
        option.value = item
        option.innerText = item.toUpperCase()
        filter.appendChild(option)
    })

    filter.addEventListener('change', () => {
        if(filter.value === 'all'){
            render(productCardInfo)
            return;
        }
        const filteredData = productCardInfo.filter((item) => item.category.toLowerCase() === filter.value.toLowerCase());
        render(filteredData);   
    })

    //filter part end here 

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

        function cardBtnFunction() {
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
                    if(btn){
                        btn.innerText = 'Buy Now';
                        btn.removeAttribute('style');
                        btn.classList.add('btn-type');
                    }
                }
            })
        }

        cardBtnFunction()
        watch('cart', ()=>{
            cardBtnFunction();
        })

}

