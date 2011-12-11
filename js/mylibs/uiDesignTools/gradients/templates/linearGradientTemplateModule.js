/**
 * @author Jason McAffee
 * we need to wrap the auto-generated linearGradient closure template as a module so that we can use it with requirejs
 * 
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',
	  'order!mylibs/uiDesignTools/gradients/templates/uiDesignTools.gradients.templates.linearGradient',//need order! to ensure this script is completely loaded before our function fires.
	  'libs/closure/soyutils'
	], 
	function(){
	  // Tell Require.js that this module returns a reference to the global generated namespace.
	  return uiDesignTools.gradients.templates.linearGradient;//this is the global object. needed because of the way templates are defined/auto-generated
	});