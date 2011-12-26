
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/boxShadow/models/boxShadow'
], function(uiDesignTools, $){
  
  function boxShadowWidget(optionsParam){
    this.options = {
      boxShadowModel : false, //model for this widget/page
      $boxShadowWidgetContainer : false //jquery container for this widget
    };
    
    $.extend(this.options, optionsParam);
    
  }  
  
//=========================================== Export ===============================

  return boxShadowWidget;
})
