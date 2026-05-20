console.log("🔥 SERVER FILE IS RUNNING");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

console.log("MONGO_URI=", process.env.MONGO_URI);

const connectDB = async () => {
    try {
        console.log("Before DB");
            const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jwtauth";
            console.log("Using Mongo URI:", mongoUri);
            await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

console.log("Starting server...");
connectDB();
console.log("DB function called");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});