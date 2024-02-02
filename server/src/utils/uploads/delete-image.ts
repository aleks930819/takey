import * as fs from 'fs/promises';

/**
 * Deletes an image file by its name from the uploads directory.
 * @param imageName - The name of the image file to delete.
 */
const handleDeleteImageByName = async (imageName: string) => {
  const path = `src/uploads/${imageName}`;
  try {
    await fs.unlink(path);
  } catch (error) {
    console.error(error);
  }
};

export default handleDeleteImageByName;
