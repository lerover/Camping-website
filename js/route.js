// route registration 
const routes = {
    "/" : '/pages/home.html',
    "/test" : '/pages/test.html'
}

function render() {
    const path = window.location.pathname;
    const file = routes[path] || '/pages/404.html'

    fetch(file)
    .then(response => response.text())
    .then(html => {
        const app = document.getElementById('app')
        app.innerHTML = html

        const scripts = app.querySelectorAll("script")
        scripts.forEach(script => {
            const newScript = document.createElement("script")
            
            if(script.src){
                newScript.src = script.src 
            }else{
                newScript.textContent = script.textContent
            }
            
            app.appendChild(newScript)
            script.remove()
        })
    })
}

function navigate(url) {
    history.pushState(null, null, url)
    render()
}

document.addEventListener('click', (e) => {
    if(e.target.matches("[data-link]")){
        e.preventDefault()
        navigate(e.target.href)
    }
})

window.addEventListener('popstate', render);

render();