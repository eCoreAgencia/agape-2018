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
		  var myNew = $('<span class="txt-sz-16 shelfBestPrice txt-gray">ou '+myOld+' à vista</span>');
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
  
	  $('.footer-middle h3').on('click', function(event){
	  	  $(this).toggleClass('active');
		  $(this).next().slideToggle();
	  });

	  $('.options button').on('click', function(event){
		$('body').removeClass('opacity-active');
		$('.search-box .btn-buscar').simulateClick('click');
	  });

	  var myWidth = $('body').width();
	  $('.search-box').css('width', myWidth+'px');

	  $('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.75 258.75" width="35" height="35"><g fill="#fff"><circle cx="129.375" cy="60" r="60"></circle><path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z"></path></g></svg>').insertBefore('body.orders .txt-center');
	  $('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.75 258.75" width="35" height="35"><g fill="#fff"><circle cx="129.375" cy="60" r="60"></circle><path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z"></path></g></svg>').insertBefore('.profile-detail-display h4');
	  $('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.053 512.053" width="35" height="35"><path d="M365.027 44.5c-30-29.667-66.333-44.5-109-44.5s-79 14.833-109 44.5-45 65.5-45 107.5c0 25.333 12.833 67.667 38.5 127 25.667 59.334 51.333 113.334 77 162s38.5 72.334 38.5 71c4-7.334 9.5-17.334 16.5-30s19.333-36.5 37-71.5 33.167-67.166 46.5-96.5c13.334-29.332 25.667-59.667 37-91s17-55 17-71c0-42-15-77.833-45-107.5zm-76 139.5c-9.333 9.333-20.5 14-33.5 14s-24.167-4.667-33.5-14-14-20.5-14-33.5 4.667-24 14-33 20.5-13.5 33.5-13.5 24.167 4.5 33.5 13.5 14 20 14 33-4.667 24.167-14 33.5z" fill="#f68026"/></svg>').insertBefore('.address-display-block h4');

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

		body.on('click', 'ul.Tamanho .skuList label', function(event){
			if($(this).hasClass('item_unavaliable')){
				$('body').addClass('item_unavaliable');
			} else {
				$('body').removeClass('item_unavaliable');
			}
		});

	  // Color Sku not addClass Checked because is not the primary SKU element. Adding to work validation //
		  body.on('click', '.Cor .skuList label', function(event){
		      $('<div class="lds-heart active"><div></div></div>').insertBefore('.slider ul');
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
					$('ul.Tamanho .error-picked').remove();
					$('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
				  }
  
				  if($('ul.Cor label.checked').length == 0){
					$('body.produto ul.Cor .skuList label').addClass('error');
					$('ul.Cor .error-picked').remove();
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
					  $('ul.Tamanho .error-picked').remove();
					  $('<span class="error-picked">Selecione o tamanho</span>').insertAfter('ul.Tamanho li.specification');
				  }
  
				  if($('ul.Cor label.checked').length == 0){
					  $('body.produto ul.Cor .skuList label').addClass('error');
					  $('ul.Cor .error-picked').remove();
					  $('<span class="error-picked">Selecione a cor</span>').insertAfter('ul.Cor li.specification');
				  }
				  
				  document.querySelector('#id3').scrollIntoView({ 
					  behavior: 'smooth' 
				  });
			  } else {
				var myBtLink = $('.buy-box .buy-button').attr('href');
				  
				$.get(myBtLink, function(data) {
					vtexjs.checkout.getOrderForm().done(function(orderForm) {
						console.log(orderForm);
						
						var elements = orderForm.items;
						$(elements).each(function(orderForm, val){
							var tempPrice = val.formattedPrice;
							var tempImage = val.imageUrl;
							var tempName = val.name;
							
							$('.sta-cart-items ul li.fake-insert').remove();
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
  
  
	  // Ajuste Meus Pedidos //
		  if (orderList.length > 0) {
			  orderList.find('link').remove();
			  orderList.find('.page-header').unwrap('.container');
		  }
	  // Ajuste Meus Pedidos //

  
	  // Remocao de Li HelperComplement Prateleira //
		  if ($('.helperComplement').length) {
			  $('.helperComplement').remove();
		  }
	  // Remocao de Li HelperComplement Prateleira //
  
	  // Busca Mob //

		  var svgSearch = $('.search-toggle svg').clone();
		  svgSearch.insertBefore('.btn-buscar');

		  $(".search-toggle").click(function() {
			  $(".search-box ").toggleClass("active");
			  $('main').toggleClass('search-active');
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
				arrows: false,
				dots: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});

			$('body.home .slider').find('.prateleira ul').slick({
				arrows: false,
				dots: true,
				draggable: true,
				touchMove: true,
				autoplay: false,
				slidesToShow: 2,
				mobileFirst: true,
				slidesToScroll: 1,
				adaptiveHeight: true
			});
			
			$('body.busca-vazia .slider').find('.prateleira ul').slick({
				arrows: false,
				dots: true,
				draggable: true,
				touchMove: true,
				autoplay: false,
				slidesToShow: 2,
				mobileFirst: true,
				slidesToScroll: 1,
				adaptiveHeight: true
			});

			$('body.home .slider-escolha-por-santos').find('ul').slick({
				arrows: false,
				dots: true,
				draggable: true,
				touchMove: true,
				autoplay: false,
				slidesToShow: 1,
				mobileFirst: true,
				slidesToScroll: 1,
				adaptiveHeight: true
			});
		// Slider
	  //

	  $('.js-open-mobile-menu').click(function(){
		  var self = $(this);
		  $(this).toggleClass('active');
		  $('body').toggleClass('menu-active');
		  $('body').removeClass('opacity-active');
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

	// Open submenu mobile //
		$(".first-menu").click(function() {
			$(this).toggleClass("active");
			$(this).next().toggleClass("active");
		});
	// Open submenu mobile //
  
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
				$('.compra-persistente-bt').on('click', function(event){
					var myBtLink = $('.buy-box .buy-button');
					if($(myBtLink).attr('href') == "javascript:alert('Por favor, selecione o modelo desejado.');" ) {
						$('.close-bt-opacity').toggleClass('active');
						$('body').toggleClass('opacity-active');
						document.querySelector('#id3').scrollIntoView({ 
							behavior: 'smooth' 
						});
					} else {
						$('.bt-comprar').simulateClick('click');
					}
				});				

				$('.close-bt-opacity').on('click', function(event){
					$('body').removeClass('opacity-active');
					$(this).removeClass('active');
				});

				$('.opacity-all').on('click', function(event){
					$('body').removeClass('opacity-active');
					$('.close-bt-opacity').removeClass('active');
				});

				$('.skuList label').on('click', function(event){
					$('body').removeClass('opacity-active');
					$('.close-bt-opacity').removeClass('active');
				});

				$(function(){
					var stickyHeaderTop = $('.troca').offset().top;
					$(window).scroll(function(){
						if( $(window).scrollTop() > stickyHeaderTop-85 ) {
							$('.compra-persistente-bt').addClass('active');  
						} else {
							$('.compra-persistente-bt').removeClass('active');
						}
					});
				});

			  try {
				  $document.ready(function() {
  
				  $('label.prefixo input').insertAfter('label.prefixo');
				  $('label.prefixo').text('Calcule o frete');
				  
				  // Frete Gratis //
					  $('.shipping-value').simulateClick('click');
				  // Frete Gratis //
  
				  $('ul.Cor').addClass('col-xs-12');
				  $('ul.Cor').insertAfter('ul.Tamanho');
				  $('.btn-tabelaMedidas').insertBefore('.sku-selector-container .Tamanho');
  
				  // Script Mudando regulamento de lugar
					  $('#caracteristicas table.Regra').appendTo('.reg-conteudo');
				  // Script Mudando regulamento de lugar END
  
				  });
			  } catch(e) {}
  

			  $('.troca .section-title, .descricao .section-title, .especificacoes .section-title').each(function(){
				  $(this).next().hide();
			  });

			  $('.troca .section-title, .descricao .section-title, .especificacoes .section-title').on('click', function(event){
				$(this).toggleClass('active');
				$(this).next().slideToggle();
			  });

			  try {
				  $document.ajaxStop(function() {
					  $('#szb_btn').insertAfter('ul.Tamanho');
					  $('#szb_size_chart').appendTo('.medidas');
  
					  $('.btn-tabelaMedidas').on('click', function(e){
						  $('#szb_size_chart').simulateClick();
					  });
  
					  $('.freight-btn').val('Ok');
  
					  $('.freight-btn').on('click', function(event){
						  // Mounting Loader //
						  $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore('.freight-values');
						  // Mounting Loader //
  
						  $('.spinner').fadeOut('6000');
					  });
  
					  $('label.prefixo input').insertAfter('label.prefixo');
					  $('label.prefixo').text('Calcule o frete');
				  });
			  } catch(e) {}
  
			  $('.produtos-similares .prateleira ul').slick({
				autoplay: false,
				arrows: false,
				dots: true,
				draggable: true,
				touchMove: true,
				slidesToShow: 2,
				slidesToScroll: 1
			 });

			 $('.produtos-similares ul.slick-dots').insertAfter('.produtos-similares .slick-slider');

			  // Controller Image Thumbs, Featured //
				  $("#___rc-p-id").each(function(index) {
					  var id = $(this).attr("value");
					  var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";
  
					  $.getJSON(data, function(data) {
						  $.each(data, function(key, val) {
							  var elements = val.items[0].images;
							  $(elements).each(function(data, val){
								// Take Images //
									var myImageID = val.imageId;
									var myImageName = val.imageText;
									$('<li><img src="/arquivos/ids/'+myImageID+'-650-650/'+myImageName+'.jpg" /></li>').appendTo('.ProductImage .slider ul');
								// Take Images //
							});
						});

						$('.ProductImage .slider ul').slick({
							autoplay: false,
							arrows: false,
							dots: true,
							draggable: true,
							touchMove: true,
							slidesToShow: 1,
							slidesToScroll: 1
						});
					  });
				  });
			  // Controller Image Thumbs, Featured //
  
			// Change Pic //
				body.on('click', '.Cor .skuList label', function(event){
					$('<div class="lds-heart active"><div></div></div>').insertBefore('.slider ul');
					$('.Cor .skuList label').removeClass('checked');
					$(this).addClass('checked');

					$('.ProductImage .slider ul').remove();
					$('<ul></ul>').appendTo('.ProductImage .slider');

					window.currentColor = $(this).text();
					console.log(currentColor);
					var x = "";

					var id = $('#___rc-p-id').attr("value");
					var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

					$.getJSON(data, function(data) {
						$.each(data, function(key, val) {
							var elements = val.items;
							$(elements).each(function(i, items, key, val){
								if(elements[i].Cor == currentColor) {
									window.me = $(this);
									var colors = elements[i];
								}
							});

							var changeColor = me[0].images;

							$(changeColor).each(function(data, val){
								// Take Images //
									var myImageID = val.imageId;
									var myImageName = val.imageText;
									$('<li><img src="/arquivos/ids/'+myImageID+'-650-650/'+myImageName+'.jpg" /></li>').appendTo('.ProductImage .slider ul');
								// Take Images //
							});

							$('.lds-heart').remove();

							$('.ProductImage .slider ul').slick({
								autoplay: false,
								arrows: false,
								dots: true,
								draggable: true,
								touchMove: true,
								slidesToShow: 1,
								slidesToScroll: 1
							});
						});
					});
				});
			// Change Pic //
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
  
			  priceStatus();

			var showFilters = __element({type: 'button', class: 'filtrarProdutos', name: 'filtrarProdutos', content: 'Filtrar produtos'});
			$('.mainShelf .main .sub').prepend(showFilters);

			$('.filtrarProdutos').click(function(){
				$('.sidebar').toggleClass('active');
				$('body').toggleClass('menu-active');
				$('.filtrarProdutos').toggleClass('active');
				$('.opacity-filter').toggleClass('active');
			});

			$('.menuClose').click(function(){
				$('.sidebar').removeClass('active');
				$('body').removeClass('menu-active');
				$('.opacity-filter').removeClass('active');
				$('.filtrarProdutos').removeClass('active');
			});
			
			$('.search-single-navigator, .search-multiple-navigator').find('fieldset').on('click', 'h5',function(){
				$(this).toggleClass('active');
				$(this).next().toggleClass('active');
			});
			$('.search-single-navigator, .search-multiple-navigator').find('input[type="checkbox"]:checked').parent().addClass('active');
			$('.search-single-navigator, .search-multiple-navigator').find('input[type="checkbox"]').on('change',function(){
				this.parentNode.classList[((this.checked)? 'add':'remove')]('active')
			});

			$('.resultado-busca-filtro .orderBy').first().insertBefore('.navigation-tabs');

		  }
		// Scripts Departamento //
  
		if($('body.busca-vazia').length > 0){
			$('.sidebar .navigation').addClass('navigation-tabs');
			$('.sidebar .navigation-tabs').removeClass('navigation');
			$('.resultado-busca-filtro .orderBy').first().insertBefore('.navigation-tabs');
		}

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
  
		  $(document).ready(function(){
			$('.resultado-busca-filtro .orderBy').first().insertAfter('.filtrarProdutos');
		  });

		  $(document).ajaxComplete(function(){
			$('.box-item').each(function(){
				$('.lds-heart').remove();
			});
		  });

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
  