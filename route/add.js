const express=require('express')
const router=express.Router();
const { validate, ADD} = require("../models/add.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newAdd = new ADD(payload);

        await newAdd.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new details. Please check the data'});
            }

            res.status(201).send({addid: data._id, message: "details has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get("/alladd",async(req,res)=>{
    try{
ADD.find((err,data)=>{
    if(err){
        res.status(400).send({message:"error while retriving"})
    }
    res.status(200).send(data);
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }

})
router.delete("/delete/:addID",async(req,res)=>{
    try{
ADD.deleteOne({_id:req.params.addID},(err,data)=>{
    if(err){
        res.status(400).send({message:"error while deleting data"})
    }
    res.status(200).send({message:`deleted id ${req.params.addID} successfully`})
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }
})

module.exports=router;