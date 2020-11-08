module.exports = (req, res, next) => {
  require("../.env")
  const jwt = require("jsonwebtoken")
  const TOKEN_KEY = process.env.SECRET_KEY

  const token = req.headers.authorization.split(" ")[1]
  const data = jwt.verify(token, TOKEN_KEY)

  try {
    res.locals.user = data
    next()
  } catch (error) {
    // console.log(error)
    res.status(403).send("Unauthorized")
  }
}
