/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 * 
 * linearGradient extends uiDesignTools.gradients.models.gradient
 */

//namespace setup/ensurance
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.models == 'undefined'){ uiDesignTools.gradients.models = {}; }

//linear gradient definition
uiDesignTools.gradients.models.linearGradient = function(optionsParam){
	//default options
	this.options = {
		//angle will only be used if sideOrCorner is not set.
		angle : 0,
		//if this has a value, angle will not be used
		sideOrCorner : 'top' //[left | right] || [top | bottom]
	};
	
	//merge passed in options with default options
	$.extend(this.options, optionsParam);
	
	//fully initialize by calling our prototype
	uiDesignTools.gradients.models.gradient.call(this, this.options);

};//end linearGradient

//linearGradient extends gradient
uiDesignTools.gradients.models.linearGradient.prototype = new uiDesignTools.gradients.models.gradient({});

//adds the colorstop and emits event colorStopModelHasBeenAdded
uiDesignTools.gradients.models.linearGradient.prototype.addColorStop = function(colorStopToAdd){
	//add the color stop
	this.options.colorStops.push(colorStopToAdd);
	//emit the event
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'].publish({colorStop:colorStopToAdd});
}

uiDesignTools.gradients.models.linearGradient.prototype.removeColorStop = function(colorStopToRemove){
	//remove the model from our collection
	var colorStops = this.options.colorStops;
	var indexToRemove = colorStops.indexOf(colorStopToRemove);
	colorStops.splice(indexToRemove, 1);
	//emit the event
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'].publish({colorStop:colorStopToRemove});
}
