/**
 * @author Jason McAffee
 * 
 * @requires colorBox model
 * @requires colorBoxTemplate
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
if(typeof uiDesignTools.colorPicker.models == 'undefined'){ uiDesignTools.colorPicker.models = {}; }

uiDesignTools.colorPicker.models.colorPicker = function(optionsParam){
	this.options = {
		colorBoxes : []//, //array of colorBox models
		//colorBoxRgbaBackgroundColorTemplate : uiDesignTools.colorPicker.templates.colorBox.simpleRgbaBackgroundColorTemplate //default template

	};
	
	$.extend(this.options, optionsParam);
	
	//only create if the user hasn't passed in defined colorBoxes
	if(this.options.colorBoxes.length == 0){
		this.createColorBoxes();
	}
	
	
	
}

//creates an array of colorBox models and pushes them to this.options.colorBoxes
uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBoxes = function(){
	
	var max = 255;
	var increment = 25;
	for(var red = 1; red <= max; red+=increment){
		for(var green = 1; green <= max; green+=increment){
			for(var blue = 1; blue <= max; blue+=increment){
				var colorBox = this.createColorBox({red: red, green: green, blue:blue, alpha: 1});
				this.options.colorBoxes.push(colorBox);
			}
		}
	}
	console.log('done creating colorBoxes');
}


uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBox = function(rgba){
	//var generatedBackgroundCssText = this.options.colorBoxRgbaBackgroundColorTemplate({rgba: rgba});  //don't do this. performance nightmare with so many objects keeping the text in memory
	
	var colorBox = new uiDesignTools.colorPicker.models.colorBox({
		//boxColorCssText : generatedBackgroundCssText,
		colorBoxId : this.generateColorBoxId(rgba),
		rgba : rgba
	});
	
	return colorBox;
}

uiDesignTools.colorPicker.models.colorPicker.prototype.generateColorBoxId = function(rgba){
	return "colorBox_" + rgba.red + "_" + rgba.green + "_" + rgba.blue;
}
