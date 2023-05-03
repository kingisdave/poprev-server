const { Transaction } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let transactions = null
      const search = req.query.search
      if(search) {
        transactions = await Transaction.findAll({
          where: {
            [Op.or]: [
              'name','description','createdAt'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        transactions = await Transaction.findAll({
          limit: 10
        })
      }
      res.send(transactions)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the transactions'
      })
    }
  }, 
  async show (req, res) {
    try {
      const transaction = await Transaction.findByPk(req.params.transactionId)
      res.send(transaction)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the transaction'
      })
    }
  },
  async delete (req, res) {
    try {
      const {transactionId} = req.params
      const transaction = await Transaction.destroy({
        where: {
          id: transactionId 
        }
      });
      res.send(transaction)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while deleting transaction'
      })
    }
  }
} 
