const mongoose=require('mongoose');
const connectionURL=process.env.MONGODB_URL;
const databaseConnect=async()=>{
try {
    await mongoose.connect(connectionURL),{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
    }
    console.log("database is connected successfully");
} catch (error) {
    console.log("database is not connected");
}
}
module.exports=databaseConnect;