import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

export const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};