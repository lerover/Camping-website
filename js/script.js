import { state, watch } from "./store.js"



//================= nav bar script start here ================== 
const nav = document.getElementById('nav')
let currentScroll = 0
window.addEventListener('scroll', () => {
    if(window.innerWidth < 768){
        if(window.scrollY != currentScroll){

            mobileMenuList.style.opacity = '0'
            burgerIcon.style.display = 'block'
            xMarkIcon.style.display = 'none'
            setTimeout(() => {
                mobileMenuList.style.display = 'none'
            }, 100)
        }
        currentScroll = window.scrollY
    }
})

// watch('routePath', () => {
//     console.log(state.routePath)
// })
nav.childNodes.forEach(node => {
    if(node.tagName === 'UL'){
        node.childNodes.forEach(child => {
            if(child.tagName === 'LI'){
                watch('routePath', () => {
                    if(child.children[0].innerText.toLowerCase() === state.routePath){
                        child.children[0].style.color = '#1ac6d8'
                    }else{
                        child.children[0].style.color = ''
                    }
                })
            }
        })
    }
});

const cartLength = document.getElementById('cartLength')
cartLength.innerText = state.cart.length
if(state.cart.length <= 0){
    cartLength.style.display = 'none'
}
watch('cart', () => {
    if(state.cart.length > 0){
        cartLength.style.display = 'block'
    }else{
        cartLength.style.display = 'none'
    }
    
    cartLength.innerText = state.cart.length
})

//================= mobile menu script start here ================== 
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileMenuList = document.getElementById('mobile-menu-lists')
const burgerIcon = document.querySelector('.burger-icon')
const xMarkIcon = document.querySelector('.x-mark-icon')
if(!mobileMenuList.style.display){
    mobileMenuList.style.display = 'none'
    xMarkIcon.style.display = 'none'
}
mobileMenuBtn.addEventListener('click', () => {

    if(mobileMenuList.style.display === 'block'){
        mobileMenuList.style.opacity = '0'
        burgerIcon.style.display = 'block'
        xMarkIcon.style.display = 'none'
        setTimeout(() => {
            mobileMenuList.style.display = 'none'
        }, 100)
    }else{
        mobileMenuList.style.display = 'block'
        xMarkIcon.style.display = 'block'
        burgerIcon.style.display = 'none'
        mobileMenuList.style.opacity = '0'
       setTimeout(() => {
        mobileMenuList.style.opacity = '1'
       }, 100)
    }
})

window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
        mobileMenuList.style.display = 'none'
    }
})
//================= mobile menu script end here ================== 


