const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get all bootcamps
 * @route   Get /api/v1/bootcamps
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
    } catch (e) {
        res.status(404).json({
            success: false
        })
    }
}

/**
 * @desc    Get single bootcamp
 * @route   Get /api/v1/bootcamps/:id
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (e) {
        next(e)
    }
}

/**
 * @desc    Create new bootcamp
 * @route   Post /api/v1/bootcamps
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (e) {
        next(e)
    }

}

/**
 * @desc    Update bootcamp
 * @route   Put /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (e) {
        next(e)
    }
}

/**
 * @desc    Delete bootcamp
 * @route   Delete /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${ req.params.id } `, 400))
        }
        res.status(200).json({ success: true, data: {} })
    } catch (e) {
        next(e)
    }
}