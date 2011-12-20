/**
 * @author Jason McAffee
 * simple model for radio button set state
 */
define([                 //todo: fsslider requirement
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/inputs/models/radioButton'
], function(uiDesignTools, $, radioButton){
	var uniqueId = 0;
	
	function radioButtonSet(optionsParam){
		this.options = {
			radioButtonSetId : 'radioButtonSet' + uniqueId++, //unique id for the set,
			radioButtonModels : [], //are ray of objects you wish this set to be comprised of.
		}
		$.extend(this.options, optionsParam);
		
		//generate the html
	}
	
	
//Export ===================================================================
	return radioButtonSet;
});//end define
