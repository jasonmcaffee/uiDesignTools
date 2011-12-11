/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 */
define([
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/gradients/models/colorStop' //colorStop model 
], function(uiDesignTools, $, colorStop){
	function gradient(optionsParam){
		//default options
		this.options = {
			//array of uiDesignTools.gradients.models.colorStop objects used for defining transitions in the gradient
			colorStops : []
		};
		
		//merge passed in options with default options
		$.extend(this.options, optionsParam);
		
	};//end gradient
	
	//our define export
	return gradient;
})
