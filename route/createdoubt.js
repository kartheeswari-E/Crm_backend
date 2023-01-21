const express=require('express')
const router=express.Router();
const { validate, DOUBT} = require("../models/doubt.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newdoubt = new DOUBT(payload);

        await newdoubt.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new details. Please check the data'});
            }

            res.status(201).send({doubtid: data._id, message: "details has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get("/alldoubt",async(req,res)=>{
    try{
DOUBT.find((err,data)=>{
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
router.put('/update/:doubtID', (req, res) => {
    try{
      DOUBT.findByIdAndUpdate({_id: req.params.doubtID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing details. Please check the data'})
            }

            res.status(201).send({doubtid:data._id, message: "details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});


router.delete("/delete/:doubtID",async(req,res)=>{
    try{
DOUBT.deleteOne({_id:req.params.doubtID},(err,data)=>{
    if(err){
        res.status(400).send({message:"error while deleting data"})
    }
    res.status(200).send({message:`deleted id ${req.params.doubtID} successfully`})
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }
})

router.get('/:doubtID', (req, res) => {
    try{
      DOUBT.findOne({_id: req.params.doubtID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an details. Please check the data'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});


module.exports=router;