/*!
* Start Bootstrap - Small Business v5.0.5 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function Excluir(idclientes) {
    document.getElementById('idcliente').value = idclientes;
}

let btn = document.getElementById('confirm-btn')

$('#confirm-btn').click(function () {
    var id = $('#confirm-btn').val();
    $.post( '@Url.Action("Excluir", "Cliente")', { idcliente: id } );
});

alert("O seu artigo foi excluído!");
