async function createProducts(){

    let url = "http://localhost:3000/items";

    const jsonData = await fetch(url).then((res) => res.json());

    const body = document.querySelector('body');

    let id = 1;

    for (const product of jsonData) {
        
    const div = document.createElement('div');
    div.className = 'container';

    const img = document.createElement('img');
    img.className = "image";
    img.src = product.imgsrc;

    const title = document.createElement('h3');
    title.className = "name"
    title.innerHTML = product.productName;

    const price = document.createElement('h4');
    price.className = "price";
    price.innerHTML = product.price +",- DKK";

    const divAdd = document.createElement('div');

    const cbox = document.createElement('input');
    cbox.type = "checkbox"
    cbox.className = "cbox"
    cbox.param = id;

    const lbl = document.createElement('label');
    lbl.innerHTML = "Add to cart"

    divAdd.appendChild(cbox);
    divAdd.appendChild(lbl);

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(price);
    div.appendChild(divAdd);

    body.appendChild(div)

    id++;
    }

}

createProducts();