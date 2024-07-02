// const mongoose=require('mongoose');
// const connectionURL=process.env.MONGODB_URL;
// const databaseConnect=async()=>{
// try {
//     await mongoose.connect(connectionURL),{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
//     }
//     console.log("database is connected successfully");
// } catch (error) {
//     console.log("database is not connected");
// }
// }
// module.exports=databaseConnect;

const mongoose = require('mongoose');
const connectionURL = 'mongodb://localhost:27017/chatApp'; // Ensure this URL is correct

const connectDB = async () => {
    try {
        await mongoose.connect(connectionURL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Database is connected successfully");
    } catch (error) {
        console.log("Database is not connected:", error);
    }
};

module.exports=connectDB;
