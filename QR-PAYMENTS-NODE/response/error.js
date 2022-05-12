// Handle errors
const errorResponse = (res, error = {}, statusCode = 500) => {
  res.json({
    success: false,
    error: {
      statusCode,
      message: error,
    },
  });
};

module.exports = errorResponse;
