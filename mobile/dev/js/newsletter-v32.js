$(document).ready(function(){
  $('.form-newsletter #masculino').click(function(){
      $('.genero .error-msg').remove();
      $('.form-newsletter #feminino').removeClass('active');
      $('.form-newsletter #masculino').addClass('active');
      $('#cl_genero').attr('value', 'Masculino');
  });

  $('.form-newsletter #feminino').click(function(){
      $('.genero .error-msg').remove();
      $('.form-newsletter #masculino').removeClass('active');
      $('.form-newsletter #feminino').addClass('active');
      $('#cl_genero').attr('value', 'Feminino');
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
  isFormValidate = false;
  $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertAfter('#cl_nome');
  $("#cl_nome").focus();
}

if($("#cl_genero").val() == ""){
  isFormValidate = false;
  $('<span class="error-msg">Por favor, preencha o seu gênero.</span>').insertAfter('#cl_genero');
}

if($("#cl_email").val() == ""){
  isFormValidate = false;
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
    beforeSend: function(){
    $('.Newsletter .spinner').css("display","block");
  },
    complete: function(){
       setTimeout(function(){

     $('.Newsletter .spinner').css("display","none");
      $([document.documentElement, document.body]).animate({
      scrollTop: $(".Newsletter").offset().top -100
  }, 1000);
  },2500);

    },
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
        $('.Newsletter-image').remove();
        $('.form-newsletter').remove();
        $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').appendTo('.Newsletter');
        $('<div class="success-msg"><img class="col-xs-12 col-md-3" src="/arquivos/img-legal-news.png" /><div class="col-xs-12 col-md-9"><h3>Obrigado!</h3><br/>Agora você terá R$ 10 de desconto na sua primeira compra no site. Use o cupom no carrinho de compras para ganhar seu benefício.<span>CUPOM: <strong>PRIMEIRACOMPRA</strong></span></div></div>').appendTo('.Newsletter');
      },
      error: function (data) {
        console.log(data);
      }
  });
}
