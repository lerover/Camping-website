const base = window.location.pathname.replace(/\/$/, ''); // remove trailing slash if any


// route registration 
const routes = {
    "": `${base}/pages/home.html`,
    "product": `${base}/pages/products.html`,
    "cart": `${base}/pages/cart.html`,
    "about": `${base}/pages/about.html`,
    "contact": `${base}/pages/contact.html`,
    "login": `${base}/pages/signIn.html`,
    "register": `${base}/pages/register.html`,
    "privacy": `${base}/pages/privacyPolicy.html`,
    "404": `${base}/pages/404.html`, // optional fallback if needed
}

function render() {
    const hash = window.location.hash.slice(1); // remove #
    console.log(hash)
    const file = routes[hash] || '/pages/404.html'
    console.log(file)
    fetch(file)
    .then(response => response.text())
    .then(async html => {
        console.log(html)
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
        const scriptPath = `${base}/js/pagesJS/${hash || 'home'}.js`;
        try{
            const module = await import(scriptPath);
            console.log(scriptPath)
            module.init?.();
        }catch (err) {
            console.log(err)
            console.warn(`No script module found for ${scriptPath}`);
        }
    })
    .catch(err => {
        console.log(err)
        console.warn(`No script module found for ${scriptPath}`);
        location.hash = '404'
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