/**
 * @author Jason McAffee
 * 
 * model for the gradients page
 * 
 */

define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule'
  ], function(uiDesignTools, $){
    var uniqueIdCount = 0;
    
  function gradientsPage(optionsParam){
    this.options = {
      uniqueId : 'gradientsPage' + uniqueIdCount++

    };
    
    $.extend(this.options, optionsParam);
  }
  
//=========================================== Export ====================================
  return gradientsPage;
});
