/**
 * @author Jason McAffee
 * 
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',
	  'order!mylibs/uiDesignTools/colorPicker/templates/uiDesignTools.colorPicker.templates.colorBox',//need order! to ensure this is completely loaded before our function executes.
	  'libs/closure/soyutils'
	], 
	function(uiDesignTools2){
	  // Tell Require.js that this module returns a reference to the global generated namespace.
	  return uiDesignTools.colorPicker.templates.colorBox;//this is the global object. needed because of the way the templates are defined/auto-generated
	});