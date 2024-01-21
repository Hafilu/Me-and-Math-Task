import mongoose from "mongoose";
const { Schema } = mongoose;

/** user model */
const userModel = new Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userModel);
