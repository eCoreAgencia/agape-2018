$(document).ready(function(){
    $('#co_nome').on('click', function(event){
        $('fieldset.nome .error-msg').remove();
        $('fieldset.nome').removeClass('error-msg');
    });

    $('#co_email').on('click', function(event){
        $('fieldset.email .error-msg').remove();
        $('fieldset.email').removeClass('error-msg');
    });

    $('#co_telefone').on('click', function(event){
        $('fieldset.telefone .error-msg').remove();
        $('fieldset.telefone').removeClass('error-msg');
    });

    $('#co_assunto').on('click', function(event){
        $('fieldset.assunto .error-msg').remove();
        $('fieldset.assunto').removeClass('error-msg');
    });

    $('#co_mensagem').on('click', function(event){
        $('fieldset.mensagem .error-msg').remove();
        $('fieldset.mensagem').removeClass('error-msg');
    });
});


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function faleConosco(){
    var me = $('.form-newsletter');
    $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore(me);	
    $('.error-msg').remove();
    var isFormValidate = true;

  if($("#co_nome").val() == ""){
    isFormValidate = false;
    $('fieldset.nome').addClass('error-msg');
    $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertBefore('#co_nome');
    $("#co_nome").focus();
  }

  if($("#co_email").val() == ""){
    isFormValidate = false;
    $('fieldset.email').addClass('error-msg');
    $('<span class="error-msg">Por favor, preencha o seu e-mail.</span>').insertBefore('#co_email');
    $("#co_email").focus();
  }

  if($("#co_telefone").val() == ""){
    isFormValidate = false;
    $('fieldset.telefone').addClass('error-msg');
    $('<span class="error-msg">Por favor, preencha o seu telefone.</span>').insertBefore('#co_telefone');
    $("#co_telefone").focus();
  }

  if($("#co_assunto").val() == ""){
    isFormValidate = false;
    $('fieldset.assunto').addClass('error-msg');
    $('<span class="error-msg">Por favor, preencha o seu assunto.</span>').insertBefore('#co_assunto');
    $("#co_assunto").focus();
  }

  if($("#co_mensagem").val() == ""){
    isFormValidate = false;
    $('fieldset.mensagem').addClass('error-msg');
    $('<span class="error-msg">Por favor, preencha a sua mensagem.</span>').insertBefore('#co_mensagem');
    $("#co_mensagem").focus();
  }

  if(isFormValidate){
    faleCreate();
  } else {
    $("#co_nome").focus();
    $("#co_email").focus();
    $("#co_telefone").focus();
    $("#co_assunto").focus();
    $("#co_mensagem").focus();
  }
}

function faleCreate(){
    var jsonSaveDadosUser = {
        "nome": $("#co_nome").val(),
        "email": $("#co_email").val(),
        "telefone": $("#co_telefone").val(),
        "assunto": $("#co_assunto").val(),
        "mensagem": $("#co_mensagem").val()
    };

    var storename = 'agapemoda';
    var dataEntity = 'MG';

    var urlSaveDadosUser = 'http://api.vtexcrm.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'PATCH',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $("#co_nome").val("");
          $("#co_email").val("");
          $("#co_telefone").val("");
          $("#co_assunto").val("");
          $("#co_mensagem").val("");
          $('<div class="success-msg"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 268.57 268.57"><g fill="#f68026"><path d="M245.294 158.579c7.433 1.49 12.893 5.921 18.235 10.667 7.43-14.703 17.492-50.669-58.34-55.111 0 0 2.571-18.255 12.881-33.929 10.31-15.68 15.623-42.613-5.207-57.621-20.83-15.008-24.048-7.536-26.016.194-1.119 4.399-8.079 34.366-8.079 34.366s-47.267 48.984-55.329 63.32c0 0-5.833 8.452-16.132 8.452H70.578s-30.263 37.293-4.032 89.027c0 0 .445 2.357 5.821 2.357h41.213s11.422 12.767 38.299 27.99c0 0 17.246 7.843 32.479 3.36 0 0 3.133 2.697 10.305 2.697 6.902-.01 29.332 4.272 33.58-19.417-3.214-2.578-6.637-4.542-10.81-5.318-3.405-.631-1.957-5.816 1.428-5.186 5.214.976 9.518 3.631 13.507 6.949 5.575-1.648 15.597-6.604 16.237-20.913-.184-.116-.373-.189-.552-.358-3.885-3.81-8.168-6.833-13.596-7.819-3.412-.61-1.958-5.796 1.429-5.188 6.162 1.114 11.275 4.678 15.69 8.962 5.578-2.856 16.488-11.182 8.256-30.558 0 0 .399-.551 1.019-1.522-4.997-4.523-10.041-8.829-16.987-10.216-3.4-.686-1.956-5.858 1.43-5.185z"/><path d="M60.473 123.542H13.438c-30.237 53.757 0 102.136 0 102.136h48.378c-37.294-51.067-1.343-102.136-1.343-102.136z"/></g></svg><div><h3>Obrigado!</h3><br/>Em breve responderemos o seu contato.</div></div>').insertBefore('.form-faleConosco');
          $('.form-faleConosco').hide();
        },
        error: function (data) {
          console.log(data);
        }
    });
}