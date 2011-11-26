/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust various aspects of a css3 linear gradient.
 * 
 * Before a widget is created, the html must have been generated from the template first!
 * widgets don't generate html, they layer functionality on top of the html
 * 
 */

//setup the namespaces
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.widgets == 'undefined'){ uiDesignTools.gradients.widgets = {}; }

//widget for making gradients. don't call this before the document is ready.
uiDesignTools.gradients.widgets.linearGradientMakerWidget = function(optionsParam){
	var self = this;//for handlers and whatnots
	
	//default options
	this.options = {
		linearGradientCssTemplate : uiDesignTools.gradients.templates.linearGradient.linearGradientCssTemplate, //function used to generate html
		linearGradientModel : {}, //should be typeof uiDesignTools.gradients.models.linearGradient
		$linearGradientMaker : false //jquery wrapper representation of the html this widget works with.
	};
	//merge default options with passed in options
	$.extend(this.options, optionsParam);
	
	//initialize jquery objects
	this.$linearGradientMakerControls = $('#linearGradientMakerControls', this.options.$linearGradientMaker);//controls hold the colorStops, and any other widget which allows us to tweak the output
	this.$colorStops = $('#colorStops', this.$linearGradientMakerControls);//colorstops allow us to tweak the output (generated gradient)
	this.$gradientOutput = $('#gradientOutput', this.options.$linearGradientMaker);
	
	this.colorStopWidgets = [];//array of colorStopWidgets which each represent a colorStop in this linear gradient
	this.createColorStopWidgets();
	
	//subscribe to colorstop changed events so we can re-render our output
	this.subscribeToColorStopModelUpdate();
	
	//we must first generate the html for the widget
	//todo. initial values of controls should match model
	
	// this.controls = {
		// $redRangeInput : $('#redRange', this.$gradientWidgetContainer), //only search within the widget for the range
		// $greenRangeInput : $('#greenRange', this.$gradientWidgetContainer), 
		// $blueRangeInput : $('#blueRange', this.$gradientWidgetContainer), 
		// $alphaRangeInput : $('#alphaRange', this.$gradientWidgetContainer),
		// $gradientOutput : $('#gradientOutput', this.$gradientWidgetContainer)
	// };

	
};//end linearGradientMakerWidget

//when any of our color stops has been updated, we need to update/render the gradientOutput
uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.subscribeToColorStopModelUpdate = function(){
	var self = this;//so call back functions can access method of this.
	
	//when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
	//re-render the gradientOuput so that it reflects the change the user made.
	function handleColorStopModelUpdate(event){
		//don't know if we'll need the passed in colorStop data and update our own, or if it will be made by ref.
		
		//for now
		self.refreshGradientOutput();
	}
	
	//subscribe to the event
	uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].subscribe(handleColorStopModelUpdate);
};

//creates colorStopWidgets by constructing the jquery wrapper $colorStop
uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.createColorStopWidgets = function(){
	var colorStopModels = this.options.linearGradientModel.options.colorStops;
	for(var i = 0; i < colorStopModels.length; ++i){
		var colorStopModel = colorStopModels[i];
		//create a color stop widget
		var colorStopWidget = new uiDesignTools.gradients.widgets.colorStopWidget({
			$colorStop : $('#' + colorStopModel.options.colorStopId, this.options.linearGradientMaker), //<-- jquery wrapper $colorStop created here.
			colorStopModel : colorStopModel
		});
		this.colorStopWidgets.push(colorStopWidget);//add the newly created widget to our internal collection
	}
};

//after an update to the linearGradientModel has been made, most likely this function should be called.
uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.refreshGradientOutput = function(){
	//generate the background: linear-gradient css style using the updated model
	var newLinearGradientCssText = this.options.linearGradientCssTemplate({linearGradient : this.options.linearGradientModel});
	//update the css
	this.$gradientOutput[0].style.cssText = newLinearGradientCssText;
};
