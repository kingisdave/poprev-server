const { Project } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let projects = null
      // const search = 'Wade in the Water.'
      const search = req.query.search
      if(search) {
        projects = await Project.findAll({
          where: {
            [Op.or]: [
              'name','stageName','genre','album'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        projects = await Project.findAll({
          limit: 10
        })
      }
      res.send(projects)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the projects'
      })
    }
  },
  async post (req, res) {
    try {
      const projects = await Project.create(req.body)
      res.send(projects)
    } catch (error) {
      res.status(400).send({
        error: 'Error while trying to add a new project'
      })
    }
  },
  async show (req, res) {
    try {
      const project = await Project.findByPk(req.params.projectId)
      res.send(project)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while trying to fetch the projects'
      })
    }
  },
  async update (req, res) {
    try {
      await Project.update(req.body, {
        where: {
          id: req.params.projectId
        }
      })
      res.send(req.body)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating project'
      })
    }
  }
} 
