/**
 * @author Jason McAffee
 * represents a small colorbox inside the colorpicker ( a large range of saturation and brightness for a given hue color)
 * 
 */

// if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
// if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
// if(typeof uiDesignTools.colorPicker.models == 'undefined'){ uiDesignTools.colorPicker.models = {}; }
define([], function(){
	
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