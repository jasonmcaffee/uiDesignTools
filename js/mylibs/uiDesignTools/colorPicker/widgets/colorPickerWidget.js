/**
 * @author Jason McAffee
 * widget used for picking a color. 
 * a single hue is displayed at a time (value 1-359)
 * each variance in brightness (bottom to top, 0-100) and saturation (left to right, 100-0) is displayed.
 * includes a hue slider to change the base color
 */

// if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
// if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
// if(typeof uiDesignTools.colorPicker.widgets == 'undefined'){ uiDesignTools.colorPicker.widgets = {}; }

define([
	'mylibs/uiDesignTools/uiDesignTools',
	'mylibs/uiDesignTools/colorPicker/templates/colorBoxTemplateModule'
], function(uiDesignTools, colorBoxTemplate){
	
	function colorPickerWidget(optionsParam){
		this.options = {
			$colorPicker : false,
			colorPickerModel : {}, //model used to drive this colorPickerWidget
			colorBoxesTemplate : colorBoxTemplate.colorBoxesTemplate
		};
		
		$.extend(this.options, optionsParam);
		
		//generate html for colorBoxes
		this.generateInnerHtmlAndAppend();
		
		//setup click listener
		this.registerClickHandlerForColorBoxes();
	};
	
	
	colorPickerWidget.prototype.generateInnerHtmlAndAppend  = function(){
		//call the template to get the colorBoxes Html
		var innerHtml = this.options.colorBoxesTemplate({
			colorBoxRows:this.options.colorPickerModel.options.colorBoxRows, 
			colorBoxesDivId: "whatever"
		});
		
		//update the Dom
		this.options.$colorPicker.append(innerHtml);
	};
	
	//==================================================== Event Registry ===========================================
	colorPickerWidget.prototype.registerClickHandlerForColorBoxes = function(){
		var self = this;
		
		function handleColorBoxClick(e){
			var selectedColorBox = e.data.colorBox;
			alert("color box clicked " + selectedColorBox.options.colorBoxId);
			e.preventDefault();
			return false;
		}
		
		//iterate over each colorbox and register the click handler
		var colorBoxRows = this.options.colorPickerModel.options.colorBoxRows;
		for(var j = 0; j < colorBoxRows.length; ++j){
			var colorBoxRow = colorBoxRows[j];
			
			for(var i = 0; i < colorBoxRow.colorBoxes.length; ++i){
				var colorBox = colorBoxRow.colorBoxes[i];
				//register click
				this.options.$colorPicker.on("click", "#"+colorBox.options.colorBoxId, //TODO: I believe this is a performance hit. 
				{ //event data
					colorBox : colorBox
				},
				handleColorBoxClick);
			}
		}
		
	};
	
	//return our define export for this module
	return colorPickerWidget;

});//end define
