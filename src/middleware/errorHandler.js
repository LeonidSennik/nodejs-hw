
export const errorHandler = (err, req, res, next) => {
  console.error(err);
 next();
  const isProd = process.env.NODE_ENV === 'production';

  res.status(err.status || 500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
