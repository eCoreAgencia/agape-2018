!function(window,document,$){"use strict";var __ec_dataEach=function(props){var el="";return props.data&&$.each(props.data,function(index,value){el+=" data-"+value.name+'="'+value.id+'"'}),el},__ec_propsComun=function(props){var el="";return el+=props.id?' id="'+props.id+'"':"",el+=props["class"]?' class="'+props["class"]+'"':"",el+=props.style?' style="'+props.style+'"':""},__ec_img=function(props){var img="\n<img";return img+=__ec_dataEach(props),img+=__ec_propsComun(props),img+=' src="'+props.src+'" ',img+=props.title?' title="'+props.title+'" ':"",img+=props.title?' alt="'+props.title+'" ':"",img+=props.width?' width="'+props.width+'" ':"",img+=props.height?' height="'+props.height+'"':"",img+="/>"},__ec_element=function(props){if("img"==props.type)return __ec_img(props);var el="";return el+="\n<"+props.type,el+=__ec_dataEach(props),el+=__ec_propsComun({id:props.id,"class":props["class"],style:props.style}),el+=">",el+=props.content?props.content:"",el+="</"+props.type+">\n"};window.__ec_img=__ec_img,window.__ec_propsComun=__ec_propsComun,window.__ec_dataEach=__ec_dataEach,window.__element=__ec_element}(window,document,jQuery),jQuery.fn.simulateClick=function(){return this.each(function(){if("createEvent"in document){var doc=this.ownerDocument,evt=doc.createEvent("MouseEvents");evt.initMouseEvent("click",!0,!0,doc.defaultView,1,0,0,0,0,!1,!1,!1,!1,0,null),this.dispatchEvent(evt)}else this.click()})};var body=$("body"),htmlBody=$("html, body"),$document=$(document),header=$("#header"),submenuDesktopWrapper=$(".js-submenu-wrap"),userSubmenu=$(".submenu-user"),sidePanelMobile=$(".side-panel"),mobileSubmenu=$(".submenu-mobile"),minicart=$(".minicart"),slide=$(".slide"),slideShelf=$(".slideShelf"),slideBrands=$(".slideBrands"),carousel=$(".shelf-carousel"),backToTop=$(".js-back-to-top"),shelf=$(".prateleira"),paginatedShelf=$(".prateleira[id*=ResultItems]"),orderList=$(".order-list"),formNews=$(".newsletter"),depCatBus=$(".dep-cat-bus"),pagProduto=$(".produto"),pagInstitucional=$(".institucional"),sidebar=$(".sidebar");$(function(){function fadeInOut(item){item.fadeIn(1e3).delay(3e3).fadeOut(1e3,function(){fadeInOut(item.next().length?item.next():item.siblings(":first"))})}$(".freight-btn").on("click",function(event){$('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore(".freight-values"),$(".spinner").fadeOut("6000")}),body.on("click",".add-to-cart",function(event){var url=$(".buy-button").attr("href");$(this).attr("data-link",url),"javascript:alert('Por favor, selecione o modelo desejado.');"==$(".add-to-cart").attr("data-link")?($(".modal-container").remove(".new-modal-content"),$('<div class="new-modal-content news-element success-news"><h3>É preciso escolher a variação do seu produto.</h3></div>').appendTo(".modal-container"),$("body").addClass("modal-active add-to-cart-active")):($(".sta-cart-items ul li.fake-insert").remove(),$.get(url,function(data,val){vtexjs.checkout.getOrderForm().done(function(orderForm){console.log(orderForm);var elements=orderForm.items;$(elements).each(function(orderForm,val){var tempPrice=val.formattedPrice,tempImage=val.imageUrl,tempName=val.name;$('<li class="fake-insert"><div class="sta-cart-pdt-image"></div><div class="sta-cart-pdt-info"><button class="remove-item" data-index="0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "></polygon></svg><span>remover</span></button><div class="sta-cart-pdt-qtd"></div></div></li>').appendTo(".sta-cart-items ul"),$("<img src="+tempImage+"/>").appendTo("li.fake-insert .sta-cart-pdt-image"),$("<h4>"+tempName+"</h4>").insertBefore("li.fake-insert .sta-cart-pdt-info button"),$("<p>"+tempPrice+"</p>").insertAfter("li.fake-insert .sta-cart-pdt-qtd");var tempPrice=$(".total-cart-em").text();$(".sta-cart-total strong").text(tempPrice),htmlBody.animate({scrollTop:0},300),$(".amount-items-em").simulateClick("click")})})}))}),$(".skuList input").on("click",function(event){var dataLink=$(".buy-button").attr("href");$(".add-to-cart").attr("data-link",dataLink)}),$(".close-modal, .opacity-modal").click(function(event){$("body").removeClass("modal-active"),$("body").removeClass("newsletter-active"),$("body").removeClass("sku-unavaiable"),$("body").removeClass("add-to-cart-active"),$("body").removeClass("product-popup"),$(".new-modal-content").remove()}),$(document).keyup(function(ev){27==ev.keyCode&&$("body").removeClass("modal-active"),$("body").removeClass("newsletter-active"),$("body").removeClass("add-to-cart-active"),$("body").removeClass("product-popup"),$(".new-modal-content").remove(),$("#parcelamentoModal").removeClass("active")}),orderList.length>0&&(orderList.find("link").remove(),orderList.find(".page-header").unwrap(".container")),$(".fulltext-search-box").val("O que você procura?"),$(window).scroll(function(){var scroll=$(window).scrollTop();scroll>=350?($("header").addClass("menu-persistente"),$("body").addClass("top-height-active")):($("header").removeClass("menu-persistente"),$("body").removeClass("top-height-active"))}),$(".helperComplement").length&&$(".helperComplement").remove(),$(".search-toggle").on("click",function(event){$(".search-box ").toggleClass("active")}),$(".footer-middle h3").on("click",function(event){$(this).toggleClass("active"),$(this).next().toggleClass("active")}),$(window).scroll(function(){var scroll=$(window).scrollTop();scroll>=450?$(".js-back-to-top").addClass("active"):$(".js-back-to-top").removeClass("active")}),body.on("click",".js-back-to-top",function(event){event.preventDefault(),htmlBody.animate({scrollTop:0},300)}),$(".banners-top.slider").slick({adaptiveHeight:!0,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!0,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1}),$("body.home .slider").find(".prateleira ul").slick({arrows:!1,dots:!0,draggable:!0,touchMove:!0,autoplay:!1,slidesToShow:2,mobileFirst:!0,slidesToScroll:1,adaptiveHeight:!0}),$("body.home .slider-escolha-por-santos").find("ul").slick({arrows:!1,dots:!0,draggable:!0,touchMove:!0,autoplay:!1,slidesToShow:1,mobileFirst:!0,slidesToScroll:1,adaptiveHeight:!0}),$(".js-open-mobile-menu").click(function(){var self=$(this);$(".js-open-mobile-menu").toggleClass("active"),$(".menu-header").toggleClass("display"),self.hasClass("active")?$("html, body").off("touchstart touchmove").on("touchstart touchmove",function(e){e.preventDefault()}):$("html, body").off("touchstart touchmove").on("touchstart touchmove",function(e){})}),$(".first-menu").click(function(){$(this).toggleClass("active"),$(this).next().toggleClass("active")});var mountBread=function(){var bCrumb=$(".bread-crumb li").length;bCrumb<=2?($(".bread-crumb-box .text1").html(),$(".bread-crumb-box .text2").html($(".bread-crumb li:last-child").text())):($(".bread-crumb-box .text1").html($(".bread-crumb li:nth-last-of-type(2)").text()),$(".bread-crumb-box .text2").html($(".bread-crumb li:last-of-type").text()))};if(sidebar.length>0){mountBread();try{sidebar.find('input[type="checkbox"]').vtexSmartResearch({elemLoading:"",returnTopText:"",elemLoading:'<i class="shelf__loading"></i>',filterScrollTop:function(shelfOffset){return 20}})}catch(e){}}if($(pagInstitucional).length>0&&$(".tab span").click(function(){$(this).toggleClass("active"),$(this).next().slideToggle()}),pagProduto.length>0){try{$document.ready(function(){$(".selecao-sku .more").click(function(){var $input=$(this).prev();$input.val(+$input.val()+1);var opt_value=$input.val(),currentURL=($(this).next(),$(".buy-button").attr("href")),nomedoproduto=currentURL.split(/\&/)[0];$(".buy-button").removeAttr("href"),$(".buy-button").attr("href",nomedoproduto+"&qty="+opt_value+"&seller=1&redirect=false&sc=1")}),$(".selecao-sku .less").click(function(){var $input=$(this).next();$input.val(+$input.val()-1);var opt_value=$input.val(),currentURL=($(this).next(),$(".buy-button").attr("href")),nomedoproduto=currentURL.split(/\&/)[0];$(".buy-button").removeAttr("href"),$(".buy-button").attr("href",nomedoproduto+"&qty="+opt_value+"&seller=1&redirect=false&sc=1")}),$(".shipping-value").simulateClick("click"),$(".Cor").addClass("col-md-6 col-xs-12"),$(".Cor").insertBefore(".selecao-sku .quantidade"),$(".btn-tabelaMedidas").insertBefore(".sku-selector-container .Tamanho"),$("#caracteristicas table.Regra").appendTo(".reg-conteudo")})}catch(e){}try{$document.ajaxStop(function(){$("#szb_btn").insertAfter("ul.Tamanho"),$("#szb_size_chart").appendTo(".medidas"),$(".btn-tabelaMedidas").on("click",function(e){$("#szb_size_chart").simulateClick()}),$(".selecao-sku label").length<2&&$(".topic.Cor").remove()})}catch(e){}$("#___rc-p-id").each(function(index){var id=$(this).attr("value"),data="/api/catalog_system/pub/products/search/?fq=productId:"+id;$.getJSON(data,function(data){$.each(data,function(key,val){var elements=val.items[0].images;$(elements).each(function(data,val){var myLabel=val.imageLabel,myImageID=val.imageId,myImageName=val.imageText;$('<li class="slick-slide '+myLabel+'"><img src="/arquivos/ids/'+myImageID+"-600-600/"+myImageName+'.jpg" /></li>').appendTo(".ProductImage .slider ul")}),$(".ProductImage .slider ul").slick({adaptiveHeight:!0,autoplay:!1,pauseOnHover:!0,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1})})})})}$(depCatBus).length>0&&(window.location.href.indexOf("OrderByTopSaleDESC")!=-1&&$(".main-category__orderBy li:nth-child(2) a").addClass("active"),window.location.href.indexOf("OrderByReleaseDateDESC")!=-1&&$(".main-category__orderBy li:nth-child(3) a").addClass("active"),window.location.href.indexOf("OrderByPriceDESC")!=-1&&$(".main-category__orderBy li:nth-child(4) a").addClass("active"),window.location.href.indexOf("OrderByPriceASC")!=-1&&$(".main-category__orderBy li:nth-child(5) a").addClass("active")),$(".call_modal").click(function(){$(".tabelas").fadeIn(200),$(".bg_modal").fadeIn(600),$("body").addClass("modal_active")}),$(".close_modal, .bg_modal").click(function(){$(".tabelas").fadeOut(600),$(".bg_modal").fadeOut(600),$("body").removeClass("modal_active"),$(".modal_loader").remove()}),$(document).keyup(function(ev){27==ev.keyCode&&$(".tabelas").fadeOut(500),$(".bg_modal").fadeOut(600),$("body").removeClass("modal_active"),$(".modal_loader").remove(),$("#parcelamentoModal").removeClass("active")});try{$document.ajaxStop(function(){orderList.parents("html").removeClass("is-loading")})}catch(e){}if($("body").hasClass("home")){var tipBar=function(s){"undefined"!=typeof window.screen.orientation&&s<=768&&fadeInOut(jQuery(".tipBar ul li:first-child"))};tipBar(window.screen.width),$(window).on("resize",function(){tipBar(window.screen.width)})}});