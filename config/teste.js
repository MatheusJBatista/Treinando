// #Este modo vc pega os jogadores pelo indice,
// #não tem como vc pegar um determinado jogador pelo nome dele antes de entrar no json que está dentro
function modo1(){
  //simulando as sessoes
  var session_idJogador = 1;
  var session_nome = "Nalfu";

  //Array vazio que ira suportar varios json
  var jogadores = [];

  //for apenas para simular varios jogadores
  for (var i = 1; i <= 5; i++) {
    //aqui eu posso definir o nome do json como eu quiser, poderia colocar jogador1:.
    // neste caso irei usar o nome do jogador como um identificado
    jogadores.push({
      idJogador: session_idJogador,
      nick: session_nome
    })
    session_idJogador += 1;
    session_nome +=1;
  }
  //pegando todos os valores
  //console.log(jogadores);

  //pegando um determinado json
  console.log(jogadores[0]);
}
// /*Ou tem esse outro modo*/
// # neste modo vc pega entra no json de cada jogador pelo nick
function modo2(){
  //simulando as sessoes
  var session_idJogador = 1;
  var session_nome = "Nalfu";

  //Array vazio que ira suportar varios json
  var jogadores = [];

  //for apenas para simular varios jogadores
  for (var i = 1; i <= 5; i++) {
    //aqui eu posso definir o nome do json como eu quiser, poderia colocar jogador1:.
    // neste caso irei usar o nome do jogador como um identificado
    jogadores[""+session_nome+""] = {
      idJogador: session_idJogador,
      nick: session_nome
    }
    session_idJogador += 1;
    session_nome +=1;
  }
  //pegando todos os valores
  //console.log(jogadores);

  //pegando um determinado jogador a partir do nick
  console.log(jogadores["Nalfu"]);
}
//modo1();
modo2();
