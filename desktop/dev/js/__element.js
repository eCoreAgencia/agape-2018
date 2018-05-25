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
