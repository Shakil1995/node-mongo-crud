const express = require('express');
const bodyParser =require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId =require('mongodb').ObjectID;

const password = 'NoLDnYEkXWbEEkwr';

const uri = "mongodb+srv://organicUser:NoLDnYEkXWbEEkwr@cluster0.measz.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html');
})




client.connect(err => {
  const productCollection = client.db("organicdb").collection("porducts");
  
app.get('/products',(req, res) =>{
  productCollection.find({ })
  .toArray( (err,document) => {
    res.send(document);
  })
})
  
//load Product 

app.get('/product/:id',(req, res) =>{
  productCollection.find({_id: ObjectId(req.params.id)})
  .toArray( (err,document) => {
    res.send(document[0]);
  })
})

 app.post("/addProduct",(req, res) =>{
       const product = req.body;
    productCollection.insertOne(product)
    .then(result =>{
      console.log('data added successfully');
      res.redirect('/')
    })
    // console.log(product);
 })
 //update product 

 app.patch('/update/:id', (req, res) =>{
   productCollection.updateOne({_id: ObjectId(req.params.id)},
   {
     $set: {price:req.body.price , quantity:req.body.quantity}
   })
   .then (result =>{
     console.log('result hiyce ', result);
   })
 })


//delete product

app.delete('/delete/:id',(req, res) =>{
  // console.log(req.params.id);
  productCollection.deleteOne({_id: ObjectId(req.params.id)})
  .then ( ( result)=>{
    console.log(result);
  } )
})

});


app.listen(4000);