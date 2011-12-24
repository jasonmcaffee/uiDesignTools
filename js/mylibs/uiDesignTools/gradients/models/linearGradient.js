/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 * 
 * linearGradient extends uiDesignTools/gradients/models/gradient
 */


define([
	'mylibs/uiDesignTools/uiDesignTools', //core library
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/gradients/models/gradient' //todo: add event requirement or perhaps uidesigntools.js
], function(uiDesignTools, $, gradient){
	
	//linear gradient definition
	function linearGradient(optionsParam){
		//default options
		this.options = {
			//angle will only be used if sideOrCorner is not set.
			angle : 0,
			//if this has a value, angle will not be used
			sideOrCorner : 'top', //[left | right] || [top | bottom]
			oldWebKitSideOrCorner : { //right top | left top | right bottom | right top
				startPosition : 'left top',
				endPosition : 'left bottom'
			},
			gradientType : 'linear' //linear circular eliptical repeating
		};
		
		//merge passed in options with default options
		$.extend(this.options, optionsParam);
		
		//fully initialize by calling our prototype
		gradient.call(this, this.options);
	
	};//end linearGradient
	
	//linearGradient extends gradient
	linearGradient.prototype = new gradient({});
	
	
	
	linearGradient.prototype.setGradientType = function(gradientType){
		this.options.gradientType = gradientType;
		
		//uiDesignTools.events.eventManager.events['gradientTypeHasBeenUpdated'].publish({colorStop:colorStopToAdd});  ???
		
	};
	
	//adds the colorstop and emits event colorStopModelHasBeenAdded
	linearGradient.prototype.addColorStop = function(colorStopToAdd){
		//add the color stop
		this.options.colorStops.push(colorStopToAdd);
		//emit the event
		uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'].publish({colorStop:colorStopToAdd});
		uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'].publish({linearGradient: this});//let the cssOutputWidget know that something changed and it needs to refresh its output.
	};
	
	linearGradient.prototype.removeColorStop = function(colorStopToRemove){
		//remove the model from our collection
		var colorStops = this.options.colorStops;
		var indexToRemove = colorStops.indexOf(colorStopToRemove);
		colorStops.splice(indexToRemove, 1);
		//emit the event
		uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'].publish({colorStop:colorStopToRemove});
		uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'].publish({linearGradient: this});//let the cssOutputWidget know that something changed and it needs to refresh its output.
	};
	
	//use this method when you want to emit the event
	linearGradient.prototype.setSideOrCorner = function(sideOrCorner){
		this.options.sideOrCorner = sideOrCorner;
		
		//now set the old webkit specific model
		switch(this.options.sideOrCorner){
			case "top left":
				this.options.oldWebKitSideOrCorner.startPosition = "left top";
				this.options.oldWebKitSideOrCorner.endPosition = "right bottom";
				break;
			case "top right":
				this.options.oldWebKitSideOrCorner.startPosition = "right top";
				this.options.oldWebKitSideOrCorner.endPosition = "left bottom";
				break;
			case "top":
				this.options.oldWebKitSideOrCorner.startPosition = "left top";
				this.options.oldWebKitSideOrCorner.endPosition = "left bottom";
			  break;
			case "bottom":
				this.options.oldWebKitSideOrCorner.startPosition = "left bottom";
				this.options.oldWebKitSideOrCorner.endPosition = "left top";
				break;
			case "bottom left":
				this.options.oldWebKitSideOrCorner.startPosition = "left bottom";
				this.options.oldWebKitSideOrCorner.endPosition = "right top";
				break;
			case "bottom right":
				this.options.oldWebKitSideOrCorner.startPosition = "right bottom";
				this.options.oldWebKitSideOrCorner.endPosition = "left top";
				break;
			case "right":
				this.options.oldWebKitSideOrCorner.startPosition = "right top";
				this.options.oldWebKitSideOrCorner.endPosition = "left top";
				break;
			case "left":
				this.options.oldWebKitSideOrCorner.startPosition = "left top";
				this.options.oldWebKitSideOrCorner.endPosition = "right top";
				break;
		}
		uiDesignTools.events.eventManager.events['linearGradientModelSideOrCornerHasChanged'].publish({linearGradient: this});//for linear gradient widget update... may not be needed.
		uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'].publish({linearGradient: this});//let the cssOutputWidget know that something changed and it needs to refresh its output.
		
	};
	
	return linearGradient;
})

