import { state, watch } from "../store.js";

export function init() {
    state.routePath = 'register';

    const registerFormGroup = document.querySelectorAll('.form-group')

    registerFormGroup.forEach(group => {
        let label;
        group.childNodes.forEach(cn => {
            if(cn.tagName === 'LABEL'){
                label = cn
            }
            if(cn.tagName === 'INPUT'){
                cn.addEventListener('input', () => {
                    if(cn.value){
                        label.classList.remove('no-value-label')
                        label.classList.add('value-label')
                    }else{
                        label.classList.remove('value-label')
                        label.classList.add('no-value-label')
                    }


                })
            }
        })
    })

    const passwordBtn = document.getElementById('eyePasswordBtn')
    const confirmPasswordBtn = document.getElementById('eyeConfirmPasswordBtn')
    const password = document.getElementById('registerPassword')
    const confirmPassword = document.getElementById('confirmPassword')
    

    let passwordSvg = [];
    let confirmPasswordSvg = [];

    passwordBtn.childNodes.forEach(cn => {
        if(cn.tagName === 'svg'){
            passwordSvg.push(cn)
        }
    })

    confirmPasswordBtn.childNodes.forEach(cn => {
        if(cn.tagName === 'svg'){
            confirmPasswordSvg.push(cn)
        }
    })
        

    passwordBtn.addEventListener('click', () => {

        
        if(password.type === 'password'){
            password.type = 'text'
            passwordSvg[0].style.display = 'none'
            passwordSvg[1].style.display = 'block'
        }else{
            password.type = 'password'
            passwordSvg[0].style.display = 'block'
            passwordSvg[1].style.display = 'none'
        }

    })

    confirmPasswordBtn.addEventListener('click', () => {
        if(confirmPassword.type === 'password'){
            confirmPassword.type = 'text'
            confirmPasswordSvg[0].style.display = 'none'
            confirmPasswordSvg[1].style.display = 'block'
        }else{
            confirmPassword.type = 'password'
            confirmPasswordSvg[0].style.display = 'block'
            confirmPasswordSvg[1].style.display = 'none'
        }
    })
}