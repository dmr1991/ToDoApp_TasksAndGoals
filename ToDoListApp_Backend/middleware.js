module.exports = function (req, res, next) {
  const apiKey = req.headers.authorization;
  if (apiKey === 'dinamorales') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized, invalid Key' });
  }
};