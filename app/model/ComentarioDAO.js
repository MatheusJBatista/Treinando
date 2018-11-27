function ComentarioDAO(){
  this._conexao;
  this._query;
  this._operacao;
}

ComentarioDAO.prototype.getDados = function () {
  return {
    operacao: this._operacao,
    query: this._query,
    collection: "comentario",
  }
};

ComentarioDAO.prototype.insert = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

ComentarioDAO.prototype.findByComentarioIdNoticia = function (callback) {
  var dados = this.getDados();
  dados.callback = callback;
  this._conexao(dados);
};

module.exports = function(){
  return ComentarioDAO;
};
