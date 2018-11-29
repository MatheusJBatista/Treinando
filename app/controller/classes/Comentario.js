function Comentario(){
  this._idUsuario;
  this._username;
  this._comentario;
  this._dataComentario;
  this._idNoticia;
  this._fotoUsuario;
  this._tituloNoticia;
}

Comentario.prototype.getQuery = function(){
  return {
    usuario: {
      id_usuario: this._idUsuario,
      username: this._username,
      fotoUsuario: this._fotoUsuario
    },
    noticia: {
      id_noticia: this._idNoticia,
      titulo: this._tituloNoticia
    },
    comentario: this._comentario,
    dataComentario: this._dataComentario
  }
}

module.exports = function () {
  return Comentario;
}
