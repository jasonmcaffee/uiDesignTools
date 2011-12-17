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
	
	var uniqueIdCount = 0;
	
	function colorPickerWidget(optionsParam){
		this.options = {
			uniqueId : uniqueIdCount++,//useful for event filtering (eg i only care about events from the colorPickerWidget with the uniqueId of '23')
			$colorPicker : false, //jquery container for this widget
			colorPickerModel : {}, //model used to drive this colorPickerWidget
			colorBoxesTemplate : colorBoxTemplate.colorBoxesTemplate, //need this separate so we can just refresh the html for the colorboxes, but not for the hue input range
			colorPickerInnerContentsTemplate : colorBoxTemplate.colorPickerInnerContentsTemplate, //all the inner html of this widget. template should call color picker template
			colorPickerMinimizedTemplate : colorBoxTemplate.colorPickerMinimizedTemplate, //regen minimized background color when user clicks a colorBox
			colorBoxesDivId: "colorBoxesDiv", //this div is inside of the colorPickerExpanded div, and is the container for all the colorBoxes (all variances in saturation and brightness for a given hue color)
			colorPickerMinimizedDivId : "colorPickerMinimized",
			colorPickerMinimizedContainerDivId : "colorPickerMinimizedContainer",
			colorPickerExpandedDivId : "colorPickerExpanded"
		};
		
		$.extend(this.options, optionsParam);
		
//generate html for innerHtml of the colorPicker, including colorBoxes and hue range input
		this.generateInnerHtmlAndAppend();

//jquery objects
		this.$colorPickerMinimizedContainer = $("#" + this.options.colorPickerMinimizedContainerDivId, this.options.$colorPicker);
		this.$colorPickerMinimized = $("#" + this.options.colorPickerMinimizedDivId, this.options.$colorPicker);//always shown. when clicked, we will show the expanded modal.
		this.$colorPickerExpanded = $("#" + this.options.colorPickerExpandedDivId, this.options.$colorPicker);//color picker modal which is shown when user clicks minimized representation. needed so we can show/hide this modal.
		this.$colorBoxesDiv = $("#" + this.options.colorBoxesDivId, this.options.$colorPicker);	//lives inside of expanded ^. needed so we can refresh the color boxes when the hue color input range changes.
		
//setup ui listeners
		this.registerClickHandlerForColorBoxes();//send events when a colorBox is clicked so we can do things like change the colorStop's input ranges to match what was selected by the user.
		this.registerHueColorChangeHandler();//regenerate colorBoxes when the hue color changes
		this.registerClickHandlerForColorPickerMinimized();//expand when minimized is clicked
		
//setup model listeners
		this.registerColorPickerModelChangedListener();
	};
	
//==================================================== UI Display ================================================
	colorPickerWidget.prototype.expandUI = function(){
		this.$colorPickerExpanded.show();
	};
	

	
//==================================================== Html Generation ===========================================
	
	//when the user clicks a colorBox, we need to change the background color of minimized so it reflects the color which was chosen.
	colorPickerWidget.prototype.refreshColorPickerMinimizedContainerHtml = function(){
		var newHtml = this.options.colorPickerMinimizedTemplate({
			colorPickerModel: this.options.colorPickerModel, 
			colorPickerMinimizedDivId: this.options.colorPickerMinimizedDivId
		});
		this.$colorPickerMinimizedContainer[0].innerHTML = newHtml;
	}
	
	//for first time construction of inner html. subsequent generation should just be for the colorBoxes
	colorPickerWidget.prototype.generateInnerHtmlAndAppend  = function(){
		//call the template to get the colorBoxes Html
		var innerHtml = this.options.colorPickerInnerContentsTemplate({
			colorPickerModel:this.options.colorPickerModel, 
			colorBoxesDivId: this.options.colorBoxesDivId,
			colorPickerExpandedDivId: this.options.colorPickerExpandedDivId,
			colorPickerMinimizedDivId : this.options.colorPickerMinimizedDivId,
			colorPickerMinimizedContainerDivId : this.options.colorPickerMinimizedContainerDivId
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
	
	//when the minimized version (small box with background color) is clicked, we want to popup a modal (expanded) so the user can pick a color via clicking on the colorBox.
	colorPickerWidget.prototype.registerClickHandlerForColorPickerMinimized = function(){
		var self = this;
		
		function handleColorPickerMinimizedClicked(event){
			self.expandUI();
		}
		
		this.options.$colorPicker.on('click', '#'+this.options.colorPickerMinimizedDivId, handleColorPickerMinimizedClicked);
	};
	
	//when the user selects a color (ie clicks on a color box), we need to do something.
	// * !! indirectly calls the colorStopWidget to refresh its UI via the colorPickerNewColorSelected event.
	colorPickerWidget.prototype.registerClickHandlerForColorBoxes = function(){
		var self = this;
		
		function handleColorBoxClick(e){
			var findColorBoxInRow = e.data.rowNumber;
			var findColorBoxInColumn = e.data.columnNumber;
			
			//var selectedColorBox = e.data.colorBox;
			var selectedColorBox = self.options.colorPickerModel.options.colorBoxRows[findColorBoxInRow].colorBoxes[findColorBoxInColumn];
			//alert("color box clicked " + selectedColorBox.options.colorBoxId);
			
			//update our colorPickerModel's currently selected rgba property to reflect what the user just clicked.
			self.options.colorPickerModel.currentlySelectedRGBA = selectedColorBox.options.rgba;  //<-- the rgba isn't right here when the hue color slider changes, this isn't updated.
			
			console.log('currentlySelectedRGBA - red :' + self.options.colorPickerModel.currentlySelectedRGBA.red + " green : " + self.options.colorPickerModel.currentlySelectedRGBA.green + " blue : " + self.options.colorPickerModel.currentlySelectedRGBA.blue);
			//need to set huecolor as well, so minimized can gen the right background color
			//self.options.colorPickerModel.options.hueColor =    ????????????????
			
			//refresh the minimized background color to reflect what the user selected.
			self.refreshColorPickerMinimizedContainerHtml();
			
			//the colorStopWidget listens for this event so it can make updates to its UI.
			uiDesignTools.events.eventManager.events['colorPickerNewColorSelected'].publish({
				selectedRGBA : selectedColorBox.options.rgba,
				originatingColorPickerWidgetUniqueId : self.options.uniqueId	//so people can filter
			});
			
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
					//colorBox : colorBox //this becomes outdated when the colorbox rows are regened when the user moves the hue color slider.!!!!!!!!!!!!!!!!!!!  use an index instead. have the colorPickerModel in the handler grab the colorBox by index.
					rowNumber : j,
					columnNumber : i
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
