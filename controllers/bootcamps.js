/**
 * @desc    Get all bootcamps
 * @route   Get /api/v1/bootcamps
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'show all bootcamps' })
}

/**
 * @desc    Get single bootcamp
 * @route   Get /api/v1/bootcamps/:id
 * @access  Public
 * @param req
 * @param res
 * @param next
 */
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'display bootcamp' })
}

/**
 * @desc    Create new bootcamp
 * @route   Post /api/v1/bootcamps
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'create bootcamp' })
}

/**
 * @desc    Update bootcamp
 * @route   Put /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'update bootcamp' })
}

/**
 * @desc    Delete bootcamp
 * @route   Delete /api/v1/bootcamps/:id
 * @access  Private
 * @param req
 * @param res
 * @param next
 */
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'delete bootcamp' })
}