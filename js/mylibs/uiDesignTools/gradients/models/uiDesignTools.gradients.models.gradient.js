/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 */

//namespace setup/ensurance
if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.gradients == 'undefined'){ uiDesignTools.gradients = {}; }
if(typeof uiDesignTools.gradients.models == 'undefined'){ uiDesignTools.gradients.models = {}; }

//gradient represents the gradient we want to turn into css
uiDesignTools.gradients.models.gradient = function(optionsParam){
	//default options
	this.options = {
		//array of uiDesignTools.gradients.models.colorStop objects used for defining transitions in the gradient
		colorStops : []
	};
	
	//merge passed in options with default options
	$.extend(this.options, optionsParam);
	
};//end gradient