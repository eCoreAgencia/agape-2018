(function (window, document, $) {
	window.openCourseRegestryPopup = function(){
		if(!$('#cadastroCursos-modal').length){
			var element = __element({type: 'div',id: 'cadastroCursos-modal', class: 'modal-wrapper', content: '<form id="cadastroCursos"><fieldset class="col-xs-12"><label>Nome: </label><input type="text" name="name" placeholder="Nome" required/></fieldset><fieldset class="col-xs-12"><label>E-mail: </label><input type="email" name="email" placeholder="E-mail" required/></fieldset><fieldset class="col-xs-12"><button class="" type="submit">Cadastrar-me</button></fieldset></form>'});
			$('body').append(element);
			$('#cadastroCursos').on('submit', function(e){
				e.preventDefault();
				var data = new Object();
				$(this).find('input').each(function(){
					data[this.name] = this.value;
				});
				$('#cadastroCursos-modal').hide();
				$(this)[0].reset();
				$.ajax({
					url: '/lojadiba/dataentities/NC/documents',
					type: 'POST',
					data: JSON.stringify(data),
					headers:{
						"Content-Type": "application/json",
						Accept: "application/vnd.vtex.ds.v10+json",
					},
					success: function(data){
						alert('Cadastro realizado com sucesso!');
					},
					error: function(error){
						alert('Um erro ocorreu ao fazer seu cadastro. Por favor, tente novamente!');
					}
				})
			});
			$('#cadastroCursos').click(function(e){e.stopPropagation()});
			$('#cadastroCursos-modal').click(function(){$(this).hide();});
		}
		$('#cadastroCursos-modal').show();
	}
}(window, document, jQuery));