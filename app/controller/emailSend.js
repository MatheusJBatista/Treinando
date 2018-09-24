module.exports.confirmEmail = function(app,req,res,id){
  if (req.session.verificarEmail && id) {
    //https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
    const sgMail = require('@sendgrid/mail');
    var api = "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";
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || api);
    const msg = {
      to: req.session.email,
      from: 'Portal de notícias<matheusnoticiaportal@gmail.com>',
      subject: 'Confirmação de e-mail',
      html: '<strong>Obrigado por se registar em nosso portal de notícias. Segue o link(https://matheus-noticia.herokuapp.com?validacao='+id+') para confirmar o email. <br><br><br>PS: ignorar está url -></strong>',
    };
    sgMail.send(msg);
  }
}
