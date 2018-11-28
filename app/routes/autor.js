module.exports = function (app) {
  app.post('/profile/serAutor',function (req,res) {
    app.app.controller.autor.post(app,req,res);
  })
}
