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


(function () {
	var method;
	var noop = function () {};
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

	var __ec_dataEach = function (props) {
		var el = '';
		if (props.data) {
			$.each(props.data, function (index, value) {
				el += ' data-' + value.name + '="' + value.id + '"';
			});
		}
		return el;
	}

	var __ec_propsComun = function (props) {
		var el = '';
		el += (props.id) ? ' id="' + props.id + '"' : '';
		el += (props.class) ? ' class="' + props.class + '"' : '';
		el += (props.style) ? ' style="' + props.style + '"' : '';
		return el;
	}

	var __ec_img = function (props) {
		var img = '\n' + '<img';
		img += __ec_dataEach(props);
		img += __ec_propsComun(props);
		img += ' src="' + props.src + '" ';
		img += (props.title) ? ' title="' + props.title + '" ' : '';
		img += (props.title) ? ' alt="' + props.title + '" ' : '';
		img += (props.width) ? ' width="' + props.width + '" ' : '';
		img += (props.height) ? ' height="' + props.height + '"' : '';
		img += '/>';
		return img;
	}

	var __ec_element = function (props) {
		if (props.type == 'img') {
			return __ec_img(props);
		}
		var el = "";
		el += "\n<" + props.type;
		el += __ec_dataEach(props);
		el += __ec_propsComun({
			id: props.id,
			class: props.class,
			style: props.style
		});
		el += '>';
		el += (props.content) ? props.content : '';
		el += "</" + props.type + ">" + '\n';

		return el;
	}


	window.__ec_img = __ec_img;
	window.__ec_propsComun = __ec_propsComun;
	window.__ec_dataEach = __ec_dataEach;
	window.__element = __ec_element;

}(window, document, jQuery));


// element //

