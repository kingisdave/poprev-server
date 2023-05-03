const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      console.log("USER lkjhgkg ",req.body.name)
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (error) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  },

  async login (req, res) {
    try {
      const { email, password } = req.body;
      await User.findOne({
          where: {
            email: email
          }
        })
      .then(async function (user) {
        if (!user) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        } else if(!await user.validPassword(password)) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        } else { 
          const userJson = user.toJSON()
          return res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        }
      })
    } catch (err) {
      return res.sendStatus(500).json({
        error: 'Error occured while trying to login'
      });
    }
  }
} 
