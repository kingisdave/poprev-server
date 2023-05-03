const { User } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let users = null
      // const search = 'Wade in the Water.'
      const search = req.query.search
      if(search) {
        users = await User.findAll({
          where: {
            [Op.or]: ['name', 'email'].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        users = await User.findAll({
          limit: 10
        })
      }
      res.send(users)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the users'
      })
    }
  },
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the users'
      })
    }
  },
  async update (req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.userId
        }
      })
      res.send(req.body)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating user'
      })
    }
  }
  
} 
