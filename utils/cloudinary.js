import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });



export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    // Создаем стрим из буфера и загружаем его в Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // auto позволяет загружать любые типы файлов
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Стримируем буфер в Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};