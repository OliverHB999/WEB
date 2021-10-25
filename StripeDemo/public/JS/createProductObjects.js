async function createProducts(){

    console.log("hello? ")

    let url = "http://localhost:3000/items";

    const jsonData = await fetch(url).then((res) => res.json());

    const body = document.querySelector('body');

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

    const btn = document.createElement('button')
    btn.className = "buyBtn"
    btn.innerHTML = "Buy"

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(price);
    div.appendChild(btn);

    body.appendChild(div)
    }

}

createProducts();