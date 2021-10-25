const express = require('express');
//const stripe = require('stripe');
const path = require('path');
const fs = require('fs');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})