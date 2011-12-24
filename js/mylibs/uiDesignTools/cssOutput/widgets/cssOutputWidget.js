/**
 * @author Jason McAffee
 * 
 * displays gradient/box/shadow output, as well as the css text used.
 * 
 * todo: when a colorstop is added, update all models?
 */

define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/gradients/models/linearGradient',
  'mylibs/uiDesignTools/gradients/models/colorStop',
  'mylibs/uiDesignTools/cssOutput/templates/cssOutputTemplateModule',
  'mylibs/uiDesignTools/cssOutput/models/cssOutput',
  'mylibs/uiDesignTools/gradients/templates/linearGradientTemplateModule'
  ], function(uiDesignTools, $, linearGradient, colorStop, cssOutputTemplateModule, cssOutput, linearGradientTemplateModule){
  
  
  function cssOutputWidget(optionsParam){
    this.options = {
      cssOutputTemplate : cssOutputTemplateModule.cssOutputTemplate, //generates html for this widget.
      linearGradientCssPrettyPrintTemplate : linearGradientTemplateModule.linearGradientCssPrettyPrintTemplate, //pretty print css text for linear gradient
      linearGradientCssTemplate : linearGradientTemplateModule.linearGradientCssTemplate, //for background of gradient output div
      $cssOutputContainer : false , //all html for this widget goes in here.
      cssOutputModel : false, //model for this widget. includes colorStops, linearGradientModel, etc.
    };
    $.extend(this.options, optionsParam);
    
    //create a default model if one wasn't provided
    if(!this.options.cssOutputModel){
      var colorStops = [
        new colorStop({ colorStopId: 'colorStop0',
          rgba: { red:206, green:155, blue:215, alpha:100 },
          position : 1 
        }),//end colorStop 1
        new colorStop({ colorStopId: 'colorStop1',
          rgba: { red:155, green:109, blue:183, alpha:100 },
          position : 100 
        })//end colorStop 2
      ];
      
      this.options.cssOutputModel = new cssOutput({
        linearGradientModel : new linearGradient({
          colorStops : colorStops
        })
      })
    }
    
//Jquery Objects
    this.$cssOutputTextArea = $('#cssOutputTextArea', this.options.$cssOutputContainer);
    this.$gradientOutput = $('#gradientOutput', this.options.$cssOutputContainer);
    this.$generatedCssOutputContainer = $('#generatedCssOutputContainer', this.options.$cssOutputContainer); //container for text area. we will show hide this on preview click.
    
//Model Events Registry
    this.subscribeToLinearGradientModelChanged();

//UI Events Registry
    this.registerCssPreviewButtonClickHandler();//when preview button is clicked, show/hide css text area
    
    this.refreshGeneratedOutput();
  }
  
//============================================================== UI Events ==========================================
 //show and hide the generated css text when the preview button is clicked
  cssOutputWidget.prototype.registerCssPreviewButtonClickHandler = function(){
    var self = this;
    var isCurrentlyDisplayed = false;//start off without display showing.
    //called when button is clicked
    function handleCssPreviewButtonClick(event){
      if(!isCurrentlyDisplayed){
        self.$generatedCssOutputContainer.show();
        isCurrentlyDisplayed = true;
      }else{
        self.$generatedCssOutputContainer.hide();
        isCurrentlyDisplayed = false;
      }
    }
    //register the event
    this.options.$cssOutputContainer.on('click', '#cssTextPreviewButton', handleCssPreviewButtonClick);
  };
//============================================================== HTML Generation ====================================

  //convenience function for refreshing both the gradient output and generated css text area
  //by having them call their respective templates to generated new html & css
  cssOutputWidget.prototype.refreshGeneratedOutput = function(){
    this.refreshGradientOutput();
    this.refreshGeneratedCssTextArea();
  }
  
  //after an update to the linearGradientModel has been made, most likely this function should be called.
  cssOutputWidget.prototype.refreshGradientOutput = function(){
    var newCssText = "";
    //generate the background: linear-gradient css style using the updated model
    switch(this.options.cssOutputModel.options.gradientType){
      case "linear": //call the linear gradient template to get the css
        newCssText = this.options.linearGradientCssTemplate({linearGradient : this.options.cssOutputModel.options.linearGradientModel});
        break;
    }
    //update the css
    this.$gradientOutput[0].style.cssText = newCssText;
  };
  
  //call this when the model has been updated and you want the generated css textarea to reflect the change
  cssOutputWidget.prototype.refreshGeneratedCssTextArea = function(newLinearGradientCssText){
    //generate the background: linear-gradient css style using the updated model
    if(!newLinearGradientCssText){ newLinearGradientCssText = this.options.linearGradientCssPrettyPrintTemplate({linearGradient : this.options.cssOutputModel.options.linearGradientModel}); }
    //update the textarea's value/inner
    this.$cssOutputTextArea.val(newLinearGradientCssText);
  };
  
//============================================================== Model Event Handling ===============================
  cssOutputWidget.prototype.subscribeToLinearGradientModelChanged = function(){
    var self = this;
    function handleLinearGradientModelChanged(event){
      var newLinearGradientModel = event.data.linearGradient;
      self.options.cssOutputModel.options.linearGradientModel = newLinearGradientModel;
      self.refreshGeneratedOutput();
    }
    
    uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'].subscribe(handleLinearGradientModelChanged);
  };

//============================================================== Export =============================================
  return cssOutputWidget;
});






