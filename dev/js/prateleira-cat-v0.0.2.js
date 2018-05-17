(function (window, document, $) {
    'use strict';
    function Shelf(){
    	self = this;
    	var _config = {
    		shelf: '.shelf',
    		shelfItem: '.shelfItem',
    		buyButton: '.buy-button',
    		variationDisplay: 'select',
    		listPrice: '.shelfOldPrice',
    		bestPrice: '.shelfBestPrice',
    		shelfProdId:'.shelf-prod-id',
    		salesChannel: jssalesChannel,
    		productImage: '.product-image',
    		skuSelection:'.skus-selection',
    		installments: '.shelfInstallment',
    		listPriceFormat: ' De: #listPrice#',
    		bestPriceFormat: 'ou #bestPrice# à vista',
    		installmentsFormat: 'Por apenas: <strong>#installments#x #value#</strong>',
    	}
    	window._Produtos = {
    		loadedProducts: new Object(),
    	};
    	function formatPrice(input,dp){
			input = String(input.toFixed(2));
			var thou = (dp == '.')? ',': '.';
			var r = input.replace(/\D/g,"");
		    r = r.replace(/^0/,"");
		    if(r.length > 5){
		    	r = r.replace(/\B(?=(.{2}$)+(?!\d))|([.])/g,dp).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+thou);
		    }else if(r.length > 2){
		    	r = r.replace(/(\d{1})(\d{2})$/,"$1"+dp+"$2");
		    }else if(r.length > 1){
				r = r.replace(/(\d{2})$/,"00"+dp+"$1");
			}else {
		        r = r.replace(/(\d{1})$/, "00"+dp+"0$1");
		    }
		    return 'R$ '+r;
		}
    	this.config = function(config){
			for (var key in config) {
		        if (_config.hasOwnProperty(key)) _config[key] = config[key];
		    }
    	}
    	this.getProducts = function(ids, callback){
			ids = ids || null;
			callback = callback || null;
			if(ids){
				var filter = '';
				$.each(ids, function(i, item){
					if(_Produtos.loadedProducts.hasOwnProperty(item)){
						return true;
					}
					filter += (i)? '&fq=productId:' + item : 'fq=productId:'+ item;
				});
				if(filter.length){
					$.ajax({
						url: '/api/catalog_system/pub/products/search?'+filter,
						type: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/vnd.vtex.ds.v10+json'
						},
						success: function(data){
							console.log('Sucesso', data);
							$.each(data, function(i, prod){
								prod['dimensions'] = prod.items[0].variations;
								prod['dimensionsMap'] = new Object();
								$.each(prod['dimensions'], function(i, dim){
									prod['dimensionsMap'][dim] = prod.items.map(function(o){return o[dim][0]}).reduce(function(carry, item){ 
										if(item && !~carry.indexOf(item)) carry.push(item);
					    				return carry;
									}, []); 
					            });
					            data = prod;
					            _Produtos.loadedProducts[prod.productId] = prod;
							});
							var event = new CustomEvent("Prateleira.productsFetched");
							event.fetchedProducts = data;
							window.dispatchEvent(event);
							if (callback && callback.success) callback.success(data);
						},
						error: function(data){
							console.log('error', data);
							if (callback && callback.error) callback.error(data);
						}
					});
				}
			}else{
				console.log('Nenhum id informado!');
			}
		}
    	this.getLoadedProducts = function(){
    		return _Produtos.loadedProducts;
    	}
    	this.getAllProductsOnScreen = function(callback){
    		var ids = $('.shelf-prod-id, #___rc-p-id').map(function(o){ return this.value}).get()
			self.getProducts(ids, callback);
    	}
    	this.getAllProductsOnScreenSkus = function(callback){
    		var ids = $(_config.shelfProdId).map(function(o){ return this.value}).get()
			self.getSkus(ids, callback);
    	}
    	this.getSkus = function(ids, callback){
			ids = ids || null;
			callback = callback || null;
			var calls = []
			$.each(ids, function(i, id){
			    calls.push(vtexjs.catalog.getProductWithVariations(id));
			});
			$.when.apply(null, calls).then(function(){
				console.log('when',vtexjs.catalog.cache.productWithVariations);
				var event = new CustomEvent("Prateleira.productsFetched");
				event.fetchedProducts = vtexjs.catalog.cache.productWithVariations;
				window.dispatchEvent(event);
				if (callback)  callback();
			});
		}
		this.shelfLoadAllVariations = function(){
			self.getAllProductsOnScreenSkus(function(){
				$(_config.shelfItem+':not(.ShelfProduct)').each(function(){
					self.shelfLoadVariations(this.attributes['data-prodid'].value);
					$(this).addClass('ShelfProduct');
				});
			});
		}
		this.shelfLoadVariations = function(prodId){
			var html = '';
			$.each(vtexjs.catalog.cache.productWithVariations[prodId].dimensionsMap, function(variation, item){
				var vw, gp, op = '';
				if (_config.variationDisplay == 'select'){
					gp = '<label class="'+_config.variationDisplay+' '+variation+'" ><select name="'+variation+'">#options#</select></label>';
					vw = 'option';
					$.each(item, function(i, item){
						op += '<option value="'+item+'">'+item+'</option>';
					});
				}else{
					gp = '<div>#options#<div>';
					$.each(item, function(i, item){
						op += '<label class="'+_config.variationDisplay+' '+variation+'" id="'+variation+'-'+item+'"><input type="'+_config.variationDisplay+'" value="'+item+'">'+item+'</input></label>';
					});
				}
				html += gp.replace(/#options#/g, op);;
			});
			console.log(_config.shelfItem+'[data-prodid="'+prodId+'"]', prodId);
			var shelfItem = $(_config.shelfItem+'[data-prodid="'+prodId+'"]');
			var skuSelection = $(shelfItem).find(_config.skuSelection);
			$(skuSelection).attr('data-prodid', prodId);
			$(skuSelection).html(html);
			$(shelfItem).on('change', 'select, input', function(e){
				var variations = new Object();
				$(e.delegateTarget).find(_config.skuSelection).find('select, input').each(function(){variations[this.name] = this.value});
				var event = new CustomEvent("Prateleira.variationChanged");
				event.shelfItem = e.delegateTarget;
				event.productId = e.delegateTarget.attributes['data-prodid'].value;
				event.variations = variations;
				window.dispatchEvent(event);
			});
			$(shelfItem).find('select, input').trigger('change');
		}
		this.getSelectedSku = function(prodId,variations, callback){
			callback = callback || null;
			variations = variations || null;
			if (!variations){
				console.log('Variações não informadas');
				return false
			}
			var condition = '';
			$.each(variations, function(i, item){
				if (condition.length > 0 ) condition += ' && ';
				condition += 'sku.dimensions.'+i+' == "'+item+'"';
			}); // sku => nome da variável usada no filtro abaixo
			$.when(vtexjs.catalog.getProductWithVariations(prodId)).then(function(e){
				var sku = e.skus.filter(function(sku){return eval(condition);});
				if (callback)  callback(sku);
			});
		}
		this.updateSku = function(sku, item){
			console.log('newSku', sku);
			console.log('skuAvailable?', sku[0].available);
			if(sku[0].available){
				$(item).find(_config.productImage).find('img').attr('src', sku[0].image);
				$(item).find(_config.listPrice).html(_config.listPriceFormat.replace(
					/#listPrice#/g, 
					(sku[0].listPrice)? sku[0].listPriceFormated: sku[0].bestPriceFormated
				));
				$(item).find(_config.bestPrice).html(_config.bestPriceFormat.replace(/#bestPrice#/g, sku[0].bestPriceFormated));
				/* 
					corrigir formatação do preço
					$(item).find(_config.installments).html(_config.installmentsFormat.replace(/#installments#/g,sku[0].installments).replace(/#value#/g, formatPrice(sku[0].installmentsValue,',')));
				*/
				$(item).removeClass('sku-unavailable');
			}else{
				$(item).addClass('sku-unavailable');
			}
			self.updateBuyButton(sku[0], $(item));
			var event = new CustomEvent("Prateleira.skuUpdated");
			window.dispatchEvent(event);
		}
		this.updateBuyButton = function(sku, item){
			console.log('skubutton', sku);
			item.find(_config.buyButton).attr('href', GetCartAddLink(sku.sku,  sku.sellerId,  sku.unitMultiplier,  _config.salesChannel))
		}
    }
    window.Prateleira = new Shelf();
    $.fn.shelf = function(parameters){
    	var $Shelf = $(this);
		Prateleira.config(parameters);
 		Prateleira.shelfLoadAllVariations();
		window[(window.addEventListener)? 'addEventListener': 'attachEvent']('Prateleira.variationChanged', function(e){
			console.log('Prateleira.variationChanged', e);
			Prateleira.getSelectedSku(e.productId, e.variations, function(sku){
				Prateleira.updateSku(sku, e.shelfItem);
			});
		});
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var elementChange    = new MutationObserver (function(){
		    Prateleira.shelfLoadAllVariations();
		});
		elementChange.observe ($(this)[0], {childList: true});
    }
}(window, document, jQuery));