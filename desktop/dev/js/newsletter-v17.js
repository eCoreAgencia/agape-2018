$(document).ready(function(){
    $('.form-newsletter #masculino').click(function(){
        $('.form-newsletter #feminino').removeClass('active');
        $('.form-newsletter #masculino').addClass('active');
        var encontraGenero = $('.form-newsletter fieldset .genero ');
        encontraGenero.attr('value', 'Masculino');
    });

    $('.form-newsletter #feminino').click(function(){
        $('.form-newsletter #masculino').removeClass('active');
        $('.form-newsletter #feminino').addClass('active');
        var encontraGenero = $('.form-newsletter  fieldset .genero ');
        encontraGenero.attr('value', 'Feminino');
    });
});

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function Newsletter(){
  if($("#cl_nome").val() == ""){
    $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertAfter('#cl_nome');
    $("#cl_nome").focus();
  }

  if((isFormValidate) && ($("#cl_genero").val() == "")){
    $('<span class="error-msg">Por favor, preencha o seu gênero.</span>').insertAfter('#cl_genero');
    $("#cl_genero").focus();
  }

  if((isFormValidate) && ($("#cl_email").val() == "")){
    $('<span class="error-msg">Por favor, preencha o seu e-mail.</span>').insertAfter('#cl_email');
    $("#cl_email").focus();
  }

  if((isFormValidate) && (!IsEmail($("#cl_email").val()))){
    $("#cl_email").val("");
    $("#cl_email").focus();
  }

  if(isFormValidate){
    ClientCreate();
  } else {
    $("#cl_nome").focus();
    $("#cl_genero").focus();
    $("#cl_email").focus();
  }
}

function ClientCreate(){
    var jsonSaveDadosUser = {
        "nome": $("#cl_nome").val(),
        "email": $("#cl_email").val(),
        "genero": $("#cl_genero").val()
    };

    var storename = 'agapemoda';
    var dataEntity = 'NF';

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
          $("#cl_nome").val("");
          $("#cl_email").val("");
          $("#cl_genero").val("");
          alert("E-mail cadastrado com sucesso!");
          setInterval(function() {
              $('section.lightbox-desc').fadeOut();
          }, 1500);
        },
        error: function (data) {
          console.log(data);
          alert("Houve um erro ao cadastrar seu e-mail. Tente novamente mais tarde");
        }
    });
}
