import express, { request } from "express"
import cors from "cors"
import mongoose from 'mongoose';
import fs from 'fs';
import admin from "firebase-admin";
import { stringToHash } from "bcrypt-inzi";

https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
    "type": "service_account",
    "project_id": "e-commerce-c21d9",
    "private_key_id": "e2dace9837e6cbcbba106ac411561c36ffd7dc8a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCmhHU0x1d7u12\nXHPl0H82shIEqEaUehVm2NJmBB7Q7bOjzgul7cQpu/XlWERv+pSAf9P4J+LIvMcP\nT0epMrcLS/P4MxPPrwBCgiPcb4+xWuP6/cN9u4Hh6rSX1rbS6/JU6TCRumFDbJKQ\n2rJCxxDF6w4FLsCsLI2VInksJmkKaWMxPrl6HtffatXOaS2qD6fu1kbwFCh9pXxu\n+POn69zIqHdPeKr9I2ODediQE3M1L/f9psGBKzkzPnwezroUw5H8c4/Q58GAM3dA\nJg5jM5qoiFf+IvEpdbOjKGhGPHMZQcvbrWqYPJS27M3Nd/OBbyf8suN/QNmsSR+R\nklLz5+9jAgMBAAECggEANnlde3d7dYOACo13zgGu0rdHLvGSDFcebZNNVkxZ+f9I\nNZbkkNa9fjdE7qXmRnhdIJln00QLCkk56dG2DCmLrshcq4JUzeK9jmCSvE6oaSu5\nvNVTZ3tZMM38LrLmq6VryRQbyfdj6bVXU+A8XVAPJHAXlSDQw4GXQoOLau33ond/\nuqs7ZqkQ/LAcLFqjAFwBOEIE7UrL1P5XmdKrNDEV4GWqRgfYvb6pLRX5aGSULkQd\nqAsZ76HD6Z2eYxeueo0uaWgMHnNIJZ4YKzefR1L1IWgprT/p+MiMfn8Up6oGnYrK\ndMFVqsJtxtZOWDxsLQbmRsueFMxkqIeFbpjo11qtrQKBgQDpsPxB/aDnXr9iSyMO\nIsPddzQzGhlWwhnVLz8GXcJIS+C3Ivp0SlCsbuJNju00vhRi6nk+wiWtIU2SId8r\nVtRswNGq7ao5NbEQVwB4th8qskIm6kDVfepUN15EPYN++005qnVpE0fc9m6boWh3\n3BqaV+HcFp2H5s2budPU1Yc0XQKBgQDVLc3D7EKN95vGgcbHDQOG7KpF6eynYk4L\nHjtlLj/n9Kz6EVmfGpify0tk4EJVSGfA3Iy+Hmk1bAtGF0faV+6zDM8er8yHS3Kr\n4gMW6lC4jC6UacHXrLWWfADo2aNMqd7GPAW6uj1HsAaQBYy19jyYrAoVR9MZjOGK\n/+vEuyl2vwKBgQCYuQ/C2MxlKOiOhmg8fr/eZl743p+csXFMf3oC4RdtRBlx1iwz\n/7VFW5oN8dBX3blZA7+FIkCZKuCVFgnROwfMox7jRDsw9EPpV9J5ERzBPIo7AHCq\nlYWk0CKNGl5riDRp8VqV9wHKCEs07oFlg7TnFXQH78e330CT+xfTSlD4CQKBgF4T\n2qzOBQkV7t8Jwqlxas8Ofo5gD5pG3d42N0wNvxIkfnnVUlHOsPBEDT+1YFC2pWMN\ncectEI0M42TJPWJ0T9kgm/8U4hQLDc4g7fAc9AadhqjkizEc/P4uN1CLS2+3v6KI\nNpcTPZv3aM4CRPjAdDmEIucFTXoHHDn1exzU5BWNAoGBANI3AuCm1gofVNbYoEAP\nAfHpkjm3mtzcSezpIjTyAdlu8zwx7ek2mWMOAK49ji70nYncv675mxj5+/eGZA8F\n3uXDQ3AZZc0s8rQluChup5HQfRjHLYO8wG3c4s6mBxGyYZHOq3yHcH67LniZBmtj\n2RXMs0zA3EshcA92WsL/gkLh\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xhvmu@e-commerce-c21d9.iam.gserviceaccount.com",
    "client_id": "117232524921390836693",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xhvmu%40e-commerce-c21d9.iam.gserviceaccount.com"

};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:  "https://e-commerce-c21d9.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://e-commerce-c21d9.appspot.com");



//==============================================
import multer from 'multer';
const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })

//==============================================






const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors(
  {
    origin : ['http://localhost:3002' , "*"],
    credentials : true
  }
))

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    code: { type: String }



  });
const productModel = mongoose.model('product', productSchema);


app.post('/product', async (req, res) => {
  console.log("product received", req.body)
  let newProduct = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    code: req.body.code
  })
  try {
    let response = await newProduct.save()
    console.log("product added", response)
    res.send({
      message: "product added",
      data: response
    })

  }

  catch (error) {
    console.log("failed to add product" , error)
    res.status(500).send({
      message: "failed to add product"
    })
  }
})




app.get('/products', async (req, res) => {
  try {
    let products = await productModel.find({}).exec()
    console.log("all products", products)
    res.send({
      message: "all product",
      data: products
    })
  }

  catch {
    res.send({
      message: "error in getting all products"
    })
  }
})

app.get('/product/:id', async (req, res) => {

  try {
    let product = await productModel.findOne({ _id: req.params.id }).exec()
    res.send({
      message: "product",
      data: product
    })
  }
  catch {
    res.send({
      message: "error in getting product"
    })

  }
})


app.delete('/product/:id', async (req, res) => {
  try {
    let deleted = await productModel.deleteOne({ _id: req.params.id }).exec()
    res.send({
      message: "product deleted",
      data: deleted
    })
  }
  catch {
    res.send({
      message: "error in deleting product"
    })
  }
})

app.put('/product/:id', async (req, res) => {

  console.log("product to be edit", req.body)
  let update = {}
  if (req.body.name) update.name = req.body.name 
  if (req.body.description) update.description = req.body.description
  if (req.body.price) update.price = req.body.price
  if (req.body.code) update.code = req.body.code

  try {
    let edit = await productModel.findOneAndUpdate({ _id: req.params.id },
      update, { new: true }).exec() 

    console.log("updated product", edit)
    res.send({
      message: "product updated successfully",
      data: edit
    })
  }
  catch {
    res.send({
      message: "error in updating product"
    })
  }




})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const dbURI = process.env.MONGODBURI || 'mongodb+srv://abc:abc@cluster0.iunhwh0.mongodb.net/Productcrud?retryWrites=true&w=majority';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});