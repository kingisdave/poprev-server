const passport =  require('passport');
const { User } = require('./models');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret // using the jwtsecret from config
  }, async function (jwtPayload, done) {
    try {
      // Check for the existence of user in database
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }

      return done(null, user) // this will set the user

    } catch (error) {
      return done(new Error(), false)
    }
  })
)

module.exports = null