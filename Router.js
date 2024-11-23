const express=require('express');
const app=express();
const cors=require('cors');
const mongoose  = require('mongoose');
app.use(cors());
app.use(express.json());
const userPosts=require('./models/Todo.js');
app.post('/',async(request,response)=>{
    try{
       await userPosts.create(request.body);
       response.status(200).send({message:"Posted Succefuuly"})
    }catch(error){
        response.status(500).send({message:error.message})
    }
})
app.put('/statusupdate/:id',async(request,response)=>{
    try{
        const{id}=request.params;
       await userPosts.updateOne({_id:id},{$set:{work_status:"Completed"}})
       response.status(200).send({message:"Status updated successfully"})
    }catch(error){
        response.status(500).send({message:error.message})
    }
})
app.put('/edit/:id',async(request,response)=>{
    try{
        const{id}=request.params;
      const{title,description}=request.body;
      await userPosts.updateOne({_id:id},{$set:{title,description}})
      response.status(200).send({message:"Your modification have done"})
    }catch(error){
        response.status(500).send({message:error.message})
    }
})
app.get('/',async(request,response)=>{
    try{
      const posts=await userPosts.find();
      response.status(200).send({posts});
    }catch(error){
        response.status(500).send({message:error.message})
    }
})
app.delete('/remove/:id',async(request,response)=>{
    try{
       await userPosts.deleteOne({_id:request.params.id})
       response.status(200).send({message:'Deleted Succefully'})
    }catch(error){
        response.status(500).send({message:error.message})
    }
})
mongoose.connect("mongodb+srv://satyabhaskargandham:o7dgTkLKkqExsOZ7@assingment.2lrly.mongodb.net/?retryWrites=true&w=majority&appName=Assingment")
.then(()=>{
    console.log('connected to database!..')
    app.listen(4000,()=>(console.log("Server is Running ....")))
})
.catch((error)=>{
    console.log(`connection-failed ${error}`)
})
