$(document).ready(function(){
    $('.form-newsletter #masculino').click(function(){
        $('#cl_genero').next().remove();
        $('.form-newsletter #feminino').removeClass('active');
        $('.form-newsletter #masculino').addClass('active');
        var encontraGenero = $('.form-newsletter fieldset .genero ');
        encontraGenero.attr('value', 'Masculino');
    });
    
    $('.form-newsletter #feminino').click(function(){
        $('#cl_genero').next().remove();
        $('.form-newsletter #masculino').removeClass('active');
        $('.form-newsletter #feminino').addClass('active');
        var encontraGenero = $('.form-newsletter  fieldset .genero ');
        encontraGenero.attr('value', 'Feminino');
    });

    $('#cl_nome').on('click', function(event){
        $('.nome .error-msg').remove();
    });

    $('#cl_email').on('click', function(event){
        $('.email .error-msg').remove();
    });

    $('.genero label').on('click', function(event){
        $('.genero .error-msg').remove();
    });
});


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function Newsletter(){
    var me = $('.form-newsletter');
    $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore(me);	
    $('.error-msg').remove();
    var isFormValidate = true;

  if($("#cl_nome").val() == ""){
    $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertAfter('#cl_nome');
    $("#cl_nome").focus();
  }

  if($("#cl_genero").val() == ""){
    $('<span class="error-msg">Por favor, preencha o seu gênero.</span>').insertAfter('#cl_genero');
  }

  if($("#cl_email").val() == ""){
    $('<span class="error-msg">Por favor, preencha o seu e-mail.</span>').insertAfter('#cl_email');
    $("#cl_email").focus();
  }

  if(isFormValidate){
    ClientCreate();
  } else {
    $("#cl_nome").focus();
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
          $('<div class="success-msg"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>Obrigado! Agora você terá R$ 10 de desconto na sua primeira compra no site. Use o cupom <strong>PRIMEIRACOMPRA</strong> no carrinho de compras para ganhar seu benefício.</div>');

        },
        error: function (data) {
          console.log(data);
        }
    });
}