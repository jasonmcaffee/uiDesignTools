
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/boxShadow/models/boxShadow',
  'mylibs/uiDesignTools/gradients/models/colorStop',
  'mylibs/uiDesignTools/gradients/widgets/colorStopWidget'
], function(uiDesignTools, $, boxShadow, colorStop, colorStopWidget){
  
  function boxShadowWidget(optionsParam){
    this.options = {
      boxShadowModel : false, //model for this widget/page
      $boxShadowWidgetContainer : false //jquery container for this widget
    };
    
    $.extend(this.options, optionsParam);
    
//Jquery Objects
    this.$colorStopWidgetContainer = $('#colorStopWidgetContainer', this.options.$boxShadowWidgetContainer);
    
//Widget Creation
    this.colorStopWidget = this.createColorStopWidget();
    
//UI Event Registry
    //register input range change handlers
    this.registerHorizontalLengthChangeHandler();
    this.registerVerticalLengthChangeHandler();
    this.registerBlurChangeHandler();
    this.registerSpreadChangeHandler();
  }  
  
//=========================================== Widget Creation ======================
  boxShadowWidget.prototype.createColorStopWidget = function(){
      var newColorStopWidget = new colorStopWidget({
        colorStopModel : this.options.boxShadowModel.options.colorStopModel,
        $colorStop : this.$colorStopWidgetContainer
      });
      
      return newColorStopWidget;
  };
  
//=========================================== UI Events ============================
  boxShadowWidget.prototype.registerHorizontalLengthChangeHandler = function(){
    var self = this;
    
    //handle event
    function handleHorizontalLengthChange(event){
      var newHorizontalLength = $(this).val();//get the new value of the input
      
      //update the model and emit the event so that cssOutputWidget can refresh the gradient output
      self.options.boxShadowModel.setOptions({horizontalLength:newHorizontalLength});
      
    }
    
    //register the handler
    this.options.$boxShadowWidgetContainer.on('change', '#boxShadowHorizontalLength', handleHorizontalLengthChange);
  };  
  
  boxShadowWidget.prototype.registerVerticalLengthChangeHandler = function(){
    var self = this;
    
    //handle event
    function handleVerticalLengthChange(event){
      var newVerticalLength = $(this).val();//get the new value of the input
      
      //update the model and emit the event so that cssOutputWidget can refresh the gradient output
      self.options.boxShadowModel.setOptions({verticalLength:newVerticalLength});
    }
    
    //register the handler
    this.options.$boxShadowWidgetContainer.on('change', '#boxShadowVerticalLength', handleVerticalLengthChange);
  };  
  
  boxShadowWidget.prototype.registerBlurChangeHandler = function(){
    var self = this;
    
    //handle event
    function handleBlurChange(event){
      var newBlur = $(this).val();//get the new value of the input
      
      //update the model and emit the event so that cssOutputWidget can refresh the gradient output
      self.options.boxShadowModel.setOptions({blur:newBlur});
    }
    
    //register the handler
    this.options.$boxShadowWidgetContainer.on('change', '#boxShadowBlur', handleBlurChange);
  };  
  
  boxShadowWidget.prototype.registerSpreadChangeHandler = function(){
    var self = this;
    
    //handle event
    function handleSpreadChange(event){
      var newSpread = $(this).val();//get the new value of the input
      
      //update the model and emit the event so that cssOutputWidget can refresh the gradient output
      self.options.boxShadowModel.setOptions({spread:newSpread});
    }
    
    //register the handler
    this.options.$boxShadowWidgetContainer.on('change', '#boxShadowSpread', handleSpreadChange);
  };  
  
//=========================================== Export ===============================

  return boxShadowWidget;
})
