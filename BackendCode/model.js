const mongoose=require('mongoose')
const userPostsSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    work_status:{
        required:true,
        type:String
    }
},{timestamps:true})
const userPosts=new mongoose.model('userPosts',userPostsSchema);
module.exports=userPosts;
