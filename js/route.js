// route registration 
const routes = {
    "/" : '/pages/products.html',
    "/home" : '/pages/home.html',

}

function render() {
    const path = window.location.pathname;
    const file = routes[path] || '/pages/404.html'
    fetch(file)
    .then(response => response.text())
    .then(async html => {
        const app = document.getElementById('app')

        //clear app inner html
        app.innerHTML = '';

        //temp container
        const temp = document.createElement('div');
        temp.innerHTML = html;

        //move content (no script)
        //temp.childNodes represents for elements got after fetching
        [...temp.childNodes].forEach(node => {
            if(node.tagName !== 'SCRIPT'){
                app.appendChild(node.cloneNode(true));
            }
        })

        //Dynamically import js module based on path
        const scriptPath = `/js${path || 'home'}.js`;
        try{
            const module = await import(scriptPath);
            module.init?.();
        }catch (err) {
            console.warn(`No script module found for ${scriptPath}`);
        }
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