// 
// 
// 
  // //when any of our color stops has been updated, we need to update/render the gradientOutput
  // cssOutputWidget.prototype.subscribeToColorStopModelUpdate = function(){
    // var self = this;//so call back functions can access method of this.
//     
    // //when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
    // //re-render the gradientOuput so that it reflects the change the user made.
    // function handleColorStopModelUpdate(event){
      // console.log('cssOutput colorStopModelHasChanged event handler called');
//       
      // //generate new css text and update the textarea and gradient outputs.
      // self.refreshGeneratedOutput();
    // }
//     
    // //subscribe to the event
    // uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].subscribe(handleColorStopModelUpdate);
  // };
//   
  // //when any of our color stops has been updated, we need to update/render the gradientOutput
  // cssOutputWidget.prototype.subscribeToColorStopModelAdd = function(){
    // var self = this;//so call back functions can access method of this.
//     
    // //when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
    // //re-render the gradientOuput so that it reflects the change the user made.
    // function handleColorStopModelAdd(event){
      // var newColorStop = event.data.colorStop;//grab the colorStop model from the event data.
//       
      // //what do we do? add it to our colorstops? or will it be there by reference?
      // console.log('cssOutput colorStopModelHasBeenAdded event handler called');
//       
      // //generate new css text and update outputs (textarea & gradient)
      // self.refreshGeneratedOutput();
    // }
//     
    // //subscribe to the event
    // uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'].subscribe(handleColorStopModelAdd);
  // };
//   
  // //colorStopWidget will fire this event when the delete button is clicked.
  // //we will delete the colorStop, colorStopWidget, and fire the colorStopModelHasBeenDeleted event.
  // cssOutputWidget.prototype.subscribeToColorStopModelShouldBeDeleted = function(){
    // var self = this; //for callbacks
    // function handleColorStopModelShouldBeDeleted(event){
      // var colorStopToDelete = event.data.colorStop;//grab the colorStop model from the event data.
      // //remove the model from our collection
      // //calling this function will emit the event colorStopModelHasBeenDeleted, which will fire our handleColorStopModelDelete, which refreshes the ui.
//       
      // console.log('cssOutput colorStopModelShouldBeDeleted event handler called');
      // //??? what to do, update model?
      // //self.options.linearGradientModel.removeColorStop(colorStopToDelete);
    // }
    // //listen for events emitted by the colorStopWidget when the user clicks delete.
    // uiDesignTools.events.eventManager.events['colorStopModelShouldBeDeleted'].subscribe(handleColorStopModelShouldBeDeleted);
  // }
//   
  // //when the model has been updated (eg colorStop has been deleted), we need to refresh the ui.
  // //not sure if having this as an event makes sense, since it is this object which deletes the colorStop from the model on colorStopModelShouldBeDeleted handler.
  // //may be useful in the future though, and follows the same pattern as add & update
  // cssOutputWidget.prototype.subscribeToColorStopModelDelete = function(){
    // var self = this;//for callbacks
//     
    // function handleColorStopModelDelete(event){
      // var colorStopWhichWasDeleted = event.data.colorStop;
//       
      // //find the colorStopWidget with the matching model so we can delete it.
      // console.log('cssOutput colorStopModelHasBeenDeleted event handler called');
//   
      // //generate new css text and update outputs (textarea & gradient)
      // self.refreshGeneratedOutput();
    // }
//     
    // //listen for the delete event.
    // uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'].subscribe(handleColorStopModelDelete);
//   
  // }  
//   

    // this.subscribeToColorStopModelUpdate();//color stop update
    // this.subscribeToColorStopModelAdd();
    // this.subscribeToColorStopModelShouldBeDeleted();
    // this.subscribeToColorStopModelDelete();