function confirmSecret (req, res, next) {
  if (req.body.secret !== process.env.BUILD_SERVER_SECRET) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  next();
}

module.exports = confirmSecret;
