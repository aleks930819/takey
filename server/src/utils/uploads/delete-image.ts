import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Deletes an image file
 * @param imagePath - The path to the image file.
 */
const handleDeleteImageByPath = async (imagePath: string) => {
  const pathToFile = path.join(__dirname, imagePath);

  try {
    await fs.unlink(pathToFile);
  } catch (error) {
    console.error(error);
  }
};

export default handleDeleteImageByPath;
