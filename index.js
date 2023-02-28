const express = require("express");
const db = require("./db/connect");
const app = express();
const createuser = require("./route/createuser");
const loginuser = require("./route/loginuser");
const reset = require("./route/reset");
const car = require("./route/carpost");
const add = require("./route/add");
const doubt = require("./route/createdoubt");
const{v4:uuidv4}=require("uuid")
const mentor = require("./route/creatementor");
const stripe=require("stripe")(process.env.SECRET_KEY)
const cors = require("cors");
require("dotenv").config();
db();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (request, response) => {
    response.send("Welcome to Crm Application");
  });

  app.post('/api/payment',(req,res)=>{
    const{data,token}=req.body;
   const transkey=uuidv4();
   return stripe.customers.create({
    email:token.email,
    source:token.id,
   }).then((customer)=>{
    stripe.charges.create({
      amount:data.price,
      currency:"inr",
      customer:customer.id,
      receipt_email:token.email,
      description:data.name
    }).then((result)=>{
      res.json(result);
    }).catch((err)=>{
      console.log(err);
    });
   });
  });
  app.use("/api/createuser", createuser);
  app.use("/api/reset", reset);
  app.use("/api/loginuser", loginuser);
  app.use("/api/car", car);
  app.use("/api/add", add);
  app.use("/api/mentor", mentor);
  app.use("/api/doubt", doubt);
  app.listen(PORT, () => {
    console.log(`the app is running in the port ${PORT}`);
  });