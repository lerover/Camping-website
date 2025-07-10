export function init(){

    //================= hero carousel script start here ================== 
const carousel = document.getElementById('carousel')
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let transformPercent = 33.33
let itemLength = items.length -2

window.addEventListener('resize', () => {
if(window.innerWidth < 640){
    transformPercent = 100
    itemLength = items.length
}
if(window.innerWidth > 640){
    transformPercent = 50
    itemLength = items.length -1
}

if(window.innerWidth > 768){
    transformPercent = 33.33
    itemLength = items.length -2
}
})

nextBtn.addEventListener('click', () => {
currentIndex++;
if (currentIndex >= itemLength) currentIndex = 0;
updateCarousel();
});

prevBtn.addEventListener('click', () => {
currentIndex--;
if (currentIndex < 0) currentIndex = itemLength - 1;
updateCarousel();
});

function updateCarousel() {
track.style.transform = `translateX(-${currentIndex * transformPercent}%)`;
}

let interval = setInterval(() => {
nextBtn.click()
}, 1000)

carousel.addEventListener('mouseenter', () => {
clearInterval(interval)
})
carousel.addEventListener('mouseleave', () => {
interval = setInterval(() => {
    nextBtn.click()
}, 1000)
})

//================= features script start here ================== 
const cards = document.querySelectorAll('.card')
cards.forEach((card, index) => {
card.classList.add(`card-img-${index + 1}`)
})

const cardInfo = [
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
},
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

const cardContainer = document.querySelector('.card-container')


cardInfo.forEach((card, index) => {
const cardHtml = document.createElement('div') 
cardHtml.classList.add('card')
cardHtml.style.backgroundImage = `url('${card.img}')`

cardHtml.innerHTML = `
<div class="card-content">
    <h2>${card.title}</h2>
    <p>${card.description}</p>
    <p>${card.price} Ks</p>
    <button class="card-btn btn-type">Buy Now</button>
</div>
<div class="card-layer"></div>
`
cardContainer.appendChild(cardHtml)
})

}