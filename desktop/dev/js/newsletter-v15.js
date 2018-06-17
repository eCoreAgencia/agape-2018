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
  var isFormValidate = true;

  if($("#cl_nome").val() == ""){
    isFormValidate = false;
    $("#cl_nome").focus();
  }

  if((isFormValidate) && ($("#cl_genero").val() == "")){
    isFormValidate = false;
    $("#cl_genero").focus();
  }

  if((isFormValidate) && ($("#cl_email").val() == "")){
    isFormValidate = false;
    $("#cl_email").focus();
  }

  if((isFormValidate) && (!IsEmail($("#cl_email").val()))){
    isFormValidate = false;
    $("#cl_email").val("");
    $("#cl_email").focus();
  }

  if(isFormValidate){
    ClientCreate();
  } else {
    window.alert('É preciso preencher todos os campos.');
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
