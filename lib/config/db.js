import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://kashish:toor@cluster0.iaoad04.mongodb.net/blog-app")
    console.log("DB Connected");
}