// $.getScript('http://io.vtex.com.br/vtex.js/2.2.0/vtex.min.js');

// <script type="text/javascript">
// 	var _st_account = 1027;
// 	(function () {
// 		var ss = document.createElement('script');
// 		ss.type = 'text/javascript';
// 		ss.async = true;
// 		ss.src = '//app.shoptarget.com.br/js/tracking.js';
// 		var sc = document.getElementsByTagName('script')[0];
// 		sc.parentNode.insertBefore(ss, sc);
// 	})();

// </script>


(function() {
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    if (!console[method]) {
      console[method] = noop;
    }
  }
});


// element //
	(function (window, document, $) {
	    'use strict';

	    var __ec_dataEach = function(props){
	    	var el = '';
	    	if(props.data){
	    		$.each(props.data, function(index, value) {
	    			el += ' data-'+value.name +'="'+value.id+'"';
	    		});
	    	}
	    	return el;
	    }

	    var __ec_propsComun = function(props){
	    	var el = '';
	    	el += (props.id) ? ' id="' + props.id + '"' : '';
	    	el += (props.class) ? ' class="' + props.class + '"' : '';
	    	el += (props.style) ? ' style="' + props.style + '"' : '';
	    	return el;
	    }

	    var __ec_img = function(props){
	    	var img = '\n'+'<img';
	            img += __ec_dataEach(props);
	    	    img += __ec_propsComun(props);
	    	    img +=' src="'+props.src+'" ';
	            img += (props.title) ? ' title="'+props.title+'" ' : '';
	            img += (props.title) ? ' alt="'+props.title+'" ' : '';
	            img += (props.width) ? ' width="'+props.width+'" ' : '';
	            img += (props.height) ? ' height="'+props.height+'"' : '';
	            img += '/>';
	      return img;
	    }

	    var __ec_element = function(props){
	    		if(props.type == 'img'){
	    			return __ec_img(props);
	    		}
	    		var el = "";
	    				el += "\n<" + props.type;
	    				el += __ec_dataEach(props);
	    				el += __ec_propsComun({id: props.id, class: props.class, style: props.style});
	    				el += '>';
	    				el += (props.content) ? props.content : '';
	    				el += "</"+props.type+">"+'\n';

	    			return el;
	    }


	    window.__ec_img = __ec_img;
	    window.__ec_propsComun = __ec_propsComun;
	    window.__ec_dataEach = __ec_dataEach;
	    window.__element = __ec_element;

	}(window, document, jQuery));


// element //

// Newsletter //
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
// Newsletter //

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
					vtexjs.checkout.getOrderForm().done(function(orderForm) {

						var items = orderForm.items;
						var i;

						$(cart).find('.sta-cart-total strong').html('R$ ' + helper.toReal(orderForm.value));

						console.log(orderForm)

						$('.sta-cart .openCart > span').html('R$ ' + helper.toReal(orderForm.value));
						$('.openCart').html('<a href="#" class="link-cart"><i class="ico-cart"></i> <i class="cart-qty"> ' + orderForm.items.length + '</i> <span>R$ ' + helper.toReal(orderForm.value) + ' </span></a>');

						$(cart).find('ul').html('');

						if(items.length > 0){
							$('.sta-cart-resume a').removeClass('disabled');

							for(i = 0; i < items.length; i++){
								$(cart).find('ul').append('<li> <div class="sta-cart-pdt-image"><img src="'+items[i].imageUrl+'" /><span class="sta-cart-pdt-qtd-item">' + items[i].quantity + '</span></div> <div class="sta-cart-pdt-info"> <h4>'+items[i].name+'</h4> <button class="remove-item" data-index="'+i+'"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 125"><path fill="#f68026" d="M88.711 86.588L52.121 50l36.588-36.588-2.121-2.121L50 47.878 13.41 11.291l-2.121 2.121L47.878 50 11.289 86.588l2.121 2.121L50 52.12l36.59 36.589z"/></svg><span>remover</span></button> <div class="sta-cart-pdt-qtd"></div> <p>R$ ' + helper.toReal(items[i].listPrice) + '</p> </div> </li>');
							}
						}else{
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
			var cartHtml = '<div class="sta-cart-overlay"></div><div class="sta-cart-container"> <div class="sta-cart-title"> <button class="sta-cart-close"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#f68026" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "/></svg></button> <h3>Minha Compra<span class="qtd-cart"></span></h3> </div> <div class="sta-cart-items"> <ul></ul> </div> <div class="sta-cart-resume"> <span class="sta-cart-sub">Subtotal<strong>R$ 0,00</strong></span> <span class="sta-cart-freight">Frete<strong style="display:none">0</strong><button>Calcular</button><input type="text" /></span> <span class="sta-cart-total">Total: <strong>R$ 0,00</strong></span> <a href="/checkout/#/cart"><span>Finalizar Pedido</span></a> </div> </div>';
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
				var index = $(this).data('index');
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
	        buyButton: $(".buy-button"),
	        wrapper: $(".container"),
	        effect: "overlay",
	        cartButton: $(".sta-cart")
	    })
	    $('header #mini-cart').click(function(){
	    	$('.sta-cart-overlay').show();
	    	$('.sta-cart-container').animate({right: 0},300);
	    });
	});
