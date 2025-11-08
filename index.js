import express from "express";  
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv"; 
import nodemailer from "nodemailer"
import { MESSAGE } from "./constants.js";

const app = express(); 
const PORT = 3000

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
})

app.post("/submit", async (req , res) => {
    console.log("HIT"); 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_APP_USEREMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

    const email = req.body.email; 
    const name = req.body.name; 

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_APP_USEREMAIL, 
            to: email, 
            subject: "Hello from SubmitForm", 
            text: `Hey ${name}, 
                    ${MESSAGE}`
        });

        res.send({
            success: true, 
            message: `Hey ${name}, please check your inbox at ${email}.`
        })
    }
    catch {
        console.error(error);
        res.send({
            success: false, 
            message: `Uh oh, server issue. Please check again!`
        })
    }
})

