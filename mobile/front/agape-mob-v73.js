function setFlags(){$(".the-flags").each(function(){var qtdDesconto=$(this).text().replace("%","");qtdDesconto=parseInt(qtdDesconto),0==qtdDesconto&&$(this).hide(),$(this).text(" ").html(qtdDesconto+"% </br> <span>OFF</span>")})}function priceStatus(){$(".prateleira .shelfItem").each(function(){var myDrop=($(this),$(this).find(".drop")),myOldBox=$(this).find(".shelfOldPrice"),myOld=$(this).find(".shelfOldPrice").text(),myNew=$('<span class="txt-sz-16 shelfBestPrice txt-gray">ou '+myOld+" à vista</span>"),myBest=$(this).find(".shelfBestPrice"),myInstallments=$(this).find(".shelfInstallment");0==$(myBest).length&&(myOldBox.hide(),myDrop.css("margin-top","-4px"),myNew.insertAfter(myInstallments),myInstallments.css("border","none"),myInstallments.css("padding-left","0"))})}!function(window,document,$){"use strict";var __ec_dataEach=function(props){var el="";return props.data&&$.each(props.data,function(index,value){el+=" data-"+value.name+'="'+value.id+'"'}),el},__ec_propsComun=function(props){var el="";return el+=props.id?' id="'+props.id+'"':"",el+=props["class"]?' class="'+props["class"]+'"':"",el+=props.style?' style="'+props.style+'"':""},__ec_img=function(props){var img="\n<img";return img+=__ec_dataEach(props),img+=__ec_propsComun(props),img+=' src="'+props.src+'" ',img+=props.title?' title="'+props.title+'" ':"",img+=props.title?' alt="'+props.title+'" ':"",img+=props.width?' width="'+props.width+'" ':"",img+=props.height?' height="'+props.height+'"':"",img+="/>"},__ec_element=function(props){if("img"==props.type)return __ec_img(props);var el="";return el+="\n<"+props.type,el+=__ec_dataEach(props),el+=__ec_propsComun({id:props.id,"class":props["class"],style:props.style}),el+=">",el+=props.content?props.content:"",el+="</"+props.type+">\n"};window.__ec_img=__ec_img,window.__ec_propsComun=__ec_propsComun,window.__ec_dataEach=__ec_dataEach,window.__element=__ec_element}(window,document,jQuery),jQuery.fn.simulateClick=function(){return this.each(function(){if("createEvent"in document){var doc=this.ownerDocument,evt=doc.createEvent("MouseEvents");evt.initMouseEvent("click",!0,!0,doc.defaultView,1,0,0,0,0,!1,!1,!1,!1,0,null),this.dispatchEvent(evt)}else this.click()})};var body=$("body"),htmlBody=$("html, body"),$document=$(document),header=$("#header"),submenuDesktopWrapper=$(".js-submenu-wrap"),userSubmenu=$(".submenu-user"),sidePanelMobile=$(".side-panel"),mobileSubmenu=$(".submenu-mobile"),minicart=$(".minicart"),slide=$(".slide"),slideShelf=$(".slideShelf"),slideBrands=$(".slideBrands"),carousel=$(".shelf-carousel"),backToTop=$(".js-back-to-top"),shelf=$(".prateleira"),paginatedShelf=$(".prateleira[id*=ResultItems]"),orderList=$(".order-list"),formNews=$(".newsletter"),depCatBus=$(".dep-cat-bus"),pagProduto=$(".produto"),pagInstitucional=$(".institucional"),sidebar=$(".sidebar"),santos=$(".escolha-por-santos li");$(function(){function fadeInOut(item){item.fadeIn(1e3).delay(3e3).fadeOut(1e3,function(){fadeInOut(item.next().length?item.next():item.siblings(":first"))})}setFlags(),$(".footer-middle h3").on("click",function(event){$(this).toggleClass("active"),$(this).next().slideToggle()}),$(".options button").on("click",function(event){$("body").removeClass("opacity-active"),$(".search-box .btn-buscar").simulateClick("click")});var myWidth=$("body").width();$(".search-box").css("width",myWidth+"px"),$('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.75 258.75" width="35" height="35"><g fill="#fff"><circle cx="129.375" cy="60" r="60"></circle><path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z"></path></g></svg>').insertBefore("body.orders .txt-center"),$('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.75 258.75" width="35" height="35"><g fill="#fff"><circle cx="129.375" cy="60" r="60"></circle><path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z"></path></g></svg>').insertBefore(".profile-detail-display h4"),$('<svg class="ico-vert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.053 512.053" width="35" height="35"><path d="M365.027 44.5c-30-29.667-66.333-44.5-109-44.5s-79 14.833-109 44.5-45 65.5-45 107.5c0 25.333 12.833 67.667 38.5 127 25.667 59.334 51.333 113.334 77 162s38.5 72.334 38.5 71c4-7.334 9.5-17.334 16.5-30s19.333-36.5 37-71.5 33.167-67.166 46.5-96.5c13.334-29.332 25.667-59.667 37-91s17-55 17-71c0-42-15-77.833-45-107.5zm-76 139.5c-9.333 9.333-20.5 14-33.5 14s-24.167-4.667-33.5-14-14-20.5-14-33.5 4.667-24 14-33 20.5-13.5 33.5-13.5 24.167 4.5 33.5 13.5 14 20 14 33-4.667 24.167-14 33.5z" fill="#f68026"/></svg>').insertBefore(".address-display-block h4"),$(".prateleira li").each(function(event){var me=$(this),bestPrice=me.find(".shelfBestPrice");priceStatus(),0==$(bestPrice).length&&me.find(".shelfOldPrice").removeClass("ln-through")}),$(".img-box img.element-1").addClass("active"),$(".escolha-por-santos li").each(function(){$(this).on("hover",function(){var wicth=$(this).attr("class");$(".img-box img."+wicth).prependTo(".img-box"),$(this).removeClass("active"),$(".img-box img").first().addClass("active")})}),body.on("click",".Cor .skuList label",function(event){$('<div class="lds-heart active"><div></div></div>').insertBefore(".slider ul"),$(".Cor .skuList label").removeClass("checked"),$(this).addClass("checked"),window.currentColor=$(this).text(),console.log(currentColor);var id=$("#___rc-p-id").attr("value"),data="/api/catalog_system/pub/products/search/?fq=productId:"+id;$.getJSON(data,function(data){$.each(data,function(key,val){var elements=val.items;$(elements).each(function(i,items,key,val){var colors=elements[i].Cor==currentColor;1==$(colors).length&&console.log(this)})})})}),body.on("click",".add-to-cart",function(event){var myBt=$(".buy-box .buy-button");if("javascript:alert('Por favor, selecione o modelo desejado.');"==$(myBt).attr("href"))0==$("ul.Tamanho label.checked").length&&($("body.produto ul.Tamanho .skuList label").addClass("error"),$("ul.Tamanho .error-picked").remove(),$('<span class="error-picked">É Preciso selecionar o tamanho</span>').insertAfter("ul.Tamanho li.specification")),0==$("ul.Cor label.checked").length&&($("body.produto ul.Cor .skuList label").addClass("error"),$("ul.Cor .error-picked").remove(),$('<span class="error-picked">É Preciso selecionar a cor</span>').insertAfter("ul.Cor li.specification")),document.querySelector("#id3").scrollIntoView({behavior:"smooth"});else{var myBtLink=$(".buy-box .buy-button").attr("href");$.get(myBtLink,function(data){vtexjs.checkout.getOrderForm().done(function(orderForm){console.log(orderForm);var elements=orderForm.items;$(elements).each(function(orderForm,val){var tempPrice=val.formattedPrice,tempImage=val.imageUrl,tempName=val.name;$(".sta-cart-items ul li.fake-insert").remove(),$('<li class="fake-insert"><div class="sta-cart-pdt-image"></div><div class="sta-cart-pdt-info"><button class="remove-item" data-index="0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "></polygon></svg><span>remover</span></button><div class="sta-cart-pdt-qtd"></div></div></li>').appendTo(".sta-cart-items ul"),$("<img src="+tempImage+"/>").appendTo("li.fake-insert .sta-cart-pdt-image"),$("<h4>"+tempName+"</h4>").insertBefore("li.fake-insert .sta-cart-pdt-info button"),$("<p>"+tempPrice+"</p>").insertAfter("li.fake-insert .sta-cart-pdt-qtd");var tempPrice=$(".total-cart-em").text();$(".sta-cart-total strong").text(tempPrice),htmlBody.animate({scrollTop:0},300),$(".amount-items-em").simulateClick("click")})})})}}),$(".skuList input.item_unavaliable").on("click",function(event){$(".bt-comprar").next().show()}),body.on("click",".bt-comprar",function(event){var myBt=$(".buy-box .buy-button");if("javascript:alert('Por favor, selecione o modelo desejado.');"==$(myBt).attr("href"))0==$("ul.Tamanho label.checked").length&&($("body.produto ul.Tamanho .skuList label").addClass("error"),$("ul.Tamanho .error-picked").remove(),$('<span class="error-picked">É Preciso selecionar sua variação</span>').insertAfter("ul.Tamanho li.specification")),0==$("ul.Cor label.checked").length&&($("body.produto ul.Cor .skuList label").addClass("error"),$("ul.Cor .error-picked").remove(),$('<span class="error-picked">É Preciso selecionar sua variação</span>').insertAfter("ul.Cor li.specification")),document.querySelector("#id3").scrollIntoView({behavior:"smooth"});else{var myBtLink=$(".buy-box .buy-button").attr("href");$.get(myBtLink,function(data){vtexjs.checkout.getOrderForm().done(function(orderForm){console.log(orderForm);var elements=orderForm.items;$(elements).each(function(orderForm,val){var tempPrice=val.formattedPrice,tempImage=val.imageUrl,tempName=val.name;$(".sta-cart-items ul li.fake-insert").remove(),$('<li class="fake-insert"><div class="sta-cart-pdt-image"></div><div class="sta-cart-pdt-info"><button class="remove-item" data-index="0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "></polygon></svg><span>remover</span></button><div class="sta-cart-pdt-qtd"></div></div></li>').appendTo(".sta-cart-items ul"),$("<img src="+tempImage+"/>").appendTo("li.fake-insert .sta-cart-pdt-image"),$("<h4>"+tempName+"</h4>").insertBefore("li.fake-insert .sta-cart-pdt-info button"),$("<p>"+tempPrice+"</p>").insertAfter("li.fake-insert .sta-cart-pdt-qtd");var tempPrice=$(".total-cart-em").text();$(".sta-cart-total strong").text(tempPrice),htmlBody.animate({scrollTop:0},300),$(".amount-items-em").simulateClick("click")})})})}}),body.on("click",".skuList label",function(event){$(".error-picked").remove(),$(".skuList label").removeClass("error")}),$(".close-modal, .opacity-modal").click(function(event){$("body").removeClass("modal-active"),$("body").removeClass("newsletter-active"),$("body").removeClass("sku-unavaiable"),$("body").removeClass("add-to-cart-active"),$("body").removeClass("product-popup"),$(".new-modal-content").remove()}),$(document).keyup(function(ev){27==ev.keyCode&&$("body").removeClass("modal-active"),$("body").removeClass("newsletter-active"),$("body").removeClass("add-to-cart-active"),$("body").removeClass("product-popup"),$(".new-modal-content").remove(),$("#parcelamentoModal").removeClass("active")}),orderList.length>0&&(orderList.find("link").remove(),orderList.find(".page-header").unwrap(".container")),$(".helperComplement").length&&$(".helperComplement").remove();var svgSearch=$(".search-toggle svg").clone();svgSearch.insertBefore(".btn-buscar"),$(".search-toggle").click(function(){$(".search-box ").toggleClass("active"),$("main").toggleClass("search-active")}),$(window).scroll(function(){var scroll=$(window).scrollTop();scroll>=450?$(".js-back-to-top").addClass("active"):$(".js-back-to-top").removeClass("active")}),body.on("click",".js-back-to-top",function(event){event.preventDefault(),htmlBody.animate({scrollTop:0},300)}),$(".banners-top.slider").slick({adaptiveHeight:!0,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!0,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1}),$("body.home .slider").find(".prateleira ul").slick({arrows:!1,dots:!0,draggable:!0,touchMove:!0,autoplay:!1,slidesToShow:2,mobileFirst:!0,slidesToScroll:1,adaptiveHeight:!0}),$("body.home .slider-escolha-por-santos").find("ul").slick({arrows:!1,dots:!0,draggable:!0,touchMove:!0,autoplay:!1,slidesToShow:1,mobileFirst:!0,slidesToScroll:1,adaptiveHeight:!0}),$(".js-open-mobile-menu").click(function(){var self=$(this);$(this).toggleClass("active"),$("body").toggleClass("menu-active"),$("body").removeClass("opacity-active"),$(".menu-header").toggleClass("display"),self.hasClass("active")?$("html, body").off("touchstart touchmove").on("touchstart touchmove",function(e){e.preventDefault()}):$("html, body").off("touchstart touchmove").on("touchstart touchmove",function(e){})}),$(".first-menu").click(function(){$(this).toggleClass("active"),$(this).next().toggleClass("active")}),$("header").find(".menu-header.display").on("click","li.has-sub > a",function(e){e.preventDefault(),$(this).siblings(".submenu").toggleClass("active")}),$(".menu-header .has-sub > a:first-of-type").on("click",function(e){e.preventDefault(),$(this).parent().siblings(".has-sub").children("a:first-of-type").each(function(){$(this).next(".submenu").hide()}),$(this).next(".submenu").toggle()}),$(".first-menu").click(function(){$(this).toggleClass("active"),$(this).next().slideToggle()});var mountBread=function(){var bCrumb=$(".bread-crumb li").length;bCrumb<=2?($(".bread-crumb-box .text1").html(),$(".bread-crumb-box .text2").html($(".bread-crumb li:last-child").text())):($(".bread-crumb-box .text1").html($(".bread-crumb li:nth-last-of-type(2)").text()),$(".bread-crumb-box .text2").html($(".bread-crumb li:last-of-type").text()))};if(sidebar.length>0){mountBread();try{sidebar.find('input[type="checkbox"]').vtexSmartResearch({elemLoading:"",returnTopText:"",elemLoading:'<i class="shelf__loading"></i>',filterScrollTop:function(shelfOffset){return 20}})}catch(e){}}if($(pagInstitucional).length>0&&$(".tab span").click(function(){$(this).toggleClass("active"),$(this).next().slideToggle()}),pagProduto.length>0){$(".compra-persistente-bt").on("click",function(event){var myBtLink=$(".buy-box .buy-button").attr("href");"javascript:alert('Por favor, selecione o modelo desejado.');"==$(myBtLink).attr("href")?($(".close-bt-opacity").toggleClass("active"),$("body").toggleClass("opacity-active"),document.querySelector("#id3").scrollIntoView({behavior:"smooth"})):$.get(myBtLink,function(data){vtexjs.checkout.getOrderForm().done(function(orderForm){console.log(orderForm);var elements=orderForm.items;$(elements).each(function(orderForm,val){var tempPrice=val.formattedPrice,tempImage=val.imageUrl,tempName=val.name;$(".sta-cart-items ul li.fake-insert").remove(),$('<li class="fake-insert"><div class="sta-cart-pdt-image"></div><div class="sta-cart-pdt-info"><button class="remove-item" data-index="0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "></polygon></svg><span>remover</span></button><div class="sta-cart-pdt-qtd"></div></div></li>').appendTo(".sta-cart-items ul"),$("<img src="+tempImage+"/>").appendTo("li.fake-insert .sta-cart-pdt-image"),$("<h4>"+tempName+"</h4>").insertBefore("li.fake-insert .sta-cart-pdt-info button"),$("<p>"+tempPrice+"</p>").insertAfter("li.fake-insert .sta-cart-pdt-qtd");var tempPrice=$(".total-cart-em").text();$(".sta-cart-total strong").text(tempPrice),htmlBody.animate({scrollTop:0},300),$(".amount-items-em").simulateClick("click")})})})}),$(".close-bt-opacity").on("click",function(event){$("body").removeClass("opacity-active"),$(this).removeClass("active")}),$(".opacity-all").on("click",function(event){$("body").removeClass("opacity-active"),$(".close-bt-opacity").removeClass("active")}),$(".skuList label").on("click",function(event){$("body").removeClass("opacity-active"),$(".close-bt-opacity").removeClass("active")}),$(function(){var stickyHeaderTop=$(".troca").offset().top;$(window).scroll(function(){$(window).scrollTop()>stickyHeaderTop-85?$(".compra-persistente-bt").addClass("active"):$(".compra-persistente-bt").removeClass("active")})});try{$document.ready(function(){$("label.prefixo input").insertAfter("label.prefixo"),$("label.prefixo").text("Calcule o frete"),$(".shipping-value").simulateClick("click"),$("ul.Cor").addClass("col-xs-12"),$("ul.Cor").insertAfter("ul.Tamanho"),$(".btn-tabelaMedidas").insertBefore(".sku-selector-container .Tamanho"),$("#caracteristicas table.Regra").appendTo(".reg-conteudo")})}catch(e){}$(".troca .section-title, .descricao .section-title, .especificacoes .section-title").each(function(){$(this).next().hide()}),$(".troca .section-title, .descricao .section-title, .especificacoes .section-title").on("click",function(event){$(this).toggleClass("active"),$(this).next().slideToggle()});try{$document.ajaxStop(function(){$("#szb_btn").insertAfter("ul.Tamanho"),$("#szb_size_chart").appendTo(".medidas"),$(".btn-tabelaMedidas").on("click",function(e){$("#szb_size_chart").simulateClick()}),$(".freight-btn").val("Ok"),$(".freight-btn").on("click",function(event){$('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>').insertBefore(".freight-values"),$(".spinner").fadeOut("6000")}),$("label.prefixo input").insertAfter("label.prefixo"),$("label.prefixo").text("Calcule o frete")})}catch(e){}$(".produtos-similares .prateleira ul").slick({autoplay:!1,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:2,slidesToScroll:1}),$(".produtos-similares ul.slick-dots").insertAfter(".produtos-similares .slick-slider"),$("#___rc-p-id").each(function(index){var id=$(this).attr("value"),data="/api/catalog_system/pub/products/search/?fq=productId:"+id;$.getJSON(data,function(data){$.each(data,function(key,val){var elements=val.items[0].images;$(elements).each(function(data,val){var myImageID=val.imageId,myImageName=val.imageText;$('<li><img src="/arquivos/ids/'+myImageID+"-650-650/"+myImageName+'.jpg" /></li>').appendTo(".ProductImage .slider ul")})}),$(".ProductImage .slider ul").slick({autoplay:!1,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1})})}),body.on("click",".Cor .skuList label",function(event){$('<div class="lds-heart active"><div></div></div>').insertBefore(".slider ul"),$(".Cor .skuList label").removeClass("checked"),$(this).addClass("checked"),$(".ProductImage .slider ul").remove(),$("<ul></ul>").appendTo(".ProductImage .slider"),window.currentColor=$(this).text(),console.log(currentColor);var id=$("#___rc-p-id").attr("value"),data="/api/catalog_system/pub/products/search/?fq=productId:"+id;$.getJSON(data,function(data){$.each(data,function(key,val){var elements=val.items;$(elements).each(function(i,items,key,val){if(elements[i].Cor==currentColor){window.me=$(this);elements[i]}});var changeColor=me[0].images;$(changeColor).each(function(data,val){var myImageID=val.imageId,myImageName=val.imageText;$('<li><img src="/arquivos/ids/'+myImageID+"-650-650/"+myImageName+'.jpg" /></li>').appendTo(".ProductImage .slider ul")}),$(".lds-heart").remove(),$(".ProductImage .slider ul").slick({autoplay:!1,arrows:!1,dots:!0,draggable:!0,touchMove:!0,slidesToShow:1,slidesToScroll:1})})})})}if($(depCatBus).length>0){window.location.href.indexOf("OrderByTopSaleDESC")!=-1&&$(".main-category__orderBy li:nth-child(2) a").addClass("active"),window.location.href.indexOf("OrderByReleaseDateDESC")!=-1&&$(".main-category__orderBy li:nth-child(3) a").addClass("active"),window.location.href.indexOf("OrderByPriceDESC")!=-1&&$(".main-category__orderBy li:nth-child(4) a").addClass("active"),window.location.href.indexOf("OrderByPriceASC")!=-1&&$(".main-category__orderBy li:nth-child(5) a").addClass("active"),priceStatus();var showFilters=__element({type:"button","class":"filtrarProdutos",name:"filtrarProdutos",content:"Filtrar produtos"});$(".mainShelf .main .sub").prepend(showFilters),$(".filtrarProdutos").click(function(){$(".sidebar").toggleClass("active"),$("body").toggleClass("menu-active"),$(".filtrarProdutos").toggleClass("active"),$(".opacity-filter").toggleClass("active")}),$(".menuClose").click(function(){$(".sidebar").removeClass("active"),$("body").removeClass("menu-active"),$(".opacity-filter").removeClass("active"),$(".filtrarProdutos").removeClass("active")}),$(".search-single-navigator, .search-multiple-navigator").find("fieldset").on("click","h5",function(){$(this).toggleClass("active"),$(this).next().toggleClass("active")}),$(".search-single-navigator, .search-multiple-navigator").find('input[type="checkbox"]:checked').parent().addClass("active"),$(".search-single-navigator, .search-multiple-navigator").find('input[type="checkbox"]').on("change",function(){this.parentNode.classList[this.checked?"add":"remove"]("active")})}$(".call_modal").click(function(){$(".tabelas").fadeIn(200),$(".bg_modal").fadeIn(600),$("body").addClass("modal_active")}),$(".close_modal, .bg_modal").click(function(){$(".tabelas").fadeOut(600),$(".bg_modal").fadeOut(600),$("body").removeClass("modal_active"),$(".modal_loader").remove()}),$(document).keyup(function(ev){27==ev.keyCode&&$(".tabelas").fadeOut(500),$(".bg_modal").fadeOut(600),$("body").removeClass("modal_active"),$(".modal_loader").remove(),$("#parcelamentoModal").removeClass("active")});try{$document.ajaxStop(function(){orderList.parents("html").removeClass("is-loading")})}catch(e){}if($(document).ready(function(){$(".resultado-busca-filtro .orderBy").first().insertAfter(".filtrarProdutos")}),$(document).ajaxComplete(function(){$(".box-item").each(function(){$(".lds-heart").remove()})}),$("body").hasClass("home")){var tipBar=function(s){"undefined"!=typeof window.screen.orientation&&s<=768&&fadeInOut(jQuery(".tipBar ul li:first-child"))};tipBar(window.screen.width),$(window).on("resize",function(){tipBar(window.screen.width)})}});