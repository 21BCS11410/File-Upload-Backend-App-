const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    tags:{
        type: String
    },
    email:{
        type: String
    }
});


//post middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);

        //create transporter

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `From Gaurav`,
            to: doc.email,
            subject: "New File Uploaded on cloudinary",
            html: `<h2>Hello Babes</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        });

        console.log("INFO", info);

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Something went wrong while sending the mail',
        })
    }

})



const File = mongoose.model("File", fileSchema);
module.exports = File;
