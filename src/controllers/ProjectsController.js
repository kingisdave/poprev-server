const { Project, Artist } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  async index (req, res) {
    try {
      let projects = null
      const search = req.query.search // You can search for projects
      if(search) {
        projects = await Project.findAll({
          where: {
            [Op.or]: [
              'name','description','approvalStatus','investmentStatus'
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
  //To create a project, you must add the artist to it 
  async post (req, res) {
    try {
      const artistId = req.params.artistId;
      const artist = await Artist.findByPk(artistId)
      if(!artist) {
        res.status(400).send({
          error: 'Artist not found while creating a new project'
        })  
      }
      const projectData = {
        artistId,
        ...req.body,
      };
  
      const project = await Project.create(projectData);
      res.send(project)
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
      // const projectId = req.params.projectId;
      let investmentStatus = (req.body.approvedStatus == "APPROVED")? "OPENED" : "CLOSED";

      const projectData = {
        investmentStatus,
        ...req.body,
      };
      const project = await Project.update(projectData, {
        where: {
          id: req.params.projectId
        }
      })
      res.send(project)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while updating project'
      })
    }
  },
  async delete (req, res) {
    try {
      const {projectId} = req.params
      const project = await Project.destroy({
        where: {
          id: projectId 
        }
      });
      res.send(project)
    } catch (error) {
      res.status(400).send({
        error: 'Error occurred while deleting project'
      })
    }
  }
} 
