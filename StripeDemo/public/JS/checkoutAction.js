const btn = document.querySelector('#checkout_btn')

btn.addEventListener('click', () => {

    const cart = [...document.querySelectorAll('.cbox')].filter((item) => item.checked == true);

    let ids = cart.map((item) => item = item.param)

     fetch('/create-checkout-session', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ids: ids
        })
    })
    .then(res => { 
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
        window.location = url;
    })
    .catch(e => {
        console.error(e.error)
    })

})