// Minicart //

jQuery.fn.simulateClick = function() {
	return this.each(function() {
		if ('createEvent' in document) {
			var doc = this.ownerDocument,
			evt = doc.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.dispatchEvent(evt);
		} else {
			this.click();
		}
	});
}

var body = $('body'),
	htmlBody = $('html, body'),
	$document = $(document),
	header = $('#header'),
	submenuDesktopWrapper = $('.js-submenu-wrap'),
	userSubmenu = $('.submenu-user'),
	sidePanelMobile = $('.side-panel'),
	mobileSubmenu = $('.submenu-mobile'),
	minicart = $('.minicart'),
	slide = $('.slide'),
	slideShelf = $('.slideShelf'),
	slideBrands = $('.slideBrands'),
	carousel = $('.shelf-carousel'),
	backToTop = $('.js-back-to-top'),
	shelf = $('.prateleira'),
	paginatedShelf = $('.prateleira[id*=ResultItems]'),
	orderList = $('.order-list'),
	formNews = $('.newsletter'),
	depCatBus = $('.dep-cat-bus'),
	pagProduto = $('.produto'),
	pagInstitucional = $('.institucional'),
	sidebar = $('.sidebar');

$(function() {

	// Ajuste Meus Pedidos //
		if (orderList.length > 0) {
			orderList.find('link').remove();
			orderList.find('.page-header').unwrap('.container');
		}
	// Ajuste Meus Pedidos //

	$('.fulltext-search-box').val('O que você procura?');

	// Menu Persistente Begin //
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 350) {
				$('header').addClass('menu-persistente');
				$('body').addClass('top-height-active');
			} else {
				$('header').removeClass('menu-persistente');
				$('body').removeClass('top-height-active');
			}
		});
    // Menu Persistente END //

	// Remocao de Li HelperComplement Prateleira //
		if ($('.helperComplement').length) {
			$('.helperComplement').remove();
		}
	// Remocao de Li HelperComplement Prateleira //

	// Busca Mob //
		$(".search-toggle").click(function() {
			$(".search-box ").toggleClass("active");
		});
	// Busca Mob //


  	// Voltar ao Topo //
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 450) {
				$('.js-back-to-top').addClass('active');
			} else {
				$('.js-back-to-top').removeClass('active');
			}
		});

		body.on('click', '.js-back-to-top', function(event) {
		    event.preventDefault();
		    htmlBody.animate({ scrollTop: 0 }, 300);
		});
  	// Voltar ao Topo //

	// Slider
		$('.banners-top.slider').slick({
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: true,
			arrows: true,
			dots: false,
			draggable: true,
			touchMove: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});

		$('.shelf.slider').find('.prateleira > ul').slick({
			dots: false,
			arrows: true,
			draggable: true,
			touchMove: true,
			autoplay: false,
			slidesToShow: 2,
			mobileFirst: true,
			slidesToScroll: 3,
			prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
			nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				},
			]
	    });

	    $('.slider-dois.slider').find('.prateleira > ul').slick({
			dots: false,
			arrows: true,
			draggable: true,
			touchMove: true,
			autoplay: false,
			slidesToShow: 2,
			mobileFirst: true,
			slidesToScroll: 2,
			prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
			nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
			adaptiveHeight: true,
	    });
	// Slider
	// Btn fechar menu

	// Menu SidePanel //
	/*
		$('header .js-open-mobile-menu').click(function(){
			$(this).toggleClass('active');
			$('header .menu-header').toggleClass('slideActive');
		});

		$("header nav.menu .has-sub .js-open-sub").click(function() {
		  $(this).toggleClass('active');
		  $(this).next().toggleClass("slideActive");
		});
    $(".first-menu").click(function() {
				$(this).parent().toggleClass('has-sub-active');
		  	$(this).parent().find('.pointer').toggleClass('pointer-active');
		  	$(this).next().toggleClass("slideActive");

		});*/
	// Menu SidePanel //
	//
	$('.js-open-mobile-menu').click(function(){
		var self = $(this);
		$('.js-open-mobile-menu').toggleClass('active')

		$('.menu-header').toggleClass('display');

		if (self.hasClass('active')) {
		    $('html, body')
		         // Needed to remove previously bound handlers
		         .off('touchstart touchmove')
		         .on('touchstart touchmove', function (e) {
		             e.preventDefault();
		    });
		 } else {
		     $('html, body')
		         .off('touchstart touchmove')
		         .on('touchstart touchmove', function (e) {});
		}
	});
	$('header').find('.menu-header.display').on('click', 'li.has-sub > a', function(e){
        e.preventDefault();
        $(this).siblings('.submenu').toggleClass('active');
    });

	$(".menu-header .has-sub > a:first-of-type").on('click', function(e){
		e.preventDefault();
		$(this).parent().siblings('.has-sub').children('a:first-of-type').each(function(){
			$(this).next('.submenu').hide();
		});
		$(this).next('.submenu').toggle();
	});

	// Open submenu mobile //
		$(".first-menu").click(function() {
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		});
	// Open submenu mobile //

	var mountBread = function(){
		var bCrumb = $(".bread-crumb li").length;
		if(bCrumb <= 2){
			$(".bread-crumb-box .text1").html();
			$(".bread-crumb-box .text2").html($(".bread-crumb li:last-child").text());
		}else{
			$(".bread-crumb-box .text1").html($(".bread-crumb li:nth-last-of-type(2)").text());
			$(".bread-crumb-box .text2").html($(".bread-crumb li:last-of-type").text());
		}
	}


	// Smart Research //
		if (sidebar.length > 0) {
			mountBread();
			try {
				sidebar.find('input[type="checkbox"]').vtexSmartResearch({
					elemLoading: '',
					returnTopText: '',
					elemLoading:'<i class="shelf__loading"></i>',
					filterScrollTop: function(shelfOffset) {
						return 20;
					}
				});
			} catch(e) {}
		}
	// Smart Research //

	if($(pagInstitucional).length > 0){

		// Slide Toggle itens
			$(".tab span").click(function() {
				$(this).toggleClass("active");
				$(this).next().slideToggle();
			});
		// Slide Toggle itens

	}

    // Scripts Pagina de Produto //
	    if (pagProduto.length > 0) {
			try {
				$document.ready(function() {
				// Script Quantidade de Produtos END. Pego a quantidade de produtos pelo val e jogo na URL do botao.
					$('.selecao-sku .more').click(function(){
						var $input = $(this).prev();
						$input.val( +$input.val() + 1 );
						var opt_value = $input.val();
						var link = $(this).next();
						var currentURL = $('.buy-button').attr('href');
						var nomedoproduto = currentURL.split(/\&/)[0];
						$('.buy-button').removeAttr('href');
						$('.buy-button').attr('href', nomedoproduto + '&qty=' + opt_value + '&seller=1&redirect=false&sc=1');
					});

					$('.selecao-sku .less').click(function(){
						var $input = $(this).next();
						$input.val( +$input.val() - 1 );
						var opt_value = $input.val();
						var encontraInput = $(this).next();
						var currentURL = $('.buy-button').attr('href');
						var nomedoproduto = currentURL.split(/\&/)[0];

						$('.buy-button').removeAttr('href');
						$('.buy-button').attr('href', nomedoproduto + '&qty=' + opt_value + '&seller=1&redirect=false&sc=1');
					});
		        // Script Quantidade de Produtos END

		        // Script Mudando regulamento de lugar
		        	$('#caracteristicas table.Regra').appendTo('.reg-conteudo');
		        // Script Mudando regulamento de lugar END

				});
			} catch(e) {}
			// function updateBuyButtonQnt(qnt){
			// 	$('a.buy-button.buy-button-ref').each(function(){
			// 		if(this.href.indexOf('javascript:') < 0){
			// 			this.href = this.href.replace(/&qty=\d+/,"&qty="+qnt);
			// 		}
			// 	})
			// }
	    }
    // Scripts Pagina de Produto //


  	// Scripts Departamento //
		if($(depCatBus).length > 0){
			// Adicionando classe nos elementos do Ordernar Por quando ativos
			if(window.location.href.indexOf("OrderByTopSaleDESC")!=-1){
				$(".main-category__orderBy li:nth-child(2) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByReleaseDateDESC")!=-1){
				$(".main-category__orderBy li:nth-child(3) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByPriceDESC")!=-1){
				$(".main-category__orderBy li:nth-child(4) a").addClass("active");
			}
			if(window.location.href.indexOf("OrderByPriceASC")!=-1){
				$(".main-category__orderBy li:nth-child(5) a").addClass("active");
			}
			// Adicionando classe nos elementos do Ordernar Por quando ativos
		}
  	// Scripts Departamento //

