import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

/**
 * Handles the image upload request.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The name of the uploaded image.
 */
const handleImageUpload = (req: Request, res: Response) => {
  const id = uuidv4();

  const constructBannerImageName = (image: UploadedFile) => {
    const fileExtension = image.mimetype.split('/')[1];
    return `${id}.${fileExtension}`;
  };
  const image = req.files?.image as UploadedFile;
  const imageName = constructBannerImageName(image);

  image.mv(`src/uploads/${imageName}`, (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to upload image'
      });
    }
  });

  return imageName;
};

export default handleImageUpload;
