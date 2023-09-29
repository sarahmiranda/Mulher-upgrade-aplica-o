// URL DA API DE DADOS
URL = 'http://localhost:3000/infos'
//=================================================================================================
// GET - Recupera todos as infos e adiciona na tabela

const currilista = document.getElementById('currilista');

fetch(URL)
    .then(res => res.json())
    .then(infos => {
        let lista_infos = '';
        infos.forEach(info => {
            console.log(info)
            lista_infos += `
            <tr class="visualizar" data-id="${info.id}">
                <th>${info.id}</th>
                <td>${info.Nome}</td>
                <td>${info.Sobrenome}</td>
                <td>${info.Area}</td>
                <td>${info.Formacao}</td>
                <td>${info.Telefone}</td>
                <td>${info.Email}</td>
                <td>${info.Voce}</td>
                <td>${info.Profissao}</td>
                <td>
                    <a onclick="getinfos(${info.id});" 
                    class="btn btn-primary btn-sm" 
                    data-toggle="modal" data-target="#myModal1"> Editar
                    </a>
                    <a onclick="$('#infos-id').val(${info.id})" class="btn btn-danger btn-sm editar" 
                        data-toggle="modal" data-target="#modal-delete"> Remover
                    </a>
                </td>
            </tr>
            `;
            currilista.innerHTML = lista_infos;
        })
    });
//=================================================================================================

// DELETE - PROCEDIMENTO PARA EXCLUIR UM CURRICULO
const infosDelete = document.getElementById('btn-delete');

infosDelete.addEventListener('click', (e) => {
    // RECUPERA O ID DAS INFORMAÇÕES DOS CURRÍCULOS
    let id = parseInt($('#infos-id').val()); 

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());

})
//=================================================================================================

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM CURRICULO OU INFORMAÇÕES NA API
function getinfos(id){
    $('#infos-id').val(id);

    if(id == 0){
        $('#infos-type').val("add");
        $('#txtnome').val("");
        $('#txtsobrenome').val("");
        $('#txtform').val("");
        $("#yourlife").val("");
        $("#numtell").val("");
        $("#txtmail").val("");
        $("#yourprof").val("");
    } else {
        $('#infos-type').val("edit");
        fetch(`${URL}/${id}`)
            .then(res => res.json())    
            .then(data => {
                $('#infos-id').val(data.id);
                $('#txtnome').val(data.Nome);
                $('#txtsobrenome').val(data.Sobrenome);
                $('#txtform').val(data.Formacao);
                $("#txtarea").val(data.Area);
                $("#yourlife").val(data.Voce);
                $("#numtell").val(data.Telefone);
                $("#txtmail").val(data.Email);
                $("#yourprof").val(data.Profissao);
            });
    }
}

//=================================================================================================

// PROCEDIMENTO PARA VISUALIZAR OS DADOS DE UM CURRICULO OU INFORMAÇÕES NA API
$(document).on('click', '.visualizar', function(e){
   if(e.target instanceof HTMLAnchorElement) return;

   visualizar($(e.currentTarget).data('id'))
})

function visualizar(id){
    fetch(`${URL}/${id}`)
        .then(res => res.json())    
        .then(data => {
            $('#modal-visualizar').modal('show');
            $('#e_infos-id').val(data.id);
            $('#e_txtnome').val(data.Nome);
            $('#e_txtsobrenome').val(data.Sobrenome);
            $('#e_txtform').val(data.Formacao);
            $("#e_txtarea").val(data.Area);
            $("#e_yourlife").val(data.Voce);
            $("#e_numtell").val(data.Telefone);
            $("#e_txtmail").val(data.Email);
            $("#e_yourprof").val(data.Profissao);
        });
}

//=================================================================================================

// PARA CRIAR OU ATUALIZAR INFORMAÇÕES - CURRÍCULO

const infosForm = document.getElementById('infos-form');

infosForm.addEventListener('submit', e => {
    e.preventDefault();

    // RECUPERA O ID DAS INFORMAÇÕES DOS CURRÍCULOS
    let id = parseInt($('#infos-id').val());   
    
    // RECUPERA OS DADOS DOS CURRÍCULOS
    const infos = JSON.stringify({
        id: document.getElementById('infos-id').value,
        Nome: document.getElementById('txtnome').value,
        Sobrenome: document.getElementById('txtsobrenome').value,
        Formacao: document.getElementById('txtform').value,
        Area: document.getElementById('txtarea').value,
        Voce: document.getElementById('yourlife').value,
        Telefone: document.getElementById('numtell').value,
        Email: document.getElementById('txtmail').value,
        Profissao: document.getElementById('yourprof').value,
    })

    let type = $('#infos-type').val();

    if (type == 'edit') {
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: infos
        })
        .then(res => res.json())
        .then(() => location.reload());  
    }
    else { 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: infos
        })
        .then(res => res.json())
        .then(() => location.reload());  
    }      
})
//=================================================================================================