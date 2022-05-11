const notFound = (req, res, next) => {
    const error = new Error('not found - ${req.originalUrl} ');
    res.status(404);
    next(error);
}

const errorHandler = (error,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
        //identify the stalk trace for debuging make it invisable when in deployment b/c it can be used for attacking
      });
    
};

module.exports = {
    notFound,
    errorHandler,
  };
  