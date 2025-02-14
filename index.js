//app create
const express = require('express');
const app = express();


//find port
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//add middleware
app.use(express.json());

//add middleware for file upload
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

//connect with DB
const db = require('./config/database');
db.dbConnect();

//connect with cloud
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api route mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at port no. ${PORT}`);
});

