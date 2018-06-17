function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function Newsletter(){
  var isFormValidate = true;

  if($("#cl_nome").val() == ""){
    isFormValidate = false;
    $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertAfter('#cl_nome');
    $("#cl_nome").focus();
  }

  if((isFormValidate) && ($("#cl_genero").val() == "")){
    isFormValidate = false;
    $('<span class="error-msg">Por favor, preencha o seu gênero.</span>').insertAfter('#cl_genero');
    $("#cl_genero").focus();
  }

  if((isFormValidate) && ($("#cl_email").val() == "")){
    isFormValidate = false;
    $('<span class="error-msg">Por favor, preencha o seu e-mail.</span>').insertAfter('#cl_email');
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
    $('<span class="error-msg">Por favor, preencha o seu nome.</span>').insertAfter('#cl_nome');
    $('<span class="error-msg">Por favor, preencha o seu e-mail.</span>').insertAfter('#cl_nome');
  }
}

function ClientCreate(){
    $('.modal-container').remove('.new-modal-content');
    var jsonSaveDadosUser = {
        "nome": $("#cl_nome").val(),
        "email": $("#cl_email").val(),
        "genero": $("#cl_genero").val()
    };

    var storename = 'api';
    var dataEntity = 'NF';

    var urlSaveDadosUser = 'https://agapemoda.vtexcommercestable.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';

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
        },
        error: function (data) {
          console.log(data);
        }
    });
}