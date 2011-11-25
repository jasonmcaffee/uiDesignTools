

//setup the namespaces
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.widgets == 'undefined'){ uiDesignTools.gradients.widgets = {}; }

//widget for making gradients. don't call this before the document is ready.
uiDesignTools.gradients.widgets.linearGradientMakerWidget = function(optionsParam){
	var self = this;//for handlers and whatnots
	
	//default options
	this.options = {
		gradientWidgetContainerId : 'linearGradientWidgetContainer',
		linearGradientCssTemplate : uiDesignTools.gradients.templates.linearGradient.linearGradientCssTemplate, //function used to generate html
		linearGradientModel : {} //should be typeof uiDesignTools.gradients.models.linearGradient
	};
	//merge default options with passed in options
	$.extend(this.options, optionsParam);
	
	//initialize jquery objects
	this.$gradientWidgetContainer = $('#'+this.options.gradientWidgetContainerId);
	
	//we must first generate the html for the widget
	//todo. initial values of controls should match model
	
	this.controls = {
		$redRangeInput : $('#redRange', this.$gradientWidgetContainer), //only search within the widget for the range
		$greenRangeInput : $('#greenRange', this.$gradientWidgetContainer), 
		$blueRangeInput : $('#blueRange', this.$gradientWidgetContainer), 
		$alphaRangeInput : $('#alphaRange', this.$gradientWidgetContainer),
		$gradientOutput : $('#gradientOutput', this.$gradientWidgetContainer)
	};
	

	function registerColorStopRangeChangeHandlerFor(rangeIdSelector, colorStopIndex, rgbaColorPropertyBeingUpdated){
		self.$gradientWidgetContainer.on("change", rangeIdSelector, 
			{//event data
				colorStopIndex : colorStopIndex,//access the correct color stop
				rgbaColorPropertyBeingUpdated : rgbaColorPropertyBeingUpdated//used to access the appropriate property on the colorStop model
			}, 
			colorStopRangeChangeHandler);
	}
	
	registerColorStopRangeChangeHandlerFor("#redRange", 0, "red");
	registerColorStopRangeChangeHandlerFor("#greenRange", 0, "green");
	registerColorStopRangeChangeHandlerFor("#blueRange", 0, "blue");
	registerColorStopRangeChangeHandlerFor("#alphaRange", 0, "alpha");
	
	//handles when red slider is manipulated. todo: determine which color stop was chosen.
	function colorStopRangeChangeHandler(e){
		//get value
		var rangeValue = $(this).val(),
			  rgbaColorPropertyBeingUpdated = e.data.rgbaColorPropertyBeingUpdated,
				colorStopIndex = e.data.colorStopIndex;
				
		//change model
		//todo: find correct color stop
		var colorStop = self.options.linearGradientModel.options.colorStops[colorStopIndex];
		colorStop.options.rgba[rgbaColorPropertyBeingUpdated] = rangeValue;
		//re-render
		self.renderGradientOutput();
	}
	
};//end linearGradientMakerWidget



//after an update to the linearGradientModel has been made, most likely this function should be called.
uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.renderGradientOutput = function(){
	//generate the background: linear-gradient css style using the updated model
	var newLinearGradientCssText = this.options.linearGradientCssTemplate({linearGradient : this.options.linearGradientModel});
	//update the css
	this.controls.$gradientOutput[0].style.cssText = newLinearGradientCssText;
};
