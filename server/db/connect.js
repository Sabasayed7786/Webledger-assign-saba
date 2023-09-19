const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

module.exports = connectDB;
