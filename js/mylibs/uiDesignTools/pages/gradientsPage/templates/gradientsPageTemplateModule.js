/**
 * @author Jason McAffee
 * Wrap Closure compiled javascript so that it can be used as a module
 */

define([
  'mylibs/uiDesignTools/uiDesignTools',
    'order!mylibs/uiDesignTools/pages/gradientsPage/templates/gradientsPage',//need order! to ensure this is completely loaded before our function executes.
    'libs/closure/soyutils'
  ], 
  function(uiDesignTools2){
    // Tell Require.js that this module returns a reference to the global generated namespace.
    return uiDesignTools.pages.templates.gradientsPage;//this is the global object. needed because of the way the templates are defined/auto-generated
  });