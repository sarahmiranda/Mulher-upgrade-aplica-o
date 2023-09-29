// declara um conjunto inicial de vagas
var db_vagas_inicial = {
  "vagas": [
    {
      "id": 1,
      "titulo": "Cne Bauch",
      "local": "Riro",
      "descBreve": "tra",
      "descCompleta": "Na.net"
    },
    {
      "id": 2,
      "titulo": "Clementiuch",
      "local": "Rio de Janeo",
      "descBreve": "traho",
      "descCompleta": "Na.net"
    },
    {
      "id": 3,
      "titulo": "Clemne Bauch",
      "local": "Rio dneiro",
      "descBreve": "talho",
      "descCompleta": "Naia.net"
    }
  ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_vaga'));
if (!db) {
  db = db_vagas_inicial;
}

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
  $("#msg").html('<div class="alert alert-warning">' + msg + "</div>");
}

function insertVaga(vaga) {
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
  let novoId = 1;
  if (db.vagas.length != 0)
    novoId = db.vagas[db.vagas.length - 1].id + 1;
  let novaVaga = {
    "id": novoId,
    "titulo": vaga.titulo,
    "local": vaga.local,
    "descBreve": vaga.descBreve,
    "descCompleta": vaga.descCompleta
  };

  // Insere o novo objeto no array
  db.vagas.push(novaVaga);
  displayMessage("Vaga publicada com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem('db_vaga', JSON.stringify(db));
}

function updateVaga(id, vaga) {
  // Localiza o indice do objeto a ser alterado no array a partir do seu ID
  let index = db.vagas.map(obj => obj.id).indexOf(id);

  // Altera os dados do objeto no array
  db.vagas[index].titulo = vaga.titulo,
  db.vagas[index].local = vaga.local,
  db.vagas[index].descBreve = vaga.descBreve,
  db.vagas[index].descCompleta = vaga.descCompleta

  displayMessage("Vaga alterada com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem('db_vaga', JSON.stringify(db));
}

function deleteVaga(id) {
  // Filtra o array removendo o elemento com o id passado
  db.vagas = db.vagas.filter(function (element) {
    return element.id != id;
  });

  displayMessage("Vaga removida com sucesso");

  // Atualiza os dados no Local Storage
  localStorage.setItem('db_vaga', JSON.stringify(db));
}
