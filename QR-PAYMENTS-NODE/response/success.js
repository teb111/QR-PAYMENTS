const successResponse = (res, data) => {
  res.json({
    success: true,
    data,
  });
};

module.exports = successResponse;
