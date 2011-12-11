/**
 * @author Jason McAffee
 * we need to wrap the auto-generated linearGradientMaker closure template as a module so that we can use it with requirejs
 * 
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',//core
	  'order!mylibs/uiDesignTools/gradients/templates/uiDesignTools.gradients.templates.linearGradientMaker',//need to use order! here so that the script is completely loaded by the time our function executes
	  'libs/closure/soyutils'
	], 
	function(uiDesignTools2){
	  // Tell Require.js that this module returns a reference to the global generated namespace.
	  return uiDesignTools.gradients.templates.linearGradientMaker;//this is the global object
	});