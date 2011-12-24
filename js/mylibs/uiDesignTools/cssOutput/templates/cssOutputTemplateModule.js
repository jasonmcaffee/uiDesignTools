/**
 * @author Jason McAffee
 * wrap generated template as a module
 */

define([
  'mylibs/uiDesignTools/uiDesignTools',
  'order!mylibs/uiDesignTools/cssOutput/templates/cssOutput',//need order! to ensure this is completely loaded before our function executes.
  'libs/closure/soyutils'
  ], 
  function(uiDesignTools2){
    // Tell Require.js that this module returns a reference to the global generated namespace.
    return uiDesignTools.cssOutput.templates.cssOutput;//this is the global object. needed because of the way the templates are defined/auto-generated
  }
);