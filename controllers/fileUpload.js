const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

//local file upload handler function 
/* This handler function basically takes a media from the path of the
 client and upload it on a path of the server
*/

exports.localFileUpload = async(req, res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File is => ", file);

        //first define the path of server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path = ", path);

        //add path to move funciton to move the file on that path
        file.mv(path, (err) => {
            console.log(err);
        });

        return res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
};

//handler of image upload

//function to upload file on cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    //this line will detect the file type automatically
    options.resource_type = "auto";
    console.log("Temp file path is =", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
  
// function to check file type
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

exports.imageUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);
        const file = req.files.imageFile;
        console.log("File is => ", file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is =", fileType);
        //check that if the file type is supported or not
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            })
        }

        //if we are here it means file format is supported

        //Now upload it to cloudinary
        const response = await uploadFileToCloudinary(file, "TestFileUpload");
        console.log("Response is => ", response);
        //save an entry into DB
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url
        });
        
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded on cloudinary"
        });

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Can't upload file. Something went wrong",
        });
    }
};


//handler of video upload

exports.videoUpload = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);
        const file = req.files.videoFile;
        console.log("File is => ", file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is =", fileType);
        //check that if the file type is supported or not
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            });
        }

        //if we are here it means file format is supported

        //Now upload it to cloudinary
        const response = await uploadFileToCloudinary(file, "TestFileUpload");
        console.log("Response is => ", response);
        //save an entry into DB
        const fileData = await File.create({
            name, 
            tags,
            email,
            videoUrl: response.secure_url
        });
        
        return res.status(200).json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video successfully uploaded on cloudinary"
        });

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Can't upload file. Something went wrong",
        });
    }
};

//handler of image size changer

exports.imageSizeChanger = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);
        const file = req.files.imageFile;
        console.log("File is => ", file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type is =", fileType);
        //check that if the file type is supported or not
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",
            })
        }

        //if we are here it means file format is supported

        //Now upload it to cloudinary
        const response = await uploadFileToCloudinary(file, "TestFileUpload", 80);
        console.log("Response is => ", response);
        //save an entry into DB
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url
        });
        
        return res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded on cloudinary"
        });

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Can't upload file. Something went wrong",
        });
    }
};

