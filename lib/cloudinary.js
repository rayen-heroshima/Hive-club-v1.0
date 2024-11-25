// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'; 

// Set up Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dz6rmpe5q', // Replace with your Cloudinary cloud name
  api_key: '429764621547327',       // Replace with your Cloudinary API key
  api_secret: 'y9sam01X2I8N9r6nxDdKKOF9yls', // Replace with your Cloudinary API secret
});

export default cloudinary;
