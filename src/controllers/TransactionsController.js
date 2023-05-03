const { Token, Project, Transaction } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let tokens = null
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
  async delete (req, res) {
    try {
      const {tokenId} = req.params
      const token = await Token.destroy({
        where: {
          id: tokenId 
        }
      });
      res.send(token)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while deleting token'
      })
    }
  }
} 