// Scripts Modal //
    // Open Modal //
	    // Open Modal //
	        $('.call_modal').click(function() {
	            $('.tabelas').fadeIn(200);
	            $('.bg_modal').fadeIn(600);
	            $('body').addClass('modal_active');
	        });
	        // Open Modal //

	        // Close Modal //
	        $('.close_modal, .bg_modal').click(function() {
	            $('.tabelas').fadeOut(600);
	            $('.bg_modal').fadeOut(600);
	            $('body').removeClass('modal_active');
	            $('.modal_loader').remove(); // remove o conteudo do modal ao fechar
	        });
	        $(document).keyup(function(ev) {
	            if (ev.keyCode == 27)
	                $('.tabelas').fadeOut(500);
	                $('.bg_modal').fadeOut(600);
	            $('body').removeClass('modal_active');
	            $('.modal_loader').remove(); // remove o conteudo do modal ao fechar
	            $('#parcelamentoModal').removeClass('active');
	        });
	    // Close Modal //
	// Scripts Modal //

    // Remocao Loading Meus Pedidos//
		try {
			$document.ajaxStop(function() {
				orderList.parents('html').removeClass('is-loading');
			});
		} catch(e) {}
    // Remocao Loading Meus Pedidos//

		// fadeInOut
    function fadeInOut(item) {
  			item.fadeIn(1000).delay(3000).fadeOut(1000, function() {
		    if (item.next().length)
		    {
		      fadeInOut(item.next());
		    }
		    else {
		      fadeInOut(item.siblings(':first'));
		    }
  		});

		}
		if($("body").hasClass('home')){
			var tipBar = function(s){
				if (typeof window.screen.orientation !== 'undefined' && s <= 768) {
					fadeInOut(jQuery('.tipBar ul li:first-child'));
				}
			}
			tipBar(window.screen.width);
			$(window).on('resize', function(){ tipBar(window.screen.width) });
		}

});
