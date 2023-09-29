// URL DA API DE DADOS
URL = 'http://localhost:3000/infos'
//=================================================================================================
// GET - Recupera todos as infos e adiciona na tabela

const currilista = document.getElementById('currilista');

fetch(URL)
    .then(res => res.json())
    .then(infos => {
        let lista_infos = '';
        for (let i = 0; i < infos.length; i++) {
            vlt_total = infos[i].qtd * infos[i].vlr;
            lista_infos += `
            <tr>
                <th>${infos[i].id}</th>
                <td>${infos[i].nome}</td>
                <td>R$${(parseFloat(infos[i].vlr)).toFixed(2)}</td>
                <td>${infos[i].qtd}</td>
                <td>R$${parseFloat(vlt_total).toFixed(2)}</td>
                <td>
                    <a onclick="getinfos(${infos[i].id});" 
                    class="btn btn-warning btn-sm" 
                    data-toggle="modal" data-target="#myModal1">
                    <i class="fa fa-edit"></i>  Editar
                    </a>
                    <a onclick="$('#id-infos').text(${infos[i].id});" class="btn btn-danger btn-sm" 
                    data-toggle="modal" data-target="#modal-delete">
                    <i class="fa fa-trash"></i> Remover
                    </a>
                </td>
            </tr>
            `;
            currilista.innerHTML = lista_infos;
        }
    });
//=================================================================================================

// DELETE - PROCEDIMENTO PARA EXCLUIR UM CURRICULO
const infosDelete = document.getElementById('btn-delete');

infosDelete.addEventListener('click', (e) => {

    let id = $('#id-infos').text();

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => location.reload());

})
//=================================================================================================

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM CURRICULO OU INFORMAÇÕES NA API
function getinfos(id){

    if(id == 0){
        $('#edit-infos-id').text("");
        $( "#infos-id" ).prop( "disabled", false );
        $('#infos-id').val("");
        $('#txtnome').val("");
        $('#txtsobrenome').val("");
        $('#txtform').val("");
        $("#yourlife").val("");
        $("#numtell").val("");
        $("#txtmail").val("");
        $("#yourprof").val("");
    }else{
        $('#edit-infos-id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())    
        .then(data => {
            $( "#infos-id" ).prop( "disabled", true );
            $('#infos-id').val(data.id);
            $('#txtnome').val(data.nome);
            $('#txtsobrenome').val(data.vlr);
            $('#txtform').val(data.form);
            $("txtarea").val(data.area);
            $("#yourlife").val(data.life);
            $("#numtell").val(data.tell);
            $("#txtmail").val(data.mail);
            $("#yourprof").val(data.prof);
        });
    }    
}

//=================================================================================================

// PARA CRIAR OU ATUALIZAR INFORMAÇÕES - CURRÍCULO

const infosForm = document.getElementById('infos-form');

infosForm.addEventListener('submit', (e) => {

    // RECUPERA O ID DAS INFORMAÇÕES DOS CURRÍCULOS
    let id = parseInt($('#edit-infos-id').text());    

    // RECUPERA OS DADOS DOS CURRÍCULOS
    const infos = JSON.stringify({
        id: document.getElementById('infos-id').value,
        nome: document.getElementById('txtnome').value,
        Sobrenome: document.getElementById('txtsobrenome').value,
        Formacao: document.getElementById('txtform').value,
        Area: document.getElementById('txtarea').value,
        Vida: document.getElementById('yourlife').value,
        telefone: document.getElementById('numtell').value,
        Email: document.getElementById('txtmail').value,
        Profissao: document.getElementById('yourprof').value,
    })

    if (id >= 0) {
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
    else{ 
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