
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule'
], function(uiDesignTools, $){
  
  function boxShadowPage(optionsParam){
    this.options = {
      
    };
    
    $.extend(this.options, optionsParam);
    
  }  
  
//=========================================== Export ===============================

  return boxShadowPage;
})
