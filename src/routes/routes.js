const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const ArtistsController = require('../controllers/ArtistsController')
const ProjectsController = require('../controllers/ProjectsController')
const TokensController = require('../controllers/TokensController')
const UsersController = require('../controllers/UsersController')
const isAuthenticated = require('../policies/isAuthenticated')
const TransactionsController = require('../controllers/TransactionsController')

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
    isAuthenticated,
    UsersController.update)  // update user profile
  
  // Artists routes to get, post, update and to delete/remove 
  app.get('/artists',
    ArtistsController.index)  // To display all available artists
  app.post('/artists',
    AuthenticationControllerPolicy.artist,
    isAuthenticated,
    ArtistsController.post)   // Add new artist
  app.get('/artists/:artistId',
    ArtistsController.show)  // Display one artist details
  app.put('/artists/:artistId',
    isAuthenticated,
    ArtistsController.update)  // Updated artist stageName
  app.delete('/artists/:artistId',
    ArtistsController.delete)  // Remove artist detail
  
  // Projects routes to get, post, update and to delete/remove
  app.get('/projects',
    ProjectsController.index)   // Display all activated projects
  app.post('/projects/:artistId',
    isAuthenticated,
    ProjectsController.post)   // Create new project for artist
  app.get('/projects/:projectId',
    ProjectsController.show)   // Display a project
  app.put('/projects/:projectId',
    isAuthenticated,
    ProjectsController.update)   // Update a project
  app.delete('/projects/:projectId',
    isAuthenticated,
    ProjectsController.delete)  // Delete a project
  
  // Tokens routes to get, post, update and to delete/remove
  app.get('/tokens',
    isAuthenticated,
    TokensController.index)
  app.post('/tokens/:projectId',
    isAuthenticated,
    TokensController.post)  // Create a token for the project
  app.get('/tokens/:tokenId',
    TokensController.show)   // Get the token details
  app.put('/tokens/:tokenId',
    isAuthenticated,
    TokensController.buyToken)  // Buy a token
  app.delete('/tokens/:tokenId', 
    isAuthenticated,
    TokensController.delete)

  // Transactions routes to get and to delete/remove
  app.get('/transactions',
    isAuthenticated,
    TransactionsController.index)
  app.get('/transactions/:transactionId',
    TransactionsController.show)
  app.delete('/transactions/:transactionId',
    isAuthenticated,
    TransactionsController.delete)
  
}
