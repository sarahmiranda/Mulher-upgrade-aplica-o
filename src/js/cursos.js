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
                    <div class="card shadow-sm text-primary border-white bg-transparent">
                        <a onclick="descricaoCurso(${cursos[i].id});" data-toggle="modal" data-target="#descricao-modal">
                            <div class="card border-secondary text-shadow" style="width: 20rem; height: 14rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${cursos[i].titulo}</h5>
                                    <p class="card-text">${cursos[i].apresentacao}.</p>
                                    <div class="card-footer bg-transparent ">
                                    <div class="d-grid d-md-flex justify-content-center gap-2 col-12 mx-auto position-relative ">
                                    <p class="m-info_desc -small m-card_info"><strong>Idade </strong>${cursos[i].idade} | <strong> Duração </strong> ${cursos[i].cargah} </p>
                                    </div>
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
            <div class="modal-body"><h2> ${cursos[id].titulo} </h2>
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