const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const SongsController = require('../controllers/SongsController')
const BookmarksController = require('../controllers/BookmarksController')
const ArtistsController = require('../controllers/ArtistsController')
const ProjectsController = require('../controllers/ProjectsController')
const TokensController = require('../controllers/TokensController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  
  app.get('/artists',
    ArtistsController.index)
  app.post('/artists',
    ArtistsController.post)
  app.get('/artists/:artistId',
    ArtistsController.show)
  app.put('/artists/:artistId',
    ArtistsController.update)
  
  app.get('/projects',
    ProjectsController.index)
  app.post('/projects',
    ProjectsController.post)
  app.get('/projects/:projectId',
    ProjectsController.show)
  app.put('/projects/:projectId',
    ProjectsController.update)
  
  app.get('/tokens',
    TokensController.index)
  app.post('/tokens',
    TokensController.post)
  app.get('/tokens/:tokenId',
    TokensController.show)
  app.put('/tokens/:tokenId',
    TokensController.update)
  
    app.get('/songs',
    SongsController.index)
  app.post('/songs',
    SongsController.post)
  app.get('/songs/:songId',
    SongsController.show)
  app.put('/songs/:songId',
    SongsController.update)

  app.get('/bookmarks',
    BookmarksController.index)
  app.post('/bookmarks',
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    BookmarksController.delete)
}
