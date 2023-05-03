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
  async post (req, res) {
    try {
      const projectId = req.params.projectId;
      const project = await Project.findByPk(projectId)
      if(!project) {
        res.status(400).send({
          error: 'Project not found while creating a new token'
        })  
      }
      const tokenData = {
        projectId,
        ...req.body
      };
      const tokens = await Token.create(tokenData)
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
  async buyToken (req, res) {
    try {
      
      const token = await Token.findByPk(req.params.tokenId);
      const transactionData = {
        userId: req.user.id,
        tokenId: req.params.tokenId,
        ...req.body
      }
      if (!token) {
        return res.status(404).send({
          error: 'Token not found'
        });
      }
      await token.update({status: "PROCESSING"})
      await token.updateAndCalculateTotal(req.body.amount);
      const transaction = await Transaction.create(transactionData);
      if (!transaction) {
        return res.status(404).send({
          error: 'You are not able to acquire this token'
        });
      }
      res.send(req.body)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating the token'
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
