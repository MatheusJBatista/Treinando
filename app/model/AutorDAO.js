function AutorDAO() {
  this._conexao;
  this._query;
  this._operacao;
}

AutorDAO.prototype.GetDados = function () {
  return {
    operacao:this._operacao,
    query: this._query,
    collection: 'autor'
  }
};

AutorDAO.prototype.insert =function (cb) {
  var dados = this.GetDados();
  dados.callback = cb;
  this._conexao(dados);
}

AutorDAO.prototype.findByDataFimNull =function (cb) {
  var dados = this.GetDados();
  dados.callback = cb;
  this._conexao(dados);
}

AutorDAO.prototype.findById =function (cb) {
  var dados = this.GetDados();
  dados.callback = cb;
  this._conexao(dados);
}

AutorDAO.prototype.updateDataFim =function (cb) {
  var dados = this.GetDados();
  dados.callback = cb;
  this._conexao(dados);
}

module.exports = function () {
  return AutorDAO;
}
