import mongoose from "mongoose";
import bcrypt from "bcrypt";
const signupSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    address: String,
    created_at: { type: Date, default: Date.now }
});

signupSchema.pre("save", async function (next) {
    console.log(`before submiting in database  ${this.password}`)
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`after submiting in database  ${this.password}`)
    next();
})

export const signup = mongoose.model('signup', signupSchema);