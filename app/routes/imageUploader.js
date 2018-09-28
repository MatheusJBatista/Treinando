module.exports = function(app){
  app.get('/imageUploader',function(req,res){
    // Heroku config
    // app.controller.imageUploader.imageUploader(app,req,res)
    app.app.controller.imageUploader.imageUploader(app,req,res)
  })
  app.post('/fileupload',function(req,res){
    // Heroku config
    // app.controller.imageUploader.fileupload(app,req,res)
    app.app.controller.imageUploader.fileupload(app,req,res)
  })
}
