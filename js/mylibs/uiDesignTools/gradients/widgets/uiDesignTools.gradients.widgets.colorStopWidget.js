/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust the color stop color and opacity.
 * 
 * @requires eventManager
 */

//setup the namespaces
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.widgets == 'undefined'){ uiDesignTools.gradients.widgets = {}; }
//only create colorStop events once, when this script is loaded
if(typeof uiDesignTools.gradients.widgets.colorStopEventsHaveBeenSetUp == 'undefined'){ 
	//define event for when the colorStop model has been changed (usually through ui interaction)
	uiDesignTools.events.eventManager.events['colorStopModelHasChanged'] = new uiDesignTools.events.uiDesignToolsEvent({type:'colorStopModelHasChanged'});
	
	//don't do this again
	uiDesignTools.gradients.widgets.colorStopEventsHaveBeenSetUp = true; 
}


/**
 * colorStopWidget constructor function
 * calling this constructor will return a new colorStopWidget (when new keyword is used)
 * this will result in the html representation for this widget getting added to the $parent[0].innerHTML
 * @requires @param colorStopModel model representation of a color stop (has rgba)
 * @requires @param colorStopDivId the id for the div which is the html representation of the colorStop
 * @requires @param $parent the jquery wrapper for the containing element of this color stop
 * 
 */
uiDesignTools.gradients.widgets.colorStopWidget = function(optionsParam){
	
	//default options
	this.options = {
		colorStopModel : {}, //model used to dictate rgba values
		colorStopTemplate : uiDesignTools.gradients.templates.colorStop.colorStopTemplate, //<div id="colorStopX"> + inner content + </div>
		colorStopInnerContentTemplate : uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate, //red, green, blue, alpha sliders html generator
		colorStopDivId : 0, //id which will be used to 
		$parent : false //jquery parent to this $colorStop
	};
	$.extend(this.options, optionsParam);//merge default options with passed in options.
	
	//create jquery representation of this widget
	this.$colorStopDiv = false; //can't initialize this until first render
	
	//register slide listeners on $colorStopDiv
	//render the html by adding it to the $parent[0].innerHTML
	//this.initAndRender();
	this.init();
}

//first time initialization
uiDesignTools.gradients.widgets.colorStopWidget.prototype.init = function(){
	//add event handling for sliders/ranges for red green blue alpha
	this.registerSliderChangeHandlers();
}

//returns html representation of this widget
uiDesignTools.gradients.widgets.colorStopWidget.prototype.toHtml = function(){
	return this.options.colorStopTemplate({colorStopId : this.options.colorStopDivId});
}
//render for the first time. subsequent calls should be made to refreshUI
//uiDesignTools.gradients.widgets.colorStopWidget.prototype.initAndRender = function(){
uiDesignTools.gradients.widgets.colorStopWidget.prototype.initAndRender = function(){
//Render
	//generate the new html by 	
	var colorStopHtml = this.options.colorStopTemplate({colorStopId : this.options.colorStopDivId});
	//this is first render, so we need to append html to parent
	this.options.$parent[0].innerHTML += colorStopHtml;
	
//Initialize
	//initialize jquery representation by searching the parent for the new div colorStop
	this.$colorStopDiv = $("#"+this.options.colorStopDivId, this.options.$parent);
	
	this.init();
}

//adds on change events to the appropriate sub widgets (redRange, etc)
uiDesignTools.gradients.widgets.colorStopWidget.prototype.registerSliderChangeHandlers = function(){
	var self = this;//for anonymous functions, callbacks, etc.
//Helper functions	
	//first define a helper function to assist in registering change handlers. (lessens repetitive code)
	function registerColorStopRangeChangeHandlerFor(rangeIdSelector, colorStopIndex, rgbaColorPropertyBeingUpdated){
		self.$colorStopDiv.on("change", rangeIdSelector, 
			{//event data
				colorStopIndex : colorStopIndex,//access the correct color stop
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
			colorStop.options.rgba[rgbaColorPropertyBeingUpdated] = rangeValue;
			
			//re-render
			//self.renderGradientOutput();
			//emit event.
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
	
	
}

//just update the inner contents.
uiDesignTools.gradients.widgets.colorStopWidget.prototype.refreshUI = function(){
	var newHtmlText = this.options.colorStopInnerContentTemplate(null);
	this.$colorStopDiv[0].innerHTML = newHtmlText;
}
