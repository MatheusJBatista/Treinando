function Autor(){
  this._id;
  this._titulo;
  this._noticia;
  this._dataRequisicao;
  this._idUsuario;
  this._usernameUsuario;
  this._imgUsuario;
  this._dataFim;
  this._idAdmin;
  this._usernameAdmin;
}

Autor.prototype.getQuery = function() {
  return {
    _id:this._id,
    titulo:this._titulo,
    noticia:this._noticia,
    dataInicio:this._dataRequisicao,
    dataFim:this._dataFim,
    usuario:{
      id_usuario:this._idUsuario,
      username:this._usernameUsuario,
      imgUsuario:this._imgUsuario
    },
    admin:{
      id_admin:this._idAdmin,
      username:this._usernameAdmin
    }
  }
}

module.exports = function () {
  return Autor;
}
