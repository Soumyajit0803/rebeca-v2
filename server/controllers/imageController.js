const catchAsync = require("../utils/catchAsync");
const { cloudinary } = require("../utils/cloudinary");

exports.uploadImage = catchAsync(async (req, res, next) => {
    try {
        let cloudinaryResponse;
        const preset = req.query.upload_preset

        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: preset,
            });
        } else {
            console.log("Provide a file please");
            return next();
        }

        res.status(200).json({
            status: "success",
            data: {
                imageUrl: cloudinaryResponse?.url,
            },
        });
    } catch (e) {
        return next(e);
    }
});
