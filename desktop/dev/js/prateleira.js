(function (window, document, $) {
    'use strict';
    function Shelf(){
    	self = this;
    	var _config = {
    		shelf: shelf,
    		shelfItem: '.shelfItem',
    		buyButton: '.buy-button',
    		variationDisplay: 'select',
    		salesChannel: jssalesChannel,
    		skuSelection:'.skus-selection',
    	}
    	window._Produtos = {
    		loadedProducts: new Object(),
    	};
    	this.config = function(config){
			for (var key in config) {
		        if (_config.hasOwnProperty(key)) _config[key] = config[key];
		    }
    	}
    	this.getLoadedProducts = function(){
    		return _Produtos.loadedProducts;
    	}
    	this.getAllProductsOnScreen = function(callback){
    		var ids = $('.shelf-prod-id, #___rc-p-id').map(function(o){ return this.value}).get()
			self.getProducts(ids, callback);
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
		this.shelfLoadVariations = function(prodId){
			var html = '';
			$.each(_Produtos.loadedProducts[prodId].dimensionsMap, function(variation, item){
				var vw, gp, op = '';
				if (_config.variationDisplay == 'select'){
					gp = '<select name="'+variation+'">#options#</select>';
					vw = 'option';
				}else{
					gp = '<div>#options#<div>';
					vw = 'input type="'+_config.variationDisplay+'"';
				}
				$.each(item, function(i, item){
					op += '<'+vw+' value="'+item+'">'+item+'</'+vw+'>';
				});
				html += gp.replace(/#options#/g, op);;
			});
			console.log(_config.shelfItem+'[data-prodid="'+prodId+'"]', prodId);
			$(_config.shelfItem+'[data-prodid="'+prodId+'"]').find(_config.skuSelection).html(html);
		}
		this.getSelectedSku = function(prodId,variations){
			variations = variations || null;
			if (!variations){
				console.log('Variações não informadas');
				return false
			}
			var condition = '';
			$.each(variations, function(i, item){condition = 'sku.'+i+'=='+item;}); // sku => nome da variável usada no filtro abaixo
			return(_Produtos.loadedProducts[prodId].items.filter(function(sku){return eval(condition);}));
		}
		this.updateBuyButton = function(item, sku){
			item.find(config.buyButton).attr('href', GetCartAddLink(sku.itemId,  sku.sellers[0].sellerId,  1,  _config.salesChannel))
		}
    }
    window.Prateleira = new Shelf();
    // $.fn.shelf = function(parameters) {

    // }
}(window, document, jQuery));