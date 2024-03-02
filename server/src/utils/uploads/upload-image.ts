import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

import * as cloduinary from 'cloudinary';

import { environment } from '../../environments';
import handleDeleteImageByPath from './delete-image';

cloduinary.v2.config({
  cloud_name: environment.cloudinary_cloud_name,
  api_key: environment.cloudinary_api_key,
  api_secret: environment.cloudinary_api_secret,
});

/**
 * Handles the image upload request.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Path to the uploaded image.
 */
// TODO: Debug the image upload
const handleImageUpload = async (req: Request, res: Response) => {
  const id = uuidv4();

  const constructImageName = (image: UploadedFile) => {
    const fileExtension = image.mimetype.split('/')[1];
    return `${id}.${fileExtension}`;
  };
  const image = req.files?.image as UploadedFile;
  const imageName = constructImageName(image);
  let imageUrl = '';

  image.mv(`src/uploads/${imageName}`, (err: Error) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to upload image',
      });
    }
  });

  try {
    await cloduinary.v2.uploader.upload(`src/uploads/${imageName}`, { folder: 'takey' }, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 'fail',
          message: 'Failed to upload image',
        });
      }
      imageUrl = result.url;
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Failed to upload image',
    });
  } finally {
    handleDeleteImageByPath(`src/uploads/${imageName}`);
  }

  // return `/src/uploads/${imageName}`;
  return imageUrl;
};

export default handleImageUpload;
