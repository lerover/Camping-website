// route registration 
const routes = {
    "" : '/pages/home.html',
    "product" : '/pages/products.html',
    'cart' : '/pages/cart.html',
    'about' : '/pages/about.html'

}

function render() {
    const hash = window.location.hash.slice(1); // remove #
    console.log(hash)
    const file = routes[hash] || '/pages/404.html'
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
        const scriptPath = `/js/pagesJS/${hash || 'home'}.js`;
        try{
            const module = await import(scriptPath);
            console.log(scriptPath)
            module.init?.();
        }catch (err) {
            console.warn(`No script module found for ${scriptPath}`);
        }
    })
}

function navigate(hash) {
    location.hash = hash
    render()
}

document.addEventListener('click', (e) => {
    if(e.target.matches("[data-link]")){
        e.preventDefault()
        const hash = new URL(e.target.href).hash
        console.log(hash)
        navigate(hash)
    }
})

window.addEventListener('hashchange', render);

render();