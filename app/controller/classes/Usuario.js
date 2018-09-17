function Usuario(){
  this._email;
  this._senha;
  this._dataNascimento;
  this._username;
  this._nomeCompleto;
  this.emailVerificado;
}

Usuario.prototype.getQuery = function () {
  var query = {
    email : this._email,
    senha : this._senha,
    dataNascimento: this._dataNascimento,
    username: this._username,
    nome: this._nomeCompleto,
    emailVerificado: this.emailVerificado
  }
  return query;
};


module.exports = function(){
  return Usuario;
}
