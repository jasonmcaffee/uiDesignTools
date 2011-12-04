/**
 * @author Jason McAffee
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
if(typeof uiDesignTools.colorPicker.widgets == 'undefined'){ uiDesignTools.colorPicker.widgets = {}; }

uiDesignTools.colorPicker.widgets.colorPickerWidget = function(optionsParam){
	this.options = {
		$colorPicker : false,
		colorPickerModel : {}, //model used to drive this colorPickerWidget
		colorBoxesTemplate : uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate
	};
	
	$.extend(this.options, optionsParam);
	
	//generate html for colorBoxes
	this.generateInnerHtmlAndAppend();
	
	//setup click listener
	this.registerClickHandlerForColorBoxes();
};


uiDesignTools.colorPicker.widgets.colorPickerWidget.prototype.generateInnerHtmlAndAppend  = function(){
	//call the template to get the colorBoxes Html
	var innerHtml = this.options.colorBoxesTemplate({
		colorBoxes:this.options.colorPickerModel.options.colorBoxes, 
		colorBoxesDivId: "whatever"
	});
	
	//update the Dom
	this.options.$colorPicker.append(innerHtml);
};

//==================================================== Event Registry ===========================================
uiDesignTools.colorPicker.widgets.colorPickerWidget.prototype.registerClickHandlerForColorBoxes = function(){
	var self = this;
	
	function handleColorBoxClick(e){
		var selectedColorBox = e.data.colorBox;
		alert("color box clicked " + selectedColorBox.options.colorBoxId);
	}
	
	//iterate over each colorbox and register the click handler
	for(var i = 0; i < this.options.colorPickerModel.options.colorBoxes.length; ++i){
		var colorBox = this.options.colorPickerModel.options.colorBoxes[i];
		//register click
		this.options.$colorPicker.on("click", "#"+colorBox.options.colorBoxId, 
		{ //event data
			colorBox : colorBox
		},
		handleColorBoxClick);
	}
	
};