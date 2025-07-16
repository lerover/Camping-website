import { state, watch } from "../store.js";

export function init() {
    state.routePath = 'contact';

    const contactFormGroup = document.querySelectorAll('.form-group')

    contactFormGroup.forEach(group => {
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
}