jQuery.fn.simulateClick = function () {
	return this.each(function () {
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

function setFlags() {
	$('.the-flags').each(function () {
		var qtdDesconto = $(this).text().replace('%', '');
		qtdDesconto = parseInt(qtdDesconto);
		if (qtdDesconto == 0) {
			$(this).hide();
		}
		$(this).text(' ').html(qtdDesconto + "% </br> <span>OFF</span>");
	});
}

// function priceStatus() {
// 	$('.prateleira .shelfItem').each(function () {
// 		var me = $(this);

// 		var myDrop = $(this).find('.drop');
// 		var myOldBox = $(this).find('.shelfOldPrice');
// 		var myOld = $(this).find('.shelfOldPrice').text();
// 		var myNew = $('<span style="display: block;" class="txt-sz-16 shelfBestPrice txt-gray">ou ' + myOld + ' à vista</span>');
// 		var myBest = $(this).find('.shelfBestPrice');
// 		var myInstallments = $(this).find('.shelfInstallment');

// 		if ($(myBest).length == 0) {
// 			// COLOCA PRECO A VISTA A MOSTRA SE NAO TEM BEST PRICE
// 			$('.drop .shelfOldPrice.txt-sz-22').addClass("precoCash");
// 			$('.precoCash').css({
// 				"display": "block",
// 				"color": "#201e1e"
// 			});
// 			myDrop.css('margin-top', '-4px');
// 			myNew.insertAfter(myInstallments);
// 			myInstallments.css('border', 'none');
// 			myInstallments.css('padding-left', '0');
// 		}
// 	});
// }

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
	sidebar = $('.sidebar'),
	santos = $('.escolha-por-santos li');

$(function () {

	setFlags();

	if ($('.search-multiple-navigator').length > 0) {
		$('.search-multiple-navigator').next().remove();
	}

	$('.prateleira li').each(function (event) {
		var me = $(this);
		var bestPrice = me.find('.shelfBestPrice');

		// priceStatus();

		if ($(bestPrice).length == 0) {
			me.find('.shelfOldPrice').removeClass('ln-through');
		}
	});

	$('.img-box img.element-1').addClass('active');
	$('.escolha-por-santos li').each(function () {
		$(this).on('hover', function () {
			var wicth = $(this).attr('class');
			$('.img-box img.' + wicth + '').prependTo('.img-box');
			$(this).removeClass('active');
			$('.img-box img').first().addClass('active');
		});
	});

	// Color Sku not addClass Checked because is not the primary SKU element. Adding to work validation //
	body.on('click', '.Cor .skuList label', function (event) {
		$('.Cor .skuList label').removeClass('checked');
		$(this).addClass('checked');

		window.currentColor = $(this).text();
		console.log(currentColor);

		var id = $('#___rc-p-id').attr("value");
		var data = "/api/catalog_system/pub/products/search/?fq=productId:" + id + "";

		$.getJSON(data, function (data) {
			$.each(data, function (key, val) {
				var elements = val.items;

				$(elements).each(function (i, items, key, val) {
					var colors = elements[i].Cor == currentColor;

					if ($(colors).length == true) {
						console.log(this);
					}
				});
			});
		});
	});
	// Color Sku not addClass Checked because is not the primary SKU element. Adding to work validation //

	// Add to Cart Button //
	body.on('click', '.add-to-cart', function (event) {
		var myBt = $('.buy-box .buy-button');
		if ($(myBt).attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');") {

			if ($('ul.Tamanho label.checked').length == 0) {
				$('body.produto ul.Tamanho .skuList label').addClass('error');
				$('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
			}

			if ($('ul.Cor label.checked').length == 0) {
				$('body.produto ul.Cor .skuList label').addClass('error');
				$('<span class="error-picked">Selecione a cor</span>').insertAfter('ul.Cor li.specification');
			}

			document.querySelector('#id3').scrollIntoView({
				behavior: 'smooth'
			});
		} else {
			var myBtLink = $('.buy-box .buy-button').attr('href');
			$('#mini-cart').simulateClick('click');

			$.get(myBtLink, function (data) {
				vtexjs.checkout.getOrderForm().done(function (orderForm) {
					console.log(orderForm);
					$("body").vtexcart({
						wrapper: $(".container"),
						effect: "overlay",
						cartButton: $(".sta-cart")
					})
				});
			});
		}
	});

	$('.skuList input.item_unavaliable').on('click', function (event) {
		$('.bt-comprar').next().show();
	});

	body.on('click', '.bt-comprar', function (event) {
		var myBt = $('.buy-box .buy-button');
		if ($(myBt).attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');") {
			if ($('ul.Tamanho label.checked').length == 0) {
				$('body.produto ul.Tamanho .skuList label').addClass('error');
				$('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
			}

			if ($('ul.Cor label.checked').length == 0) {
				$('body.produto ul.Cor .skuList label').addClass('error');
				$('<span class="error-picked">Selecione a cor</span>').insertAfter('ul.Cor li.specification');
			}

			document.querySelector('#id3').scrollIntoView({
				behavior: 'smooth'
			});
		} else {
			$(myBt).simulateClick('click');
		}
	});

	body.on('click', 'ul.Tamanho .skuList label', function (event) {
		$('ul.Tamanho .error-picked').remove();
		$('ul.Tamanho .skuList label').removeClass('error');
	});

	body.on('click', 'ul.Cor .skuList label', function (event) {
		$('ul.Cor .error-picked').remove();
		$('ul.Cor .skuList label').removeClass('error');
	});

	// Add to Cart Button //

	// Scripts Modal //
	// Close Modal //
	$('.close-modal, .opacity-modal').click(function (event) {
		$('body').removeClass('modal-active');
		$('body').removeClass('newsletter-active');
		$('body').removeClass('sku-unavaiable');
		$('body').removeClass('add-to-cart-active');
		$('body').removeClass('product-popup');
		$('.new-modal-content').remove();
	});

	$(document).keyup(function (ev) {
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
	if ($('body.account').length > 0) {

	} else {
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= 350) {
				$('header').addClass('menu-persistente');
				$('body').addClass('top-height-active');
			} else {
				$('header').removeClass('menu-persistente');
				$('body').removeClass('top-height-active');
			}
		});
	}
	// Menu Persistente END //

	// Remocao de Li HelperComplement Prateleira //
	if ($('.helperComplement').length) {
		$('.helperComplement').remove();
	}
	// Remocao de Li HelperComplement Prateleira //

	// Busca Mob //
	$(".search-toggle").click(function () {
		$(".search-box ").toggleClass("active");
	});
	// Busca Mob //


	// Voltar ao Topo //
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();

		if (scroll >= 450) {
			$('.js-back-to-top').addClass('active');
		} else {
			$('.js-back-to-top').removeClass('active');
		}
	});

	body.on('click', '.js-back-to-top', function (event) {
		event.preventDefault();
		htmlBody.animate({
			scrollTop: 0
		}, 300);
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
		slidesToShow: 3,
		mobileFirst: true,
		slidesToScroll: 3,
		prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 46.02 46.02"><path d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z" fill="#FFF"/></svg></button>',
		adaptiveHeight: true,
		responsive: [{
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

	//
	$('.js-open-mobile-menu').click(function () {
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

	var mountBread = function () {
		var bCrumb = $(".bread-crumb li").length;
		if (bCrumb <= 2) {
			$(".bread-crumb-box .text1").html();
			$(".bread-crumb-box .text2").html($(".bread-crumb li:last-child").text());
		} else {
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
				elemLoading: '<i class="shelf__loading"></i>',
				filterScrollTop: function (shelfOffset) {
					return 20;
				}
			});
		} catch (e) {}
	}
	// Smart Research //

	if ($(pagInstitucional).length > 0) {

		// Slide Toggle itens
		$(".tab span").click(function () {
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		});
		// Slide Toggle itens //

	}

	// Scripts Pagina de Produto //
	if (pagProduto.length > 0) {
		try {
			$document.ready(function () {

				$('label.prefixo input').insertAfter('label.prefixo');
				$('label.prefixo').text('Calcule o frete');

				// Frete Gratis //
				$('.shipping-value').simulateClick('click');
				// Frete Gratis //

				$('ul.Cor').addClass('col-md-4 col-xs-12');
				$('ul.Cor').insertAfter('ul.Tamanho');
				$('ul.Tamanho').addClass('col-md-8 col-xs-12');
				$('.btn-tabelaMedidas').insertAfter('.sku-selector-container .Cor');

				// Script Mudando regulamento de lugar
				$('#caracteristicas table.Regra').appendTo('.reg-conteudo');
				// Script Mudando regulamento de lugar END

			});
		} catch (e) {}

		try {
			$document.ajaxStop(function () {
				$('#szb_btn').insertAfter('ul.Cor');
				$('#szb_size_chart').appendTo('.medidas');

				$('.btn-tabelaMedidas').on('click', function (e) {
					$('#szb_size_chart').simulateClick();
				});

				$('.freight-btn').val('Calcular');

				$('.freight-btn').on('click', function (event) {
					// Mounting Loader //
					$('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore('.freight-values');
					// Mounting Loader //

					$('.spinner').fadeOut('6000');
				});

				$('label.prefixo input').insertAfter('label.prefixo');
				$('label.prefixo').text('Calcule o frete');
			});
		} catch (e) {}

		// Controller Image Thumbs, Featured and SuperZoom //
		$("#___rc-p-id").each(function (index) {
			var id = $(this).attr("value");
			var data = "/api/catalog_system/pub/products/search/?fq=productId:" + id + "";

			$.getJSON(data, function (data) {
				$.each(data, function (key, val) {
					var elements = val.items[0].images;

					$(elements).each(function (data, val) {
						// Take Image Thumbs //
						var myLabel = val.imageLabel;
						var myImageID = val.imageId;
						var myImageName = val.imageText;
						$('<li class="' + myLabel + '"><a href="/arquivos/ids/' + myImageID + '-1250-1250/' + myImageName + '.jpg" data-standard="/arquivos/ids/' + myImageID + '-600-600/' + myImageName + '.jpg"><img src="/arquivos/ids/' + myImageID + '-170-170/' + myImageName + '.jpg" /></a></li>').appendTo('ul.thumbnails');
						// Take Image Thumbs //

						var myFirst = $('.thumbnails li').first();
						myFirst.addClass('first-thumb');

						var firstThumbStand = $('.thumbnails li.first-thumb a').attr('data-standard');
						var firstThumbLink = $('.thumbnails li.first-thumb a').attr('href');
						var firstThumbEx = $('<a href="' + firstThumbLink + '"><img src="' + firstThumbStand + '"/></a>');
						firstThumbEx.appendTo('.easyzoom');
						$('.easyzoom a:first-of-type').nextAll().remove();

						// Instantiate EasyZoom instances
						var $easyzoom = $('.easyzoom').easyZoom();

						// Setup thumbnails example
						var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
						$('.thumbnails').on('click', 'a', function (e) {
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

		// Change Pic //
		body.on('click', '.Cor .skuList label', function (event) {
			$('.Cor .skuList label').removeClass('checked');
			$(this).addClass('checked');

			$('.thumbnails li').remove();
			$('.easyzoom a').remove();

			window.currentColor = $(this).text();
			console.log(currentColor);
			var x = "";

			var id = $('#___rc-p-id').attr("value");
			var data = "/api/catalog_system/pub/products/search/?fq=productId:" + id + "";

			$.getJSON(data, function (data) {
				$.each(data, function (key, val) {
					var elements = val.items;
					$(elements).each(function (i, items, key, val) {
						if (elements[i].Cor == currentColor) {
							window.me = $(this);
							var colors = elements[i];
						}
					});

					var changeColor = me[0].images;

					$(changeColor).each(function (data, val) {

						// Take Image Thumbs //
						var myLabel = val.imageLabel;
						var myImageID = val.imageId;
						var myImageName = val.imageText;
						$('<li class="' + myLabel + '"><a href="/arquivos/ids/' + myImageID + '-1250-1250/' + myImageName + '.jpg" data-standard="/arquivos/ids/' + myImageID + '-600-600/' + myImageName + '.jpg"><img src="/arquivos/ids/' + myImageID + '-170-170/' + myImageName + '.jpg" /></a></li>').appendTo('ul.thumbnails');
						// Take Image Thumbs //

						var myFirst = $('.thumbnails li').first();
						myFirst.addClass('first-thumb');

						var firstThumbStand = $('.thumbnails li.first-thumb a').attr('data-standard');
						var firstThumbLink = $('.thumbnails li.first-thumb a').attr('href');
						var firstThumbEx = $('<a href="' + firstThumbLink + '"><img src="' + firstThumbStand + '"/></a>');
						firstThumbEx.appendTo('.easyzoom');
						$('.easyzoom a:first-of-type').nextAll().remove();

						// Instantiate EasyZoom instances
						var $easyzoom = $('.easyzoom').easyZoom();

						// Setup thumbnails example
						var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
						$('.thumbnails').on('click', 'a', function (e) {
							var $this = $(this);
							e.preventDefault();
							// Use EasyZoom's `swap` method
							api1.swap($this.data('standard'), $this.attr('href'));
						});

						var firstItem = $('.thumbnails li').first().find('a');
						firstItem.simulateClick('click');
					});
				});
			});
		});
		// Change Pic //

	}
	// Scripts Pagina de Produto //


	// Scripts Departamento //
	if ($(depCatBus).length > 0) {
		// Adicionando classe nos elementos do Ordernar Por quando ativos
		if (window.location.href.indexOf("OrderByTopSaleDESC") != -1) {
			$(".main-category__orderBy li:nth-child(2) a").addClass("active");
		}
		if (window.location.href.indexOf("OrderByReleaseDateDESC") != -1) {
			$(".main-category__orderBy li:nth-child(3) a").addClass("active");
		}
		if (window.location.href.indexOf("OrderByPriceDESC") != -1) {
			$(".main-category__orderBy li:nth-child(4) a").addClass("active");
		}
		if (window.location.href.indexOf("OrderByPriceASC") != -1) {
			$(".main-category__orderBy li:nth-child(5) a").addClass("active");
		}
		// Adicionando classe nos elementos do Ordernar Por quando ativos

		$('.resultado-busca-filtro .orderBy').first().insertBefore('.navigation-tabs');
		$('.resultado-busca-filtro .orderBy').last().hide();

		// priceStatus();
	}

	if ($('body.busca-vazia').length > 0) {
		$('.sidebar .navigation').addClass('navigation-tabs');
		$('.sidebar .navigation-tabs').removeClass('navigation');
		$('.resultado-busca-filtro .orderBy').first().insertBefore('.navigation-tabs');
		$('.resultado-busca-filtro .orderBy').last().hide();
	}
	// Scripts Departamento //

	// Scripts Modal //
	// Open Modal //
	// Open Modal //
	$('.call_modal').click(function () {
		$('.tabelas').fadeIn(200);
		$('.bg_modal').fadeIn(600);
		$('body').addClass('modal_active');
	});
	// Open Modal //

	// Close Modal //
	$('.close_modal, .bg_modal').click(function () {
		$('.tabelas').fadeOut(600);
		$('.bg_modal').fadeOut(600);
		$('body').removeClass('modal_active');
		$('.modal_loader').remove(); // remove o conteudo do modal ao fechar
	});
	$(document).keyup(function (ev) {
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
		$document.ajaxStop(function () {
			orderList.parents('html').removeClass('is-loading');
		});
	} catch (e) {}
	// Remocao Loading Meus Pedidos//

	// fadeInOut
	function fadeInOut(item) {
		item.fadeIn(1000).delay(3000).fadeOut(1000, function () {
			if (item.next().length) {
				fadeInOut(item.next());
			} else {
				fadeInOut(item.siblings(':first'));
			}
		});

	}
	if ($("body").hasClass('home')) {
		var tipBar = function (s) {
			if (typeof window.screen.orientation !== 'undefined' && s <= 768) {
				fadeInOut(jQuery('.tipBar ul li:first-child'));
			}
		}
		tipBar(window.screen.width);
		$(window).on('resize', function () {
			tipBar(window.screen.width)
		});
	}


	// CORRECOES 

	// SE TEM 2 ITEMS NO SLIDER WIDTH AUTO
	// var hasTwoInTheSlider = $('.slick-track li');
	// $(hasTwoInTheSlider).each(function (e) {
	// 	if (e <= 2) {
	// 		$(this).parents('ul').slick('unslick');
	// 	}
	// });




});
