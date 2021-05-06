// This is a Handler function to wrap each route
exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global handler  
      next(error);
    }   
  }  
}