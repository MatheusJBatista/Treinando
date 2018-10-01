function UsuarioDAO(){
  this._conexao;
  this._query;
  this._operacao;
}

UsuarioDAO.prototype.getDados = function () {
  return {
    operacao: this._operacao,
    query: this._query,
    collection: "usuario",
  }
};

UsuarioDAO.prototype.validarEmail = function(callback){
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
}

UsuarioDAO.prototype.findByKey = function(callback){
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
}

UsuarioDAO.prototype.findByLogin = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

UsuarioDAO.prototype.insert = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados)
};

UsuarioDAO.prototype.findByEmail = function(callback){
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
}

UsuarioDAO.prototype.findAndUpdateCadastro = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

UsuarioDAO.prototype.findByNick = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

UsuarioDAO.prototype.findByProfile = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

UsuarioDAO.prototype.findById = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

module.exports = function(){
  return UsuarioDAO;
}
