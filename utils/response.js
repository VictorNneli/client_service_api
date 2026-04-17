exports.sendResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        status:statusCode,
        message,
        data
    });
};