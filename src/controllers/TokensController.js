const { Token } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let tokens = null
      // const search = 'Wade in the Water.'
      const search = req.query.search
      if(search) {
        tokens = await Token.findAll({
          where: {
            [Op.or]: [
              'name','description'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
            // [Op.or]: [
            //   {title: { [Op.like]: '%' + search + '%' }},
            //   {artist: { [Op.like]: '%' + search + '%' }}
            // ]
          }
        })
      } else {
        tokens = await Token.findAll({
          limit: 10
        })
      }
      res.send(tokens)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the tokens'
      })
    }
  },
  async post (req, res) {
    try {
      const tokens = await Token.create(req.body)
      res.send(tokens)
    } catch (error) {
      res.status(400).send({
        error: 'Error while trying to add a new token'
      })
    }
  },
  async show (req, res) {
    try {
      const token = await Token.findByPk(req.params.tokenId)
      res.send(token)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the token'
      })
    }
  },
  async update (req, res) {
    try {
      await Token.update(req.body, {
        where: {
          id: req.params.tokenId
        }
      })
      res.send(req.body)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating the token'
      })
    }
  }
} 
