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
      html: '<strong>Obrigado por se registar em nosso portal de notícias. Segue o link(localhost:5000/validarConta?validacao='+id+') para confirmar o email. <br><br><br>PS: ignorar está url -></strong>',
    };
    sgMail.send(msg);
  }
}
