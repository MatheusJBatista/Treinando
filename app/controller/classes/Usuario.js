function Usuario(){
  this._id;
  this._email;
  this._senha;
  this._dataNascimento;
  this._username;
  this._nomeCompleto;
  this._emailVerificado;
  this._dataRegistro;
  this._keyEmail;
  this._imgPerfil;
  this._autor;
  this._requisicao;
  this._admin = false;
}

Usuario.prototype.getQuery = function () {
  if (this._email == 'matheus_roberto_batista@hotmail.com') {
    this._admin = true;
  }
  var query = {
    _id: this._id,
    email : this._email,
    senha : this._senha,
    dataNascimento: this._dataNascimento,
    username: this._username,
    nome: this._nomeCompleto,
    keyEmail: this._keyEmail,
    emailVerificado: true,
    dataRegistro: this._dataRegistro,
    imgPerfil: this._imgPerfil,
    autor: {
      autorizado:this._autor,
      requisicao:this._requisicao
    },
    admin:this._admin
  }
  return query;
};

Usuario.prototype.getKey = function () {
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%*";
  var key = "";
  for (var i = 0; i < 50; i++) {
    key += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return key;
};


module.exports = function(){
  return Usuario;
}
