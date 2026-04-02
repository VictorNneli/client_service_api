exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' :err.message,
        data: null
     
    });
}