const path = require('path')

module.exports = {
  port: process.env.PORT || 8181,
  db: {
    database: process.env.DB_NAME || 'poprev',
    user: process.env.DB_USER || 'poprev',
    password: process.env.DB_PASS || 'poprev',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../poprev-db.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}