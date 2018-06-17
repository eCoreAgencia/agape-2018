// Minicart 
	(function($) {
		'use strict';

		var settings = {
			effect: 'overlay'
		};
		
		var cart = null;

		var helper = {
			openCart : function(){
				var width = $(cart).width() * -1;

				if(settings.effect == "push"){
					$(settings.wrapper).animate({
						marginLeft:width
					});
				}

				$(cart).animate({
					right:0
				});

				$('.sta-cart-overlay').fadeIn();
			},
			closeCart : function(){
				var width = $(cart).width() * -1;

				if(settings.effect == "push"){
					$(settings.wrapper).animate({
						marginLeft:0
					});
				}

				$(cart).animate({
					right:width
				});

				$('.sta-cart-overlay').fadeOut();
			},
			fillCart : function(){ //
				setTimeout(function() {
					vtexjs.checkout.getOrderForm().done(function(orderForm, val) {

						var v = orderForm.value;
						var items = orderForm.items;
						var i;

						var calc10 = v * 10 / 100;
						var convertCalc10 = calc10.toString();

						var calc20 = v * 20 / 100;
						var convertCalc20 = calc20.toString();

						var calc30 = v * 30 / 100;
						var convertCalc30 = calc30.toString();

						var calc40 = v * 40 / 100;
						var convertCalc40 = calc40.toString();

						var calc50 = v * 50 / 100;
						var convertCalc50 = calc50.toString();

						var calc60 = v * 60 / 100;
						var convertCalc60 = calc60.toString();

						var calc70 = v * 70 / 100;
						var convertCalc70 = calc70.toString();

						var calc80 = v * 80 / 100;
						var convertCalc80 = calc80.toString();

						var calc90 = v * 90 / 100;
						var convertCalc90 = calc90.toString();

						var calc100 = v * 100 / 100;
						var convertCalc100 = calc100.toString();

						$(cart).find('.sta-cart-total strong').html('R$ ' + helper.toReal(orderForm.value));

						console.log(orderForm)

						$('.sta-cart .openCart > span').html('R$ ' + helper.toReal(orderForm.value));
						$('.openCart').html('<a href="#" class="link-cart"><i class="ico-cart"></i> <i class="cart-qty"> ' + orderForm.items.length + '</i> <span>R$ ' + helper.toReal(orderForm.value) + ' </span></a>');

						$(cart).find('ul').html('');

						if(items.length > 0){

							$('.sta-cart-resume a').removeClass('disabled');
							var freeFreight = '29999'; // Format Vtex JS Price Without Conversion

							for(i = 0; i < items.length; i++){
								$(cart).find('ul').append('<li> <div class="sta-cart-pdt-image"><a href="'+items[i].detailUrl+'"><img src="'+items[i].imageUrl+'" /></a><span class="sta-cart-pdt-qtd-item">' + items[i].quantity + '</span></div> <div class="sta-cart-pdt-info"> <h4><a href="'+items[i].detailUrl+'">'+items[i].name+'</a></h4> <button class="remove-item" data-index="'+i+'"><span>excluir</span></button> <div class="sta-cart-pdt-qtd"></div> <p>R$ ' + helper.toReal(items[i].sellingPrice) + '</p> </div> </li>');
							}

							if(convertCalc100 > freeFreight) {
								$('<div class="progressbar 100"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc10 < freeFreight) {
								$('<div class="progressbar 10"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc20 < freeFreight) {
								$('<div class="progressbar 20"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc30 < freeFreight) {
								$('<div class="progressbar 30"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc40 < freeFreight) {
								$('<div class="progressbar 40"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc50 < freeFreight) {
								$('<div class="progressbar 50"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc60 < freeFreight) {
								$('<div class="progressbar 60"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc70 < freeFreight) {
								$('<div class="progressbar 70"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc80 < freeFreight) {
								$('<div class="progressbar 80"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							} else if (convertCalc90 < freeFreight) {
								$('<div class="progressbar 90"><span class="progressbar__buttonEffect"></span></div>').insertBefore('.sta-cart-resume');
							}

						} else {
							$('.sta-cart-resume a').addClass('disabled');
							helper.closeCart();
						}
					});
				}, 500);
			},
			addItem: function(el) {
				var urlTest = ["javascript",":","alert('Por favor, selecione o modelo desejado.');"].join('');
				var url = $(el).attr('href');

				if(url == urlTest){
					alert('Por favor, selecione o modelo desejado.');
					return false;
				} else {

					// var cart = "/checkout/cart/add?sku=" + url.split('sku')[1].split('&')[0].split('=')[1] + "&seller=1&redirect=true&sc=2";
					var cart = url;

					$.ajax({
						url: cart.replace("https://www.kroton.com.br", "").replace("true", "false"),
						type: 'GET',
						crossDomain: true,
						dataType: 'html',
						success: function(){
							helper.openCart();
							helper.fillCart();
						}
					});
				}
			},
			removeItem : function(index){
	            vtexjs.checkout.getOrderForm().then(function (orderForm) {
	                var item = orderForm.items[index];
	                item.index = index;
	                return vtexjs.checkout.removeItems([item]);
	            }).done(function (orderForm) {
	                helper.fillCart();
	            });
			},
			toReal : function(val){
				val = val / 100;
				val = val.toFixed(2).toString().replace('.',',');
				val = val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

				return val;
			},
			selectSku: function(){
				// #Click add produto vitrine
				$('.product-actions .btn.comprar-product').on('click', function(event) {
					event.preventDefault();
					var idSku = $(this).parent().parent().find('.product-content .content-select-sku > ul > li.active').attr('data-sku');
					var qty = $(this).prev().find('.list-count .result input').val();
					if(idSku == undefined){
						alert('Selecione tamanho ou cor');
					}else{
						var cart = "/checkout/cart/add?sku=" + idSku + "&seller=1&redirect=true&sc=2";

						$.ajax({
							url: cart.replace("https://www.kroton.com.br", "").replace("true", "false"),
							type: 'GET',
							crossDomain: true,
							dataType: 'html',
							success: function(){
								helper.openCart();
								helper.fillCart();
							}
						});
					}
				});

				// Click aumenta quantidade
				$('.list-count .qty-more').on('click', function(event) {
					event.preventDefault();
					var $qty = parseInt($(this).parent().parent().find('.result input').val());
					$(this).parent().parent().find('.result input').attr('value', $qty + 1);
				});

				// Click diminui quantidade
				$('.list-count .qty-less').on('click', function(event) {
					event.preventDefault();
					var $qty = parseInt($(this).parent().parent().find('.result input').val());

					if($qty <= 1) {
						$(this).parent().parent().find('.result input').attr('value', '1');
					}else{
						$(this).parent().parent().find('.result input').attr('value', $qty - 1);	
					}
				});

				// Add id sku
				$('.product-insertsku > fieldset > ul > li').each(function (index, item) {
					$(this).parents('.product-insertsku').parent().parent().parent().find('.product-content .content-select-sku > ul').append('<li data-sku="' + $(this).find('.insert-sku-checkbox').attr('rel') + '">' + $(this).find('.insert-sku-quantity').attr('title').split(" ")[0]) + '<li>';
				});

				// Deixa sku ativo
				$('.content-select-sku > ul > li').on('click', function(event) {
					$('.content-select-sku > ul > li').removeClass('active');
					$(this).addClass('active');
				});	
			}
		};

		$.fn.vtexcart = function(parameters) {
			var el = this;
			settings = $.extend(settings, parameters);
			var cartHtml = '<div class="sta-cart-overlay"></div><div class="sta-cart-container"> <div class="sta-cart-title"><button class="sta-cart-close"><img src="/arquivos/bt-fechar.png" /></button> <span class="cart-ico"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 510 510"><path d="M153 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51zM0 0v51h51l91.8 193.8-35.7 61.2c-2.55 7.65-5.1 17.85-5.1 25.5 0 28.05 22.95 51 51 51h306v-51H163.2c-2.55 0-5.1-2.55-5.1-5.1v-2.551l22.95-43.35h188.7c20.4 0 35.7-10.2 43.35-25.5L504.9 89.25c5.1-5.1 5.1-7.65 5.1-12.75 0-15.3-10.2-25.5-25.5-25.5H107.1L84.15 0H0zm408 408c-28.05 0-51 22.95-51 51s22.95 51 51 51 51-22.95 51-51-22.95-51-51-51z" fill="#f68026"/></svg></span><h3>Minhas <strong>Compras</strong><span class="qtd-cart"></span></h3> </div> <div class="sta-cart-items"> <ul></ul> </div> <div class="sta-cart-resume"> <span class="sta-cart-sub">Subtotal<strong>R$ 0,00</strong></span> <span class="sta-cart-freight">Frete<strong style="display:none">0</strong><button>Calcular</button><input type="text" /></span><span class="sta-cart-total">Total: <strong>R$ 0,00</strong></span> <a href="/checkout/#/cart"><span>Finalizar Pedido</span></a> </div> </div>';
			var miniCartHtml = '<a href="#" class="openCart link-cart"><span></span></a>';

			$(el).append(cartHtml);

			if(settings.cartButton){
				if($('.sta-cart .openCart').length == 0){
					$(settings.cartButton).append(miniCartHtml);
				}
			}

			cart = $(el).find('.sta-cart-container');

			helper.fillCart();

			//DIRECTIVES
			$('body').delegate('.comprarNow a','click', function(event){
				helper.addItem($(this));
				event.preventDefault();
			});

			$(settings.buyButton).on('click', function(event){
				helper.addItem($(this));
				event.preventDefault();
			});

			$('.openCart').on('click', function(event){
				helper.openCart();
				event.preventDefault();
			});

			$('.sta-cart-close, .sta-cart-overlay').on('click', function(){
				helper.closeCart();
			});

			$('.sta-cart-container').on('click','.remove-item', function(){
				var me = $(this);
				$('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore(me);		
				
				var index = $(this).data('index');
				
				$('.spinner').fadeOut('6000');
				helper.removeItem(index);
			});

			$('.sta-cart-resume a').on('click', function(){
				if($(this).hasClass('disabled')){
					return false;
				} else { 
					return true;
				}
			});

			$('.sta-cart-freight button').click(function(){
				$(this).hide();
				$('.sta-cart-freight input').show();
			});

			helper.selectSku();

			//Delegate ajax paginação
			$('body.categoria').on('click', '.pager.bottom .pages > li', function(event) {
				var interval = setInterval(function(){
					if ($('.content-select-sku > ul > li').length == 0) {
						helper.selectSku();
						clearInterval(interval);
					}
				},500);
			});
		};

	} (jQuery));

	$(function() {
	    $("body").vtexcart({
	        wrapper: $(".container"),
	        effect: "overlay",
	        cartButton: $(".sta-cart")
	    })
	    $('header #mini-cart').click(function(){
	    	$('.sta-cart-overlay').show();
	    	$('.sta-cart-container').animate({right: 0},300);
	    });
	});

// Minicart 