var id = $('#___rc-p-id').attr("value");
var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";
var arr= new Array();

$.getJSON(data, function(data) {
    $.each(data, function(key, val) {
        var elements = val.items[0].sellers[0].commertialOffer.BuyTogether;
        $(elements).each(function(data, val){
            var myNum = "/api/catalog_system/pub/products/search/?fq=productId:"+this+"";
            arr.push(myNum);
            return arr;
        });
    });
});

