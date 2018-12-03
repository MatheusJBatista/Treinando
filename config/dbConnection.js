var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var assert = require("assert");
var crypto = require("crypto");

var url = "mongodb://matheusBatista:6FBc0jCRWRZdcNgL@matheusnoticia-shard-00-00-bwmln.mongodb.net:27017,";
url+="matheusnoticia-shard-00-01-bwmln.mongodb.net:27017,";
url+="matheusnoticia-shard-00-02-bwmln.mongodb.net:27017/test?ssl=true&replicaSet=matheusNoticia-shard-0&authSource=admin&retryWrites=true";

// const url = "mongodb+srv://matheusBatista:6FBc0jCRWRZdcNgL@matheusnoticia-bwmln.mongodb.net/test?retryWrites=true";
const dbName = "portalNoticia";

var conexao = function(dados){
  mongo.connect(url,{useNewUrlParser: true},function(err,client){
    assert.equal(null,err);
    // console.log("Conectado com sucesso");
    const db = client.db(dbName);
    query(db,dados);
    client.close();
  })
}

function query(db,dados){
  var collection = db.collection(dados.collection);
  switch (dados.operacao) {
    case "insert":
        if (dados.query.senha) {
          var senha_criptografada= crypto.createHash("md5").update(dados.query.senha).digest("hex");
          dados.query.senha = senha_criptografada;
        }
        collection.insertOne(dados.query,dados.callback);
        break;
    case "findAll":
        collection.find({}).toArray(dados.callback);
        break;
    case "findByDataFimNull":
        collection.find({
          dataFim: null
        }).toArray(dados.callback);
        break;
    case "findByLogin":
        collection.find({
          email: dados.query.email,
          senha: crypto.createHash("md5").update(dados.query.senha).digest("hex")
        }).toArray(dados.callback);
        break;
    case "findByEmail":
        collection.find({email:{$eq:dados.query.email}}).toArray(dados.callback);
        break;
    case "findByTitulo":
        collection.find({
          tituloNoticia:{$eq:dados.query.tituloNoticia}
        }).toArray(dados.callback);
        break;
    case "findById":
        collection.find({
          _id: new ObjectId(dados.query._id)
        }).toArray(dados.callback);
        break;
    case "findByIdAutor":
        collection.find({
          'autor.id_autor': dados.query.autor.id_autor
        }).toArray(dados.callback);
        break;
    case "findByUsernameAutor":
        collection.find({
          'autor.autor': dados.query.autor.autor
        }).toArray(dados.callback);
        break;
    case "findByComentarioIdNoticia":
        collection.find({
          // noticia:{
          //   id_noticia: dados.query.noticia.id_noticia
          // }
          'noticia.id_noticia':dados.query.noticia.id_noticia
        }).sort({dataComentario:-1}).toArray(dados.callback);
        break;
    case "findByJogadorComentario":
        collection.find({
          // usuario:[{
          //   id_usuario:(dados.query.usuario[0].id_usuario)
          // }]
          'usuario.id_usuario': dados.query.usuario.id_usuario
        }).toArray(dados.callback);
        break;
    case "findAllSortDesc":
        collection.find({}).sort({dataCriacao:-1}).toArray(dados.callback);
        break;
    case "findByKey":
        collection.find({
          keyEmail: dados.query.keyEmail
        }).toArray(dados.callback);
        break;
    case "findByNick":
        collection.find({
          username: dados.query.username
        }).toArray(dados.callback);
        break;
    case "findByProfileUsername":
        collection.find({
          username: dados.query.username
        }).toArray(dados.callback);
        break;
    case "findAndUpdateCadastro":
        collection.findOneAndUpdate(
          {
            _id : new ObjectId(dados.query._id)
          },
            {$set:{
              dataNascimento: dados.query.dataNascimento,
              nome: dados.query.nome
            }},
            { rating: 1 },
            dados.callback
        )
        break;
    case "updateNovaSenha":
        collection.findOneAndUpdate(
          {
            _id : new ObjectId(dados.query._id),
            senha : crypto.createHash("md5").update(dados.query.senha).digest("hex")
          },
            {$set:{
              senha: crypto.createHash("md5").update(dados.query.novaSenha).digest("hex")
            }},
            { rating: 1 },
            dados.callback
        )
        break;
    case "updateNovoEmail":
        collection.findOneAndUpdate(
          {
            _id : new ObjectId(dados.query._id),
            email : dados.query.email
          },
            {$set:{
              email : dados.query.novoEmail
            }},
            { rating: 1 },
            dados.callback
        )
        break;
    case "updateRequisicaoById":
        collection.findOneAndUpdate(
          {
            _id : new ObjectId(dados.query._id)
          },
            {$set:{
              'autor.requisicao':true
            }},
            { rating: 1 },
            dados.callback
        )
        break;
    case "updateUsuarioAutorById":
    console.log(dados.query.autor.autorizado);
        collection.findOneAndUpdate(
          {
            _id: new ObjectId(dados.query._id)
          },
          {
              $set:{
                'autor.requisicao': true,
                'autor.autorizado': dados.query.autor.autorizado
              }
          },
          { rating: 1 },
        dados.callback);break;
    case "updateDataFim":
        collection.findOneAndUpdate(
          {
            _id: new ObjectId(dados.query._id)
          },
          {
              $set:{
                dataFim:dados.query.dataFim
              }
          },
          { rating: 1 },
        dados.callback);break;
    case "validarEmail":
        collection.findOneAndUpdate(
          {
            keyEmail: dados.query.keyEmail,
            emailVerificado: {$ne:true}
          },
          {$set:{emailVerificado: true}},
          { rating: 1 },
        dados.callback);break;
    case "updateImg":
        collection.update(
          {_id : ObjectId(dados.query._id)},
          {$set:{
            imgPerfil : dados.query.imgPerfil
          }}, dados.callback
        )


    default: break;

  }
}

module.exports = function(){
  return conexao;
};
