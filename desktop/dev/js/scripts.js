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

		$('.freight-btn').on('click', function(event){
			// Mounting Loader //
			$('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore('.freight-values');		
			// Mounting Loader //

			$('.spinner').fadeOut('6000');
		});

	// Add to Cart Button //
		body.on('click', '.add-to-cart', function(event){
			var url = $('.buy-button').attr('href');
			$(this).attr('data-link', url);

			if($('.add-to-cart').attr('data-link') == "javascript:alert('Por favor, selecione o modelo desejado.');" ) {
				$('.modal-container').remove('.new-modal-content');
				$('<div class="new-modal-content news-element success-news"><h3>É preciso escolher a variação do seu produto.</h3></div>').appendTo('.modal-container');
				$('body').addClass('modal-active add-to-cart-active');

			} else {
				$('.sta-cart-items ul li.fake-insert').remove();
				$.get(url, function(data, val) {
					vtexjs.checkout.getOrderForm().done(function(orderForm) {
						console.log(orderForm);

						var elements = orderForm.items;
						$(elements).each(function(orderForm, val){
							var tempPrice = val.formattedPrice;
							var tempImage = val.imageUrl;
							var tempName = val.name;

							$('<li class="fake-insert"><div class="sta-cart-pdt-image"></div><div class="sta-cart-pdt-info"><button class="remove-item" data-index="0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "></polygon></svg><span>remover</span></button><div class="sta-cart-pdt-qtd"></div></div></li>').appendTo('.sta-cart-items ul');
							$('<img src='+tempImage+'/>').appendTo('li.fake-insert .sta-cart-pdt-image');
							$('<h4>'+tempName+'</h4>').insertBefore('li.fake-insert .sta-cart-pdt-info button');
							$('<p>'+tempPrice+'</p>').insertAfter('li.fake-insert .sta-cart-pdt-qtd');
							var tempPrice = $('.total-cart-em').text();
							$('.sta-cart-total strong').text(tempPrice);

							htmlBody.animate({ scrollTop: 0 }, 300);
							$('.amount-items-em').simulateClick('click');
						});
					});
				});	
			}
		});

		$('.skuList input').on('click', function(event){
			var dataLink = $('.buy-button').attr('href');
			$('.add-to-cart').attr('data-link', dataLink);
		});
	// Add to Cart Button //

    // Scripts Modal //
        // Close Modal //
        $('.close-modal, .opacity-modal').click(function(event) {
            $('body').removeClass('modal-active');
            $('body').removeClass('newsletter-active');
            $('body').removeClass('sku-unavaiable');
            $('body').removeClass('add-to-cart-active');
            $('body').removeClass('product-popup');
            $('.new-modal-content').remove();
        });

        $(document).keyup(function(ev) {
            if (ev.keyCode == 27)
            $('body').removeClass('modal-active');
            $('body').removeClass('newsletter-active');
            $('body').removeClass('add-to-cart-active');
            $('body').removeClass('product-popup');
            $('.new-modal-content').remove();
            $('#parcelamentoModal').removeClass('active');
        });
    	// Close Modal //

	// Scripts Modal //


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

		        
		        // Frete Gratis //
		        	$('.shipping-value').simulateClick('click');
		        // Frete Gratis //

				$('.Cor').addClass('col-md-6 col-xs-12');
				$('.Cor').insertBefore('.selecao-sku .quantidade');
				$('.btn-tabelaMedidas').insertBefore('.sku-selector-container .Tamanho');

		        // Script Mudando regulamento de lugar
		        	$('#caracteristicas table.Regra').appendTo('.reg-conteudo');
		        // Script Mudando regulamento de lugar END

				});
			} catch(e) {}

			try {
				$document.ajaxStop(function() {
					$('#szb_btn').insertAfter('ul.Tamanho');
					$('#szb_size_chart').appendTo('.medidas');

					$('.btn-tabelaMedidas').on('click', function(e){
						$('#szb_size_chart').simulateClick();
					});

					if($('.selecao-sku label').length < 2){
						$('.topic.Cor').remove();
					};
				});
			} catch(e) {}

			// Controller Image Thumbs, Featured and SuperZoom //
				$("#___rc-p-id").each(function(index) {
					var id = $(this).attr("value");
					var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

					$.getJSON(data, function(data) {
						$.each(data, function(key, val) {
							var elements = val.items[0].images;

							$(elements).each(function(data, val){
								// Take Image Thumbs //
									var myLabel = val.imageLabel;
									var myImageID = val.imageId;
									var myImageName = val.imageText;
									$('<li class="'+myLabel+'"><a href="/arquivos/ids/'+myImageID+'-1250-1250/'+myImageName+'.jpg" data-standard="/arquivos/ids/'+myImageID+'-600-600/'+myImageName+'.jpg"><img src="/arquivos/ids/'+myImageID+'-170-170/'+myImageName+'.jpg" /></a></li>').appendTo('ul.thumbnails');
								// Take Image Thumbs //

								var myFirst = $('.thumbnails li').first();
								myFirst.addClass('first-thumb');

								var firstThumbStand = $('.thumbnails li.first-thumb a').attr('data-standard');
								var firstThumbLink = $('.thumbnails li.first-thumb a').attr('href');
								var firstThumbEx = $('<a href="'+firstThumbLink+'"><img src="'+firstThumbStand+'"/></a>');
								firstThumbEx.appendTo('.easyzoom');
								$('.easyzoom a:first-of-type').nextAll().remove();

								// Instantiate EasyZoom instances
								var $easyzoom = $('.easyzoom').easyZoom();

								// Setup thumbnails example
								var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
								$('.thumbnails').on('click', 'a', function(e) {
									var $this = $(this);
									e.preventDefault();
									// Use EasyZoom's `swap` method
									api1.swap($this.data('standard'), $this.attr('href'));
								});
							});
						});
					});
				});
			// Controller Image Thumbs, Featured and SuperZoom //

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
