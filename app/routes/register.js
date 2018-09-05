module.exports = function(app){
  app.get('/register', function(req,res){
    app.controller.register.register(app, req,res)
  })
}
