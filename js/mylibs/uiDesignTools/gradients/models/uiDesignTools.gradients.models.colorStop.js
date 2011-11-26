/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 * 
 * a gradient can have multiple color stops. each color stop represents a transition in color and/or opacity.
 */

//namespace setup/ensurance
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.models == 'undefined'){ uiDesignTools.gradients.models = {}; }

//colorStop used for defining transitions in the gradient
uiDesignTools.gradients.models.colorStop = function(optionsParam){
	this.options = {
		colorStopId : 0,//used for div id
		rgba : {red: 1, green: 1, blue: 1, alpha:1},
		position : 90 // where the color stop is positioned (50 for %50)  Color-stops are allowed to have positions before 0% or after 100%
	}
	
	$.extend(this.options, optionsParam);//merge default options with what was passed in
	
};//end colorStop