
let url = "http://localhost:3000/items"

async function fetchProducts(url){

const data = await fetch(url)
  .then((response) => response.json())

  console.log(data);

}

fetchProducts(url);

