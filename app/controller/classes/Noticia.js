function Noticia(){
  this._id;
  this._idAutor;
  this._autor;
  this._dataCriacao;
  this._titulo;
  this._noticia;
  this._sinopse;
  this._capa;
  this._tituloPuro;
  this._sinopsePura;
}

Noticia.prototype.getQuery = function(){
  return {
    _id: this._id,
    autor: {
      id_autor: this._idAutor,
      autor: this._autor
    },
    dataCriacao: this._dataCriacao,
    tituloNoticia: this._titulo,
    tituloPuro:this._tituloPuro,
    noticia: this._noticia,
    sinopse: this._sinopse,
    sinopsePuro: this._sinopsePura,
    capa:this._capa
  }
}

module.exports = function(){
  return Noticia;
}
