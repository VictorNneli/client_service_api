exports.sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data
    });
};