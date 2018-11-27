function Comentario(){
  this._idUsuario;
  this._username;
  this._comentario;
  this._dataComentario;
  this._idNoticia;
  this._fotoUsuario;
}

Comentario.prototype.getQuery = function(){
  return {
    usuario: [{
      id_usuario: this._idUsuario,
      username: this._username,
      fotoUsuario: this._fotoUsuario
    }],
    noticia: [{
      id_noticia: this._idNoticia
    }],
    comentario: this._comentario,
    dataComentario: this._dataComentario
  }
}

module.exports = function () {
  return Comentario;
}
