const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes an image from Cloudinary
 * @param {string} imageUrl - The full Cloudinary image URL to extract the public ID
 * @returns {Promise<boolean>} - Returns true if deleted, false otherwise
 */
const deleteImage = async (imageUrl) => {
    try {
        if (!imageUrl) {
            throw new Error("Image URL empty");
        }

        console.log(imageUrl);
        

        // Extract the public ID from the URL
        const parts = imageUrl.split("/");
        const filename = parts.pop().split(".")[0]; // Extracts the filename without extension
        // const folder = parts.slice(-2, -1)[0]; // Gets the folder name (if applicable)
        const publicId = filename;

        console.log(publicId);
        

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);
        
        if (result.result === "ok") {
            console.log("Image deleted successfully:", publicId);
            return true;
        } else {
            console.error("Failed to delete image:", result);
            return false;
        }
    } catch (error) {
        console.error("Cloudinary delete error:", error.message);
        return false;
    }
};

module.exports = { cloudinary, deleteImage };