const express = require('express')
const app = express();
const bodyParse = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const Products = require("./Routes/Product")

require('dotenv').config();

require('./Models/db')

const PORT = process.env.PORT || 8080;

app.use(bodyParse.json())
app.use(cors())

app.use('/auth',AuthRouter)

app.use('/products',Products)

module.exports = (req, res) => {
    // This runs the Express app within the Vercel serverless function
    app(req, res);
  };


app.listen(PORT,()=>{
    console.log("Server is Running on : " + PORT)
})
