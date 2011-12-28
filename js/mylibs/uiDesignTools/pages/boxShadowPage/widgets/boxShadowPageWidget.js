
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/pages/boxShadowPage/models/boxShadowPage',
  'mylibs/uiDesignTools/pages/boxShadowPage/templates/boxShadowPageTemplateModule',
  'mylibs/uiDesignTools/boxShadow/models/boxShadow',
  'mylibs/uiDesignTools/boxShadow/widgets/boxShadowWidget'
], function(uiDesignTools, $, boxShadowPage, boxShadowPageTemplateModule, boxShadow, boxShadowWidget){
  
  function boxShadowPageWidget(optionsParam){
    this.options = {
      boxShadowPageModel : false, //model for this widget/page
      $boxShadowPageContainer : false //jquery container for this widget
    };
    
    $.extend(this.options, optionsParam);
    
//Jquery Objects
    this.$boxShadowWidgetContainer = $('#boxShadowWidgetContainer', this.options.$boxShadowPageContainer);
        
    //create the boxShadowWidget
    this.boxShadowWidget = this.createBoxShadowWidget();
  }  
//=========================================== Widget Creation ======================  
  boxShadowPageWidget.prototype.createBoxShadowWidget = function(){
    
    var newBoxShadowWidget = new boxShadowWidget({
      boxShadowModel : this.options.boxShadowPageModel.options.boxShadowModel,
      $boxShadowWidgetContainer : this.$boxShadowWidgetContainer
    });
    
    return newBoxShadowWidget;
  }
//=========================================== Export ===============================

  return boxShadowPageWidget;
})
