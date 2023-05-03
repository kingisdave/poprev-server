const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const ArtistsController = require('../controllers/ArtistsController')
const ProjectsController = require('../controllers/ProjectsController')
const TokensController = require('../controllers/TokensController')
const UsersController = require('../controllers/UsersController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  
  // Users routes to get, update and to delete/remove 
  app.get('/users',
    UsersController.index)  // To display the authenticated users
  app.get('/users/:userId',
    UsersController.show)  // Display only one user
  app.put('/users/:userId',
    UsersController.update)  // update user profile
  
  // Artists routes to get, post, update and to delete/remove 
  app.get('/artists',
    ArtistsController.index)  // To display all available artists
  app.post('/artists',
    AuthenticationControllerPolicy.artist,
    isAuthenticated,
    ArtistsController.post)   // Add new artist
    app.get('/artists/:artistId',
    ArtistsController.show)
  app.put('/artists/:artistId',
    ArtistsController.update)
  app.delete('/artists/:artistId',
    ArtistsController.delete)
  
  // Projects routes to get, post, update and to delete/remove
  app.get('/projects',
    ProjectsController.index)
  app.post('/projects',
    ProjectsController.post)
  app.get('/projects/:projectId',
    ProjectsController.show)
  app.put('/projects/:projectId',
    ProjectsController.update)
  
  // Tokens routes to get, post, update and to delete/remove
  app.get('/tokens',
    TokensController.index)
  app.post('/tokens',
    TokensController.post)
  app.get('/tokens/:tokenId',
    TokensController.show)
  app.put('/tokens/:tokenId',
    TokensController.update)
  
}
