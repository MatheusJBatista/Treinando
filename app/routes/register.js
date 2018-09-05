module.exports = function(app){
  app.get('/register', function(req,res){
    app.app.controller.register.register(app, req,res)
  })
}
