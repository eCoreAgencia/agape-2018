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
          
          $('.modal-container').remove('.new-modal-content');
          $('<div class="new-modal-content news-element success-news"><h3>Seu e-mail foi cadastrado com sucesso.</h3><p>Em breve, você receberá nossas novidades e promoções em sua caixa de e-mail.</p></div>').appendTo('.modal-container');
          $('body').addClass('modal-active newsletter-active');
        },
        error: function (data) {
          console.log(data);
          $('.modal-container').remove('.new-modal-content');
          $('<div class="new-modal-content news-element fail-news"><h3>Ocorreu algum erro ao cadastrar seu e-mail.</h3><p>Você pode fechar essa janela e tentar novamente mais tarde? Obrigado.</p></div>').appendTo('.modal-container');
          $('body').addClass('modal-active newsletter-active');
        }
    });
}