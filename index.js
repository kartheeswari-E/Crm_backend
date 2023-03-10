const express = require("express");
const db = require("./db/connect");
const app = express();
const mongoose = require('mongoose');
const Razorpay= require("razorpay")
const createuser = require("./route/createuser");
const loginuser = require("./route/loginuser");
const reset = require("./route/reset");
const car = require("./route/carpost");
const add = require("./route/add");
const doubt = require("./route/createdoubt");

const mentor = require("./route/creatementor");

const cors = require("cors");
require("dotenv").config();
db();
app.use(express.json({ extended: false }));
app.use(cors());

const OrderSchema = mongoose.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});
const Order = mongoose.model('Order', OrderSchema);

app.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.post('/create-order', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/pay-order', async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/list-orders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});




const PORT = process.env.PORT || 6000;
app.get("/", (request, response) => {
    response.send("Welcome to Crm Application");
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