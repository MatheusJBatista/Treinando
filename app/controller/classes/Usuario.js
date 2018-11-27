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
}

Usuario.prototype.getQuery = function () {
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
    imgPerfil: this._imgPerfil
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
