/**
 * @author Jason McAffee
 * we need to wrap the auto-generated colorStop closure template as a module so that we can use it with requirejs
 * 
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',
	  'order!mylibs/uiDesignTools/gradients/templates/uiDesignTools.gradients.templates.colorStop',//need order! to ensure this is completely loaded before our function executes.
	  'libs/closure/soyutils'
	], 
	function(uiDesignTools2){
	  // Tell Require.js that this module returns a reference to the global generated namespace.
	  return uiDesignTools.gradients.templates.colorStop;//this is the global object. needed because of the way the templates are defined/auto-generated
	});