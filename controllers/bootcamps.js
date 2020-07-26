const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get all bootcamps
 * @route   Get /api/v1/bootcamps
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
});

/**
 * @desc    Get single bootcamp
 * @route   Get /api/v1/bootcamps/:id
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })

})

/**
 * @desc    Create new bootcamp
 * @route   Post /api/v1/bootcamps
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({
            success: true,
            data: bootcamp
        })


})

/**
 * @desc    Update bootcamp
 * @route   Put /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })
})

/**
 * @desc    Get bootcamp within a radius
 * @route   Delete /api/v1/bootcamps/radius/:zipcode/:distance
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude

    // Calc radius using radians

    // Divide dist by radius of Earth

    // Earth Radius = 3,963 mi / 6,378
    const radius = distance / 6378;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [lng, lat], radius ] } }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })

})

/**
 * @desc    Upload photo bootcamp
 * @route   PUT /api/v1/bootcamps/:id/photo
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }

        if(!req.files) {
            return next(new ErrorResponse(`Please upload a file`, 400))
        }
        const file = req.files.file

        // Make sure the image is a photo
        // if(!file.mimeType.startsWith('image')) {
        //     return next(new ErrorResponse(`Please upload an image file`, 400))
        // }

        // Check filesize
        if(file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload an image let than ${process.env.MAX_FILE_UPLOAD}`, 400))
        }

        // Create custom filename
        file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if(err) {
                return next(new ErrorResponse(`Problem with file upload`, 500))
            }
        })

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({
            success: true,
            data: file.name
        })

})

/**
 * @desc    Delete bootcamp
 * @route   Delete /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }

        bootcamp.remove();
        res.status(200).json({ success: true, data: {} })

})