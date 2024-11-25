import express from "express"
import mongoose from "mongoose"
const app = express()
const port = process.env.PORT || 3000
import { signup } from "../backend/model/schema.js"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt";
import 'dotenv/config'
import sendMailToVerify from "./sendMail.js"
import otpGenerator from 'otp-generator'


// middleware
app.use(bodyParser.json())
app.use(cors())

await mongoose.connect(process.env.MONGODB_URL);


app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/login', async (req, res) => {
    try {

        let loginDetails = req.body;
        console.log(req.body);
        let userData = await signup.findOne({ email: loginDetails.email });
        let authentication = await bcrypt.compare(loginDetails.password, userData.password)
        if (userData === null) {
            res.status(401).json({ message: "Invalid email or password" });
        } else if (authentication) {
            res.status(200).json({ userData });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Invalid email or password" });
    }

})

// verifying mail here
// sendMailToVerify(usermailhere);
app.post('/verifyEmail', async (req, res) => {
    try {
        const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });
        let usermail = req.body.verifyEmail;
        let userAlreadyPresent = await signup.findOne({ email: usermail });

        if (userAlreadyPresent !== null) {
            // console.log("user found")
            res.status(401).json({ message: "User already present , Go to login page" });
        } else {
            // console.log("user not found")
            console.log(usermail + " and otp is -> " + otp);
            sendMailToVerify(usermail, otp);
            res.status(200).json({ otp: otp, message: "OTP send successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})

// Add the data into database
app.post('/signUp', async (req, res) => {
    try {
        console.log(req.body);
        let signupDetails = req.body;
        await signup.create(signupDetails) //save to database
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }

})

app.post('/resetPassword', async (req, res) => {
    try {
        let newPassword = req.body.password;
        let useremail = req.body.email;
        let hashPass = await bcrypt.hash(newPassword, 10);
        console.log(hashPass);
        await signup.updateOne({ email: useremail }, { $set: { password: hashPass } });
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.post('/forgetPasswordEmailVerification', async (req, res) => {
    try {
        // console.log(req.body);
        let useremail = req.body.Email;
        let findUserInDatabase = await signup.findOne({ email: useremail })
        if (findUserInDatabase) {
            let otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false })
            sendMailToVerify(useremail, otp);
            console.log(useremail + " and otp is -> " + otp);
            res.status(200).json({ otp: otp, message: "OTP sent successfully" });
        } else {
            res.status(401).json({ message: "User not exits , Go to signUp page" })
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`AuthPortal app listening on port http://localhost:${port}`)
})