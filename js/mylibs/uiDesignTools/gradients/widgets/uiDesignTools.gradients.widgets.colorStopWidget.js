/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust the color stop color and opacity.
 * The sub elements typically found in a color stop include <input type="range"> for red, blue, green, and opacity.
 * 
 * Before a widget is created, the html must have been generated from the template first!
 * widgets don't generate html, they layer functionality on top of the html
 * 
 * @requires eventManager
 */

//setup the namespaces
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.widgets == 'undefined'){ uiDesignTools.gradients.widgets = {}; }
//only create colorStop events once, when this script is loaded
if(typeof uiDesignTools.gradients.widgets.colorStopEventsHaveBeenSetUp == 'undefined' || !uiDesignTools.gradients.widgets.colorStopEventsHaveBeenSetUp){ 
	//define event for when the colorStop model has been changed (usually through ui interaction)
	uiDesignTools.events.eventManager.events['colorStopModelHasChanged'] = new uiDesignTools.events.uiDesignToolsEvent({type:'colorStopModelHasChanged'});
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'] = new uiDesignTools.events.uiDesignToolsEvent({type:'colorStopModelHasBeenAdded'});
	//don't do this again
	uiDesignTools.gradients.widgets.colorStopEventsHaveBeenSetUp = true; 
}


/**
 * colorStopWidget constructor function
 * calling this constructor will return a new colorStopWidget (when new keyword is used)
 * this will result in the html representation for this widget getting added to the $parent[0].innerHTML
 * @requires @param colorStopModel model representation of a color stop (has rgba)
 * @requires @param $colorStop the jquery wrapper for the element that this widget resides in.
 * 
 */
uiDesignTools.gradients.widgets.colorStopWidget = function(optionsParam){
	
	//default options
	this.options = {
		colorStopModel : {}, //model used to dictate rgba values
		colorStopTemplate : uiDesignTools.gradients.templates.colorStop.colorStopTemplate, //<div id="colorStopX"> + inner content + </div> <--NOT NEEDED. TODO: DELETE. ONLY NEED INNERCONTENTS TEMPLATE
		colorStopInnerContentTemplate : uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate, //red, green, blue, alpha sliders html generator 
		$colorStop : false //jquery representation must be given.
	};
	$.extend(this.options, optionsParam);//merge default options with passed in options.

	//listen for change events emitted by the red,green,blue, alpha sliders/range inputs.
	this.registerSliderChangeHandlers();

}

//adds on change events to the appropriate sub widgets (redRange, etc)
uiDesignTools.gradients.widgets.colorStopWidget.prototype.registerSliderChangeHandlers = function(){
	var self = this;//for anonymous functions, callbacks, etc.
//Helper functions	
	//first define a helper function to assist in registering change handlers. (lessens repetitive code)
	function registerColorStopRangeChangeHandlerFor(rangeIdSelector, colorStopIndex, rgbaColorPropertyBeingUpdated){
		self.options.$colorStop.on("change", rangeIdSelector, 
			{//event data
				colorStopIndex : colorStopIndex,//access the correct color stop ( not really needed, as it's updated by reference)
				rgbaColorPropertyBeingUpdated : rgbaColorPropertyBeingUpdated//used to access the appropriate property on the colorStop model
			}, 
			colorStopRangeChangeHandler);
		
		//sub helper function (reduce scope)
		//handles when red slider is manipulated. todo: determine which color stop was chosen.
		function colorStopRangeChangeHandler(e){
			//get value
			var rangeValue = $(this).val(),
				  rgbaColorPropertyBeingUpdated = e.data.rgbaColorPropertyBeingUpdated,
					colorStopIndex = e.data.colorStopIndex;
					
			//update model to reflect ui selection
			var colorStop = self.options.colorStopModel;
			//eww hacky to avoid refactoring these helper methods. ewww
			if(rgbaColorPropertyBeingUpdated == "position"){
				colorStop.options.position = rangeValue;
			}else{
				colorStop.options.rgba[rgbaColorPropertyBeingUpdated] = rangeValue;
			}
			//re-render
			//self.renderGradientOutput();
			//emit event so that others can update outputs (such as gradient output)
			uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].publish({
				colorStop : colorStop
			});
		}//end colorStopRangeChangeHandler
		
	}//end registerColorStopRangeChangeHandlerFor
	
	

//Register change handlers	
	//register
	registerColorStopRangeChangeHandlerFor("#redRange", 0, "red");
	registerColorStopRangeChangeHandlerFor("#greenRange", 0, "green");
	registerColorStopRangeChangeHandlerFor("#blueRange", 0, "blue");
	registerColorStopRangeChangeHandlerFor("#alphaRange", 0, "alpha");
	registerColorStopRangeChangeHandlerFor("#positionRange", 0, "position");
}

//just update the inner contents.
uiDesignTools.gradients.widgets.colorStopWidget.prototype.refreshUI = function(){
	var newHtmlText = this.options.colorStopInnerContentTemplate({colorStop:this.options.colorStopModel});
	this.$colorStopDiv[0].innerHTML = newHtmlText;
}
