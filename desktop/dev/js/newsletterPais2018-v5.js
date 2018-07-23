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
    var dataEntity = 'NP';

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
          $('.Newsletter-image').remove();
          $('.form-newsletter').remove();
          $('<div class="success-msg"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 475.099 475.099"><path d="M442.829 265.532c9.328-14.089 13.986-29.598 13.986-46.538 0-19.607-7.225-36.637-21.687-51.117-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842 13.709-37.117 13.709-54.816 0-22.271-3.34-39.971-9.996-53.105-6.663-13.138-16.372-22.795-29.126-28.984C295.313 3.09 280.947 0 264.959 0c-9.712 0-18.274 3.521-25.697 10.566-8.183 7.993-14.084 18.274-17.699 30.837-3.617 12.559-6.521 24.6-8.708 36.116-2.187 11.515-5.569 19.652-10.135 24.41-9.329 10.088-19.511 22.273-30.551 36.547-19.224 24.932-32.264 39.685-39.113 44.255H54.828c-10.088 0-18.702 3.574-25.84 10.706-7.135 7.139-10.705 15.752-10.705 25.841v182.723c0 10.089 3.566 18.699 10.705 25.838 7.142 7.139 15.752 10.711 25.84 10.711h82.221c4.188 0 17.319 3.806 39.399 11.42 23.413 8.186 44.017 14.418 61.812 18.702a230.392 230.392 0 0 0 54.106 6.427h36.829c26.836 0 48.438-7.666 64.809-22.99 16.365-15.324 24.458-36.213 24.27-62.67 11.42-14.657 17.129-31.597 17.129-50.819 0-4.185-.281-8.277-.855-12.278 7.23-12.748 10.854-26.453 10.854-41.11-.003-6.853-.858-13.423-2.573-19.7zM85.949 396.58c-3.616 3.614-7.898 5.428-12.847 5.428-4.95 0-9.233-1.813-12.85-5.428-3.615-3.613-5.424-7.897-5.424-12.85 0-4.948 1.805-9.229 5.424-12.847 3.621-3.617 7.9-5.425 12.85-5.425 4.949 0 9.231 1.808 12.847 5.425 3.617 3.617 5.426 7.898 5.426 12.847 0 4.953-1.809 9.237-5.426 12.85zm328.196-154.161c-4.093 8.754-9.186 13.227-15.276 13.415 2.854 3.237 5.235 7.762 7.139 13.562 1.902 5.807 2.847 11.087 2.847 15.848 0 13.127-5.037 24.455-15.126 33.969 3.43 6.088 5.141 12.658 5.141 19.697 0 7.043-1.663 14.038-4.996 20.984-3.327 6.94-7.851 11.938-13.559 14.982.951 5.709 1.423 11.04 1.423 15.988 0 31.785-18.274 47.678-54.823 47.678h-34.536c-24.94 0-57.483-6.943-97.648-20.841-.953-.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565c-2.19-.767-5.518-1.861-9.994-3.285-4.475-1.431-8.087-2.479-10.849-3.142-2.758-.664-5.901-1.283-9.419-1.855-3.52-.571-6.519-.855-8.993-.855h-9.136V219.285h9.136c3.045 0 6.423-.859 10.135-2.568 3.711-1.714 7.52-4.283 11.421-7.71a294.593 294.593 0 0 0 10.992-10.138c3.427-3.33 7.233-7.517 11.422-12.559 4.187-5.046 7.47-9.089 9.851-12.135a1179.86 1179.86 0 0 0 8.992-11.707c3.615-4.757 5.806-7.613 6.567-8.566 10.467-12.941 17.795-21.601 21.982-25.981 7.804-8.182 13.466-18.603 16.987-31.261 3.525-12.66 6.427-24.604 8.703-35.832 2.282-11.229 5.903-19.321 10.858-24.27 18.268 0 30.453 4.471 36.542 13.418 6.088 8.945 9.134 22.746 9.134 41.399 0 11.229-4.572 26.503-13.71 45.821-9.134 19.32-13.698 34.5-13.698 45.539h100.495c9.527 0 17.993 3.662 25.413 10.994 7.426 7.327 11.143 15.843 11.143 25.553-.003 6.661-2.05 14.371-6.142 23.137z" fill="#e0e0e0"/></svg><div class="txt-success"><h3>Parabéns, cadastro efetuado com sucesso!</h3><br/>Para presentear o papai, use o cupom <strong>MEUTUDO</strong> no Carrinho de Compras.</div></div>').appendTo('.news-pais');
        },
        error: function (data) {
          console.log(data);
        }
    });
}