import { state, watch } from "../store.js";

export function init(){
    state.routePath = 'about';

    const carousel = document.querySelector('.review-carousel');
    const prevBtn = carousel.querySelector('.review-prev');
    const nextBtn = carousel.querySelector('.review-next');

    const reviewData = [
        {
            name: 'Sarah Cook',
            position: 'CEO, ABC Company',
            img: '../assets/images/CEO.png',
        },
        {
            name: 'Allen Hein',
            position: 'CTO, ABC Company',
            img: '../assets/images/CTO.png',
        },
        {
            name: 'Jonathan',
            position: 'Manager, ABC Company',
            img: '../assets/images/Manager.png',
        },
    ]

    let currentIndex = 0;
    let pastIndex;
    let reviewCards = [];

    reviewData.forEach((item, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.style.display = 'none';
        reviewCard.innerHTML = `
                 <div class="review-card-img">
                    <img src="${item.img}" alt="">
                </div>

                <div class="review-card-content">
                    <h1>${item.name}</h1>
                    <p>${item.position}</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill stars" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill stars" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill stars" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill stars" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill stars" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                          </svg>
                    </div>
                    <p>
                        <span>"</span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa error, nesciunt modi harum temporibus velit id ut minus totam aliquam aut quo hic ipsa cupiditate, laboriosam voluptas repellat inventore. Consequatur.
                        <span>"</span>
                    </p>
                </div>
        `

        carousel.appendChild(reviewCard);
    })

    carousel.childNodes.forEach(node => {
        if(node.tagName === 'DIV'){
            reviewCards.push(node)
        }
    })

    reviewCards[currentIndex].style.display = 'flex';

    console.log(carousel.childNodes);
    function updateCarousel(type = 'next'){
        pastIndex = currentIndex;

        if(type === 'prev'){
            if (currentIndex <= 0) {
                currentIndex = reviewCards.length - 1;
            } else {
                currentIndex--;
            }
        }
        else{
            if (currentIndex >= reviewCards.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
        }

        reviewCards[pastIndex].style.opacity = 0;

        setTimeout(() => {
            reviewCards[pastIndex].style.display = 'none';
            reviewCards[currentIndex].style.display = 'flex';
            reviewCards[currentIndex].style.opacity = 0;
        }, 100)

        setTimeout(() => {
            reviewCards[currentIndex].style.opacity = 1;
        },200)
    }

    nextBtn.addEventListener('click', () => {
        updateCarousel()
    })

    prevBtn.addEventListener('click', () => {
        updateCarousel('prev')
    })

}