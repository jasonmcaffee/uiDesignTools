
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/boxShadow/models/boxShadow'
], function(uiDesignTools, $, boxShadow){
  
  function boxShadowPage(optionsParam){
    this.options = {
      boxShadowModel : false, //model for the boxShadowWidget
    };
    
    $.extend(this.options, optionsParam);
    
    if(!this.options.boxShadowModel){
      this.options.boxShadowModel = new boxShadow({});
    }
    
  }  
  
//=========================================== Export ===============================

  return boxShadowPage;
})
