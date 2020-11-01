module.exports = (req, res, next) => {
  require('../.env')
  const jwt = require('jsonwebtoken')
  const TOKEN_KEY = process.env.SECRET_KEY
  console.log('outside', TOKEN_KEY, req.headers)
  try {
    console.log('token', token, req.headers)

      // const token = req.headers.authorization.split(' ')[1]
      // console.log('token', token, req.headers)
      // const data = jwt.verify(token, TOKEN_KEY)
      // res.locals.user = data
      // next()
  } catch (error) {
      // console.log(error)
      res.status(403).send('Unauthorized')
  }
}