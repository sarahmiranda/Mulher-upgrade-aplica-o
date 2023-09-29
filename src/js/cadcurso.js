// URL DA API DE DADOS
URL = '  http://localhost:3000/cursos'
//=================================================================================================
// GET - Recupera todos os produtos e adiciona na tabela

const cursoList = document.getElementById('curso-list');

fetch(URL)
    .then(res => res.json())
    .then(cursos => {
        let lista_curso = '';
        for (let i = 0; i < cursos.length; i++) {
            lista_curso += `
            <div class="col">
                    <div class="card shadow-sm">
                        <a onclick="descricaoCurso(${cursos[i].id});" data-toggle="modal" data-target="#descricao-modal">
                            <div class="card border-secondary text-shadow" style="width: 20rem; height: 14rem;">
                                <div class="card-body">
                                    <h5 class="card-title text-primary">${cursos[i].titulo}</h5>
                                    <p class="card-text text-dark">${cursos[i].apresentacao}.</p>
                                    <div class="card-footer bg-transparent "></div>
                                    <div class="d-grid d-md-flex justify-content-md-start gap-2 col-8 mx-auto position-relative">
                                        <a onclick="getCurso(${cursos[i].id});"class="btn btn-primary text-white" 
                                        data-toggle="modal" data-target="#curso-modal"> Editar </a>
                                        <a onclick="$('#id-curso').text(${cursos[i].id});" data-toggle="modal" data-target="#modal-delete"><button type="button"
                                        class="btn btn-outline-primary">Excluir</button></a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            cursoList.innerHTML = lista_curso;
        }
    });

// excluir curso

const cursoDelete = document.getElementById('btn-delete');

cursoDelete.addEventListener('click', (e) => {

    let id = $('#id-curso').text();

    fetch(`${URL}/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(() => location.reload());

})

// recuperar curso

function getCurso(id) {

    if (id == 0) {
        $('#edit-curso-id').text("");
        $("#id").prop("disabled", false);
        $('#id').val("");
        $('#titulo').val("");
        $('#link').val("");
        $('#cargah').val("");
        $('#area').val("");
        $('#prerequisitos').val("");
        $('#idade').val("");
        $('#apresentacao').val("");
        $('#descricao').val("");
        $('#modulo').val("");
    } else {
        $('#edit-curso-id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())
            .then(data => {
                $("#id").prop("disabled", true);
                $('#id').val(data.id);
                $('#titulo').val(data.titulo);
                $('#link').val(data.link);
                $('#cargah').val(data.cargah);
                $('#area').val(data.area);
                $('#prerequisitos').val(data.prerequisitos);
                $('#idade').val(data.idade);
                $('#apresentacao').val(data.apresentacao);
                $('#descricao').val(data.descricao);
                $('#modulo').val(data.modulo);
            });
    }
}

//criar curso

const cadcurso = document.getElementById('cadcurso');

cadcurso.addEventListener('submit', (e) => {

    let id = parseInt($('#edit-curso-id').text());

    const curso = JSON.stringify({
        id: document.getElementById('id').value,
        titulo: document.getElementById('titulo').value,
        link: document.getElementById('link').value,
        cargah: document.getElementById('cargah').value,
        area: document.getElementById('area').value,
        prerequisitos: document.getElementById('prerequisitos').value,
        apresentacao: document.getElementById('apresentacao').value,
        idade: document.getElementById('idade').value,
        descricao: document.getElementById('descricao').value,
        modulo: document.getElementById('modulo').value
    })

    if (id >= 0) {
        fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: curso
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
            body: curso
        })
            .then(res => res.json())
            .then(() => location.reload());
    }
})



const modaldescricao = document.getElementById('modal-descricao');

function descricaoCurso(id){

fetch(URL)
    .then(res => res.json())
    .then(cursos => {
        let descricao_curso = '';
        id -= 1;
            descricao_curso += `
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"><h2> ${cursos[id].titulo}o </h2>
        <p> ${cursos[id].descricao} </p>
<h3> Duração </h3>
        <p> ${cursos[id].cargah} horas </p>
<h3> Idade minima </h3>
        <p> ${cursos[id].idade} </p>
<h3> Modulos </h3>
        <p>${cursos[id].modulo} </p>
<h3> Pré requisitos </h3>
        <p> ${cursos[id].prerequisitos} </p>

</div>
<div class="d-grid gap-2 col-8 mx-auto">
<a href="${cursos[id].link}" <button type="button" class="btn btn-primary">Ir para a página do curso</button></a>
</br>
</div> `;
        modaldescricao.innerHTML = descricao_curso;
    
});}