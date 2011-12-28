
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/gradients/models/colorStop'
], function(uiDesignTools, $, colorStop){
  
  function boxShadow(optionsParam){
    this.options = {
      horizontalLength : 1, //support %
      verticalLength : 1,
      blur : 5,
      spread : 5,
      //rgba : {red : 128, green : 128, blue : 128, alpha : 1}
      colorStopModel : false //used for shadow color
    };
    
    $.extend(this.options, optionsParam);
    
    if(!this.options.colorStopModel){
      this.options.colorStopModel = new colorStop({
        colorStopId : 'colorStopForBoxShadow',
        rgba : {red : 128, green : 128, blue : 128, alpha : 1}
      });
    }

//Model Event Subscription
    //when the colorStopModel changes, we will publish a boxShadowUpdated event so that cssOutput can refresh
    this.subscribeToColorStopModelChanged();
  }  
  
//============================================ Update properties to publish events =========
  boxShadow.prototype.setOptions = function(newOptionValues){
    $.extend(this.options, newOptionValues);
    uiDesignTools.events.eventManager.events['boxShadowUpdated'].publish({boxShadow:this});
  };
    
//============================================= Model Events =======================

  //listen to colorStop update events so others using this model don't have to. 
  boxShadow.prototype.subscribeToColorStopModelChanged = function(){
    var self = this;
    
    function handleColorStopModelChanged(event){
      var newColorStopModel = event.data.colorStop;
      
      uiDesignTools.events.eventManager.events['boxShadowUpdated'].publish({boxShadow:self});
    }
    
    uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].subscribe(handleColorStopModelChanged, 
      function(event){ //filter events to only fire our callback when it's our color stop that has changed
        return event.data.colorStop.options.colorStopId == self.options.colorStopModel.options.colorStopId;
      });
  };
  
//=========================================== Export ===============================

  return boxShadow;
})
