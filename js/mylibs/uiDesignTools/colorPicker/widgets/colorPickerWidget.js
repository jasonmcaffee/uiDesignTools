/**
 * @author Jason McAffee
 * widget used for picking a color. 
 * a single hue is displayed at a time (value 1-359)
 * each variance in brightness (bottom to top, 0-100) and saturation (left to right, 100-0) is displayed.
 * includes a hue slider to change the base color
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/colorPicker/templates/colorBoxTemplateModule',
	'mylibs/uiDesignTools/colorPicker/models/colorPicker'
], function(uiDesignTools, $, colorBoxTemplate){
	
	function colorPickerWidget(optionsParam){
		this.options = {
			$colorPicker : false,
			colorPickerModel : {}, //model used to drive this colorPickerWidget
			colorBoxesTemplate : colorBoxTemplate.colorBoxesTemplate, //need this separate so we can just refresh the html for the colorboxes, but not for the hue input range
			colorPickerInnerContentsTemplate : colorBoxTemplate.colorPickerInnerContentsTemplate, //all the inner html of this widget. template should call color picker template
			colorBoxesDivId: "colorBoxesDiv", //this div is inside of the colorPickerExpanded div, and is the container for all the colorBoxes (all variances in saturation and brightness for a given hue color)
			colorPickerMinimizedDivId : "colorPickerMinimized",
			colorPickerExpandedDivId : "colorPickerExpanded"
		};
		
		$.extend(this.options, optionsParam);
		
//generate html for innerHtml of the colorPicker, including colorBoxes and hue range input
		this.generateInnerHtmlAndAppend();

//jquery objects
		this.$colorPickerMinimized = $("#" + this.options.colorPickerMinimizedDivId, this.options.$colorPicker);//always shown. when clicked, we will show the expanded modal.
		this.$colorPickerExpanded = $("#" + this.options.colorPickerExpandedDivId, this.options.$colorPicker);//color picker modal which is shown when user clicks minimized representation. needed so we can show/hide this modal.
		this.$colorBoxesDiv = $("#" + this.options.colorBoxesDivId, this.options.$colorPicker);	//lives inside of expanded ^. needed so we can refresh the color boxes when the hue color input range changes.
		
//setup ui listeners
		this.registerClickHandlerForColorBoxes();
		this.registerHueColorChangeHandler();
		
//setup model listeners
		this.registerColorPickerModelChangedListener();
	};
	
//==================================================== UI Display ================================================
	colorPickerWidget.prototype.expandUI = function(){
		this.$colorPickerExpanded.show();
	};
	

	
//==================================================== Html Generation ===========================================
	
	//for first time construction of inner html. subsequent generation should just be for the colorBoxes
	colorPickerWidget.prototype.generateInnerHtmlAndAppend  = function(){
		//call the template to get the colorBoxes Html
		var innerHtml = this.options.colorPickerInnerContentsTemplate({
			colorPickerModel:this.options.colorPickerModel, 
			colorBoxesDivId: this.options.colorBoxesDivId,
			colorPickerExpandedDivId: this.options.colorPickerExpandedDivId,
			colorPickerMinimizedDivId : this.options.colorPickerMinimizedDivId
		});
		
		//update the Dom
		this.options.$colorPicker.append(innerHtml);
	};
	
	//when the colorPickerModel is updated, we need to refresh the html so all the colorBoxes to match the new hue color
	colorPickerWidget.prototype.refreshColorBoxes = function(){
		var newColorBoxesDivHtml = this.options.colorBoxesTemplate({
			colorPickerModel : this.options.colorPickerModel
		});
		
		//this.$colorBoxesDiv.replaceWith(newColorBoxesDivHtml);
		this.$colorBoxesDiv[0].innerHTML = newColorBoxesDivHtml;
		
		//we don't need to re-register events for colorboxes, as we will be using the same colorBox ids
		//this.registerClickHandlerForColorBoxes();
		
	};
	
//==================================================== Model Event Registry ===========================================
	
	//whenever the model changes (eg the hue range input changes, and our ui on change event fires) we need to refresh the colorboxes
	colorPickerWidget.prototype.registerColorPickerModelChangedListener = function(){
		var self = this;
		
		function handleColorPickerModelChanged(event){
			var newColorPickerModel = event.data.colorPicker;
			self.options.colorPickerModel = newColorPickerModel;//the new colorpickerModel has regened rows. since the reference is updated, don't really need this unless something else changes the model.
			
			//refresh ui so that the color Box Rows display the correct color
			//we'll have to regen the colorBoxRows
			//we don't need to re-register events for colorboxes, as we will be using the same colorBox ids
			self.refreshColorBoxes();
		}
		
		uiDesignTools.events.eventManager.events['colorPickerModelChanged'].subscribe(handleColorPickerModelChanged);
	};
	
	
//==================================================== UI Event Registry ===========================================
	
	//when the user selects a color (ie clicks on a color box), we need to do something.
	// * !! indirectly calls the colorStopWidget to refresh its UI via the colorPickerNewColorSelected event.
	colorPickerWidget.prototype.registerClickHandlerForColorBoxes = function(){
		var self = this;
		
		function handleColorBoxClick(e){
			var selectedColorBox = e.data.colorBox;
			alert("color box clicked " + selectedColorBox.options.colorBoxId);
			
			//update our colorPickerModel's currently selected rgba property to reflect what the user just clicked.
			self.options.colorPickerModel.currentlySelectedRGBA = selectedColorBox.options.rgba;
			
			//the colorStopWidget listens for this event so it can make updates to its UI.
			uiDesignTools.events.eventManager.events['colorPickerNewColorSelected'].publish({selectedRGBA : selectedColorBox.options.rgba});
			
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
	
	//when the ui input range changes, this will be used.
	colorPickerWidget.prototype.registerHueColorChangeHandler = function(){
		var self = this; //
		
		function handleHueColorChange(event){
			//get the new value 
			var newHueColor = $(this).val();
			//update model. model will emit updated event, which we listen for in handleColorPickerModelChanged
			self.options.colorPickerModel.setHueColor(newHueColor);
		}
		
		//register the on change handler
		this.options.$colorPicker.on('change', '#hueRange', handleHueColorChange);
		
	};
	
	
//=================================================== Export ============================================	
	//return our define export for this module
	return colorPickerWidget;

});//end define
