import fs from 'fs';

export const removeFromUploads = (fileName) => fs.unlink(`./uploads/${fileName}`, (err) => console.log(err));