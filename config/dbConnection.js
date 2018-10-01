var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var assert = require("assert");
var crypto = require("crypto");

const url = "";
const dbName = "portalNoticia";

var conexao = function(dados){
  mongo.connect(url,function(err,client){
    assert.equal(null,err);
    console.log("Conectado com sucesso");
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
    case "findAllSortAsc":
        collection.find({}).sort({dataCriacao:1}).toArray(dados.callback);
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
              username: dados.query.username,
              nome: dados.query.nome
            }},
            { rating: 1 },
            dados.callback
        )
        break;
    case "validarEmail":
        collection.findOneAndUpdate(
          {
            keyEmail: dados.query.keyEmail,
            emailVerificado: {$ne:true}
          },
          {$set:{emailVerificado: true}},
          { rating: 1 },
        dados.callback);break;


    default: break;

  }
}

module.exports = function(){
  return conexao;
};
