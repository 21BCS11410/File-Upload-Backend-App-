# File Upload App Backend

This is the backend of a File Upload application built using the MERN (MongoDB, Express, React, Node.js) stack. This backend handles file uploads (images and videos) to Cloudinary, resizes images, and sends an email notification upon successful upload.

## Features

- Upload images and videos to Cloudinary
- Resize images before uploading
- Send an email notification after successful upload

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Cloudinary API
- Nodemailer for email notifications

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/FileUpload-app-backend.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following:
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MONGODB_URL=mongodb://localhost:27017/FileUploadDB
   PORT=3000
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email
   MAIL_PASS=your_email_password
   ```

## Running the Server

Start the development server with:

```sh
npm run dev
```

The backend will be running on `http://localhost:3000` by default.

## API Endpoints

### Base URL: `/api/v1/upload`

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| POST   | `/localFileUpload`  | Upload a file locally         |
| POST   | `/imageUpload`      | Upload an image to Cloudinary |
| POST   | `/videoUpload`      | Upload a video to Cloudinary  |
| POST   | `/imageSizeChanger` | Resize and upload an image    |

##

