function NoticiaDAO(){
  this._conexao;
  this._query;
  this._operacao;
}

NoticiaDAO.prototype.getDados = function () {
  return {
    operacao: this._operacao,
    query: this._query,
    collection: "noticia",
  }
};

NoticiaDAO.prototype.insert = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

NoticiaDAO.prototype.findByTitulo = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

NoticiaDAO.prototype.findAll = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

NoticiaDAO.prototype.findById = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

module.exports = function(){
  return NoticiaDAO;
};
