// TODO: actually set up auth middleware

module.exports = (req, res, next) => {
  console.log("Request type: ", req.method);
  next();
};

