const fs = require('fs').promises;
const path = require('path');

const deleteFiles = async (filePaths) => {
  try {
    const deletePromises = filePaths.map(filePath => {
      const resolvedPath = path.resolve(__dirname, `../public${filePath}`);
      return fs.unlink(resolvedPath);
    });

    await Promise.all(deletePromises);
    console.log('All files have been deleted successfully');
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
};

module.exports = { deleteFiles };