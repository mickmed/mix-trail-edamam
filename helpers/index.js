module.exports = (req, res, next) => {
  // require("../.env")
require('dotenv').config()

  const jwt = require("jsonwebtoken")
  const TOKEN_KEY = process.env.SECRET_KEY

  console.log('sssssssssssssssssssssssssssssssssssssssssss', TOKEN_KEY)

  const token = req.headers.authorization.split(" ")[1]

  console.log('tttttttttttttttttttttttttttttt', token)
  const data = jwt.verify(token, TOKEN_KEY)

  try {
    res.locals.user = data
    next()
  } catch (error) {
    // console.log(error)
    res.status(403).send("Unauthorized")
  }
}
