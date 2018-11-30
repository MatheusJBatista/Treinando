module.exports = function (app) {
  app.post('/profile/serAutor',function (req,res) {
    if (!req.session.logado) {
      res.redirect('/');
      return
    }
    app.app.controller.autor.post(app,req,res);
  });

  app.get('/validarAutor',function (req,res) {
    if (!req.session.admin) {
      res.redirect('/');
      return
    }
    app.app.controller.autor.validar(app,req,res)
  })
  app.get('/validarAutor/:id',function (req,res) {
    if (!req.session.admin) {
      res.redirect('/');
      return
    }
    app.app.controller.autor.requisicao(app,req,res)
  })

  app.post('/validarAutor/:id/:usuario',function (req,res) {
    if (!req.session.admin) {
      res.redirect('/');
      return
    }
    app.app.controller.autor.requisicaoPost(app,req,res)
  })
}
