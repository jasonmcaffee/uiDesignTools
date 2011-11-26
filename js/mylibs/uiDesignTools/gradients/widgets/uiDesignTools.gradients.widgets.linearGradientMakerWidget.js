/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust various aspects of a css3 linear gradient.
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
		gradientWidgetContainerId : 'linearGradientWidgetContainer',
		linearGradientCssTemplate : uiDesignTools.gradients.templates.linearGradient.linearGradientCssTemplate, //function used to generate html
		linearGradientModel : {} //should be typeof uiDesignTools.gradients.models.linearGradient
	};
	//merge default options with passed in options
	$.extend(this.options, optionsParam);
	
	//initialize jquery objects
	this.$gradientWidgetContainer = $('#'+this.options.gradientWidgetContainerId);
	
	this.$colorStops = $('#colorStops', this.$gradientWidgetContainer);//<-- left off here....
	
	this.colorStopWidgets = [];//array of colorStopWidgets which each represent a colorStop in this linear gradient
	
	
	this.init();
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

uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.init = function(){
	this.createColorStopWidgets();
};

uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.toHtml = function(){
	var finalHtml = this.options.linearGradientCssTemplate({linearGradient:this.options.linearGradientModel});
	return finalHtml;
}

uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.createColorStopWidgets = function(){
	var colorStopModels = this.options.linearGradientModel.options.colorStops;
	for(var i = 0; i < colorStopModels.length; ++i){
		//create a color stop widget
		var colorStopWidget = new uiDesignTools.gradients.widgets.colorStopWidgets({
			$parent : this.$colorStops,
			colorStopDivId : "colorStop" + i,
			colorStopModel : colorStopModels[i]
		});
		this.colorStopWidgets.push(colorStopWidget);
	}
};

//after an update to the linearGradientModel has been made, most likely this function should be called.
uiDesignTools.gradients.widgets.linearGradientMakerWidget.prototype.renderGradientOutput = function(){
	//generate the background: linear-gradient css style using the updated model
	var newLinearGradientCssText = this.options.linearGradientCssTemplate({linearGradient : this.options.linearGradientModel});
	//update the css
	this.controls.$gradientOutput[0].style.cssText = newLinearGradientCssText;
};
