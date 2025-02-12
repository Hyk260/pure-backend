module.exports = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ msg: "未授权!!!", code: 401 });
  } else {
    res.status(500).send("Internal Server Error");
  }
  next();
}