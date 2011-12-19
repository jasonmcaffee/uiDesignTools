/**
 * @author Jason McAffee
 * Simple model used by the hueRangeSelector of colorPicker
 */

define([
	'mylibs/uiDesignTools/uiDesignTools', //core library
	'libs/jquery/jqueryModule'
], function(uiDesignTools, $){
	
	function hueRangeSelectorBox(optionsParam){
		this.options = {
			hueColor: 128, //hue color the box represents.
			rgba: {red:100, green:100, blue:100, alpha:1}
		};
		
		$.extend(this.options, optionsParam);
	}
	
	return hueRangeSelectorBox;
});//end define

