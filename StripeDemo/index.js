require("dotenv").config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const path = require('path');
const fetch = require('node-fetch')
const fs = require('fs');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
})

app.get('/success', (req, res) => {
  res.send("success");
})

app.get('/cancel', (req, res) => {
  res.send("cancel");
})

app.get('/images/:img', (req, res) => {
  
  let imgurl = req.params.img + ".jpg";

  try {
    res.sendFile(`C:/Users/Olive/WEB/StripeDemo/public/images/${imgurl}`)
    res.status(200)
  } catch (error) {
   res.status(500)
  }
})

app.get('/items' , async (req, res) =>{
  let json = fs.readFileSync(__dirname+'/data.json');
  let data = await JSON.parse(json);
  try {
    res.send(data)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})

app.post('/create-checkout-session', async (req, res) =>{

  const products = await fetch('http://localhost:3000/items').then((res) => res.json())

   try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.ids.map((id) => {
        const product = products[id-1];
        return {
          price_data: {
            currency: 'dkk',
            product_data: {
              name: product.productName,
              images: ["https://pbs.twimg.com/media/E0VOoGAXoAAMOfm.png"]
            },
            unit_amount: product.price * 100,
          },
          quantity: 1
        }
      }),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000'
    })
    res.json({ url: session.url})
  } catch (e) {
    res.status(500).json({ error: e.message })
    return;
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})