/**
 * @author Jason McAffee
 * represents a small colorbox inside the colorpicker ( a large range of saturation and brightness for a given hue color)
 * 
 */
define([
	'mylibs/uiDesignTools/uiDesignTools', //core library
	'libs/jquery/jqueryModule'
], function(uiDesignTools, $){
	
	function colorBox(optionsParam){
		this.options = {
			colorBoxId : "notSet", //id written to the color box
			rgba : {red:1, green:1, blue:1, alpha:1} //rgba to be used
		};
		
		$.extend(this.options, optionsParam);
		
		
	};
	
	colorBox.prototype.someFunction = function(){
		//alert('someFunction called');
	};
	
	//return our export for this module
	return colorBox;
});//end define