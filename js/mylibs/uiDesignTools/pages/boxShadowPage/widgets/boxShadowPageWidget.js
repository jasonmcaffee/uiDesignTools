
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/pages/boxShadowPage/models/boxShadowPage',
  'mylibs/uiDesignTools/pages/boxShadowPage/templates/boxShadowPageTemplateModule'
], function(uiDesignTools, $, boxShadowPage, boxShadowPageTemplateModule){
  
  function boxShadowPageWidget(optionsParam){
    this.options = {
      boxShadowPageModel : false, //model for this widget/page
      $boxShadowPageContainer : false //jquery container for this widget
    };
    
    $.extend(this.options, optionsParam);
    
  }  
  
//=========================================== Export ===============================

  return boxShadowPageWidget;
})
