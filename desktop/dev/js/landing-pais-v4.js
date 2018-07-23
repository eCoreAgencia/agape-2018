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

function setFlags() {
    $('.the-flags').each(function() {
        var qtdDesconto = $(this).text().replace('%', '');
        qtdDesconto = parseInt(qtdDesconto);
        if (qtdDesconto == 0) {
            $(this).hide();
        }
        $(this).text(' ').html(qtdDesconto + "% </br> <span>OFF</span>");
    });
}

function priceStatus() {
	$('.prateleira .shelfItem').each(function(){
		var me = $(this);

		var myDrop = $(this).find('.drop');
		var myOldBox = $(this).find('.shelfOldPrice');
		var myOld = $(this).find('.shelfOldPrice').text();
		var myNew = $('<span style="display: block;" class="txt-sz-16 shelfBestPrice txt-gray">ou '+myOld+' à vista</span>');
		var myBest = $(this).find('.shelfBestPrice');
		var myInstallments = $(this).find('.shelfInstallment');

		if($(myBest).length == 0){
			myOldBox.hide();
			myDrop.css('margin-top', '-4px');
			myNew.insertAfter(myInstallments);
			myInstallments.css('border', 'none');
			myInstallments.css('padding-left', '0');
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
	sidebar = $('.sidebar'),
	santos = $('.escolha-por-santos li');

$(function() {
	
	setFlags();

	if($('.search-multiple-navigator').length > 0){
		$('.search-multiple-navigator').next().remove();
	}

	$('.prateleira li').each(function(event){
		var me = $(this);
		var bestPrice = me.find('.shelfBestPrice');
		
		priceStatus();
		
		if($(bestPrice).length == 0){
			me.find('.shelfOldPrice').removeClass('ln-through');		
		}
	});

	$('.img-box img.element-1').addClass('active');
	$('.escolha-por-santos li').each(function(){
		$(this).on('hover', function(){
			var wicth = $(this).attr('class');
			$('.img-box img.'+wicth+'').prependTo('.img-box');
			$(this).removeClass('active');
			$('.img-box img').first().addClass('active');
		});
	});

	// Color Sku not addClass Checked because is not the primary SKU element. Adding to work validation //
		body.on('click', '.Cor .skuList label', function(event){
			$('.Cor .skuList label').removeClass('checked');
			$(this).addClass('checked');

			window.currentColor = $(this).text();
			console.log(currentColor);

			var id = $('#___rc-p-id').attr("value");
			var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

			$.getJSON(data, function(data) {
				$.each(data, function(key, val) {
					var elements = val.items;

					$(elements).each(function(i, items, key, val){
						var colors = elements[i].Cor == currentColor;

						if($(colors).length == true){
							console.log(this);
						}
					});
				});
			});
		});
	// Color Sku not addClass Checked because is not the primary SKU element. Adding to work validation //

	// Add to Cart Button //
		body.on('click', '.add-to-cart', function(event){
			var myBt = $('.buy-box .buy-button');
			if($(myBt).attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');" ) {
				
				if($('ul.Tamanho label.checked').length == 0){
					$('body.produto ul.Tamanho .skuList label').addClass('error');
					$('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
				}

				if($('ul.Cor label.checked').length == 0){
					$('body.produto ul.Cor .skuList label').addClass('error');
					$('<span class="error-picked">Selecione a cor</span>').insertAfter('ul.Cor li.specification');
				}
				
				document.querySelector('#id3').scrollIntoView({ 
					behavior: 'smooth' 
				});
			} else {
				var myBtLink = $('.buy-box .buy-button').attr('href');
				$('#mini-cart').simulateClick('click');
				
				$.get(myBtLink, function(data) {
					vtexjs.checkout.getOrderForm().done(function(orderForm) {
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

		$('.skuList input.item_unavaliable').on('click', function(event){
			$('.bt-comprar').next().show();
		});

		body.on('click', '.bt-comprar', function(event){
			var myBt = $('.buy-box .buy-button');
			if($(myBt).attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');" ) {
				if($('ul.Tamanho label.checked').length == 0){
					$('body.produto ul.Tamanho .skuList label').addClass('error');
					$('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
				}

				if($('ul.Cor label.checked').length == 0){
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

		body.on('click', 'ul.Tamanho .skuList label', function(event){
			$('ul.Tamanho .error-picked').remove();
			$('ul.Tamanho .skuList label').removeClass('error');
		});

		body.on('click', 'ul.Cor .skuList label', function(event){
			$('ul.Cor .error-picked').remove();
			$('ul.Cor .skuList label').removeClass('error');
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

	$('.fulltext-search-box').val('O que você procura?');

	// Menu Persistente Begin //
		if($('body.account').length > 0){

		} else {
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
		}
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
			prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" width="40" height="40"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" fill="#ffffff"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" width="40" height="40"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" fill="#ffffff"/></svg></button>',
			slidesToScroll: 1
        });
        
        $('.shelf-pais.slider').find('.prateleira > ul').slick({
            dots: true,
            arrows: true,
            draggable: true,
            touchMove: true,
            autoplay: false,
            slidesToShow: 4,
            mobileFirst: true,
            slidesToScroll: 4,
            prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" width="40" height="40"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" fill="#404f90"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175" width="40" height="40"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z" fill="#404f90"/></svg></button>',
            adaptiveHeight: true,
        });
		
	// Slider 

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
    
    $('#sugestoes-button').on('click', function(event){
        document.querySelector('.vestido-com-devocao').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

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

});
