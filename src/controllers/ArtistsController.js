const { Artist } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let artists = null
      // const search = 'Wade in the Water.'
      const search = req.query.search
      if(search) {
        artists = await Artist.findAll({
          where: {
            [Op.or]: [
              'name','stageName'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        artists = await Artist.findAll({
          limit: 10
        })
      }
      res.send(artists)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the artists'
      })
    }
  },
  async post (req, res) {
    try {
      const artists = await Artist.create(req.body)
      res.send(artists)
    } catch (error) {
      res.status(400).send({
        error: 'Error while trying to add a new artist'
      })
    }
  },
  async show (req, res) {
    try {
      const artist = await Artist.findByPk(req.params.artistId)
      res.send(artist)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the artists'
      })
    }
  },
  async update (req, res) {
    try {
      await Artist.update(req.body, {
        where: {
          id: req.params.artistId
        }
      })
      res.send(req.body)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating artist'
      })
    }
  },
  async delete (req, res) {
    try {
      const {artistId} = req.params
      const artist = await Artist.destroy({
        where: {
          id: artistId 
        }
      });
      res.send(artist)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred whilr deleting artist'
      })
    }
  }
} 
