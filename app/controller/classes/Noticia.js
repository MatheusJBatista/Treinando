function Noticia(){
  this._id;
  this._idAutor;
  this._autor;
  this._dataCriacao;
  this._titulo;
  this._noticia;
  this._sinopse;
  this._capa;
}

Noticia.prototype.getQuery = function(){
  return {
    _id: this._id,
    autor: [{
      id_autor: this._idAutor,
      autor: this._autor
    }],
    dataCriacao: this._dataCriacao,
    tituloNoticia: this._titulo,
    noticia: this._noticia,
    sinopse: this._sinopse,
    capa:this._capa
  }
}

module.exports = function(){
  return Noticia;
}
