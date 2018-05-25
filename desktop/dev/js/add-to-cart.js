$('.buy-button').each(function(){
	$(this).removeAttr('href');
});

$('.btn-favorite').each(function(){
	$(this).click(function(){

		var mySelect = $(this).parent().find('select option');
		mySelect.remove();

		var parentOne = $(this).parent();
		var parentTwo = $(parentOne).parent();
		var parentThree = $(parentTwo).parent();

	    var id = $(parentThree).attr("data-prodid");

	    var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";
	    $('<select data-element='+id+'></select>').insertAfter(this);

	    $.getJSON(data, function(data) {
			$.each(data, function(key, val) {
			console.log(this);

			  var findSkus = val.items;

			  $(findSkus).each(function(){
			    var skuCor = this.Cor[0];
			    var skusTamanho = this.Tamanho[0];
			    var itemID = this.itemId;
			    var SKUlinks = this.sellers[0].addToCartLink;

				$('[data-element="' + id + '"]').append("<option id="+itemID+" class='skuSize' value="+SKUlinks+"><span class='cor-content'>Cor: "+skuCor+"</span><span class='tamanho-content'> Tamanho: "+skusTamanho+"</span></option>");

				$('.shelfItem option').each(function(i) {
					$('[id="' + this.id + '"]').slice(1).remove();
				});
			  });
	        });
	    });
	});
});