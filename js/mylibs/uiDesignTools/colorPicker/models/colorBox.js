/**
 * @author Jason McAffee
 * represents a small colorbox inside the colorpicker
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
if(typeof uiDesignTools.colorPicker.models == 'undefined'){ uiDesignTools.colorPicker.models = {}; }

uiDesignTools.colorPicker.models.colorBox = function(optionsParam){
	this.options = {
		//boxColorCssText : "", //to be written to the style attribute to give the box it's background color
		colorBoxId : "notSet", //id written to the color box
		rgba : {red:1, green:1, blue:1, alpha:1} //rgba to be used
	};
	
	$.extend(this.options, optionsParam);
	
};

uiDesignTools.colorPicker.models.colorBox.prototype.someFunction = function(){
	alert('someFunction called');
};
