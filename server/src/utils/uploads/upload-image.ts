import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

/**
 * Handles the image upload request.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Path to the uploaded image.
 */
const handleImageUpload = async (req: Request, res: Response) => {
  const id = uuidv4();

  const constructImageName = (image: UploadedFile) => {
    const fileExtension = image.mimetype.split('/')[1];
    return `${id}.${fileExtension}`;
  };
  const image = req.files?.image as UploadedFile;
  const imageName = constructImageName(image);

  image.mv(`src/uploads/${imageName}`, (err: Error) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to upload image',
      });
    }
  });

  return `/src/uploads/${imageName}`;
};

export default handleImageUpload;
