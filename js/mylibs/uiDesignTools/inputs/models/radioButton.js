/**
 * @author Jason McAffee
 * simple model for radio button state
 */
define([                 //todo: fsslider requirement
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
], function(uiDesignTools, $){
	var uniqueId = 0;
	
	function radioButton(optionsParam){
		this.options = {
			radioButtonId : 'radioButton' + uniqueId++,
			isSelected : false,
			displayText : "radio button", //text displayed to user.
			value : 'no value set' //what you want the value to be sent when clicked.
		}
		$.extend(this.options, optionsParam);
	}
	
	//emits event
	// radioButton.prototype.setIsSelected = function(isSelected){
		// this.options.isSelected = isSelected;
		// //radioButtonSet listens for this event...?
		// //uiDesignTools.events.eventManager.events['radioButtonModelChanged'].publish({radioButton:this});
	// }
// 	
//Export ===================================================================
	return radioButton;
});//end define
