/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust various aspects of a css3 linear gradient.
 * 
 * Before a widget is created, the html must have been generated from the template first!
 * widgets don't generate html, they layer functionality on top of the html
 * 
 */
define([
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/gradients/templates/linearGradientTemplateModule',
	'mylibs/uiDesignTools/gradients/widgets/colorStopWidget', 
	'mylibs/uiDesignTools/gradients/templates/colorStopTemplateModule',
	'mylibs/uiDesignTools/gradients/models/colorStop'
], function(uiDesignTools, $, linearGradientTemplate, colorStopWidget, colorStopTemplate, colorStop){
	
	//widget for making gradients. don't call this before the document is ready.
	 function linearGradientMakerWidget(optionsParam){
		var self = this;//for handlers and whatnots
		
		//default options
		this.options = {
			linearGradientCssTemplate : linearGradientTemplate.linearGradientCssTemplate, //function used to generate html
			linearGradientCssPrettyPrintTemplate : linearGradientTemplate.linearGradientCssPrettyPrintTemplate,//where generated css text is displayed needs this,
			colorStopTemplate : colorStopTemplate.colorStopTemplate,
			linearGradientModel : {}, //should be typeof uiDesignTools.gradients.models.linearGradient
			$linearGradientMaker : false //jquery wrapper representation of the html this widget works with.
		};
		//merge default options with passed in options
		$.extend(this.options, optionsParam);
		
//jquery objects
		this.$linearGradientMakerControls = $('#linearGradientMakerControls', this.options.$linearGradientMaker);//controls hold the colorStops, and any other widget which allows us to tweak the output
		this.$colorStopsComponent = $('#colorStopsComponent', this.$linearGradientMakerControls);//holds everything related to adjusting color stops
		this.$colorStops = $('#colorStops', this.$colorStopsComponent);//colorstops allow us to tweak the output (generated gradient)
		
		this.$gradientOutput = $('#gradientOutput', this.options.$linearGradientMaker);//the final result of users modification. updated as user interacts with controls.
		this.$generatedLinearGradientCssOutputTextArea = $('#generatedLinearGradientCssOutputTextArea', this.options.$linearGradientMaker);//where we will display generated css for the linear gradient
		this.$generatedLinearGradientCssOutput = $("#generatedLinearGradientCssOutput", this.options.$linearGradientMaker);//show hide this when css preview button is clicked
		
		//i don't know that i need this yet... this.$linearGradientSideOrCornerSelect = $('#linearGradientSideOrCorner', this.options.$linearGradientMaker);//user can pick which way the linear gradient should go.
		
//Widget Creation
		this.colorStopWidgets = [];//array of colorStopWidgets which each represent a colorStop in this linear gradient
		this.createColorStopWidgets();
		
		//used for generating unique color stop ids
		this.totalColorStopCount = this.options.linearGradientModel.options.colorStops.length + 1;//start count with unique
		
//Model Events Registry
		//subscribe to colorstop changed events so we can re-render our output
		this.subscribeToColorStopModelUpdate();//refresh the gradientOutput, user has moved ui control
		this.subscribeToColorStopModelAdd();//refresh colorStops, user has clicked add colorstop button.
		this.subscribeToColorStopModelDelete();//we fire this event after we get the colorStopModelShouldBeDeleted and update the model.
		this.subscribeToColorStopModelShouldBeDeleted();//colorStopWidget fires this event when user clicks delete button
		//subscribe to linearGradientModel events
		this.subscribeToLinearGradientModelUpdate();
		
//UI Events Registry
		this.registerCssPreviewButtonClickHandler();//expand css preview when button is clicked.
		this.registerAddColorStopButtonClickHandler();//listen for on click so we can add a new colorStop
		this.registerLinearGradientSideOrCornerSelectChangeHandler();
		
//HTML Generation
		this.refreshGeneratedOutput();//gradientOutput and textarea should be refreshed to reflect the current model
		
	};//end linearGradientMakerWidget
	

//=================================================================== UI Events ===============================================
	linearGradientMakerWidget.prototype.registerCssPreviewButtonClickHandler = function(){
		var self = this;
		var isCurrentlyDisplayed = false;//start off without display showing.
		//called when button is clicked
		function handleCssPreviewButtonClick(event){
			if(!isCurrentlyDisplayed){
				self.$generatedLinearGradientCssOutput.show();
				isCurrentlyDisplayed = true;
			}else{
				self.$generatedLinearGradientCssOutput.hide();
				isCurrentlyDisplayed = false;
			}
		}
		//register the event
		this.options.$linearGradientMaker.on('click', '#cssTextPreviewButton', handleCssPreviewButtonClick);
	};

	//when user selects which direction the gradient should go
	linearGradientMakerWidget.prototype.registerLinearGradientSideOrCornerSelectChangeHandler = function(){
		var self = this;
		
		function linearGradientSideOrCornerSelectChangeHandler(event){
			//this.value is the value of the selected option
			
			//update the model and emit the event for linearGradientModelUpdated
			//i'm emitting events rather than just calling refreshUI here because i think this widget could be broken down into smaller parts.
			//also something else could change the model, and i want this widget to react (not realistic, but this project is about principles in enterprise dev)
			self.options.linearGradientModel.setSideOrCorner(this.value);
		}
		
		this.$linearGradientMakerControls.on("change", "#linearGradientSideOrCorner", linearGradientSideOrCornerSelectChangeHandler);
	};
	

	//when user clicks 'Add Color Stop', this function will be fired so we can update the model, etc.
  linearGradientMakerWidget.prototype.registerAddColorStopButtonClickHandler = function(){
		var self = this;//for callbacks to have reference to this.
		
		//handle when addColorStopButton is clicked
		function addColorStopButtonClickHandler(event){
			var colorStops = self.options.linearGradientModel.options.colorStops;
			
			var newColorStopId = self.generateColorStopId();
			//create a new color stop by cloning last colorStop in colorStops, if it exists
			var newColorStop = new colorStop({
				colorStopId : newColorStopId
			});//create a new colorStop with default options
	
			//add the newly created model to our list
			//this fires the event colorStopHasBeenAdded, which triggers this handleColorStopModelAdd method, found in the register function
			self.options.linearGradientModel.addColorStop(newColorStop);
		}
		//listen for on click so we can add a new colorStop
		this.$colorStopsComponent.on("click", "#addColorStopButton", addColorStopButtonClickHandler);
	};
	
	//ensure all colorstops have a unique id so there are no conflicts when adding, deleting, adding, etc the color stops (click handlers break if not unique id.)
	linearGradientMakerWidget.prototype.generateColorStopId = function(){
		return 'colorStop' + this.totalColorStopCount++;
	}
	
	
//=================================================================== Model Events ===============================================
	linearGradientMakerWidget.prototype.subscribeToLinearGradientModelUpdate = function(){
		var self = this;//so call back functions can access method of this.
		
		//when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
		//re-render the gradientOuput so that it reflects the change the user made.
		function handleLinearGradientModelUpdate(event){
			//generate new css text and update the textarea and gradient outputs.
			self.refreshGeneratedOutput();
		}
		
		//subscribe to the event
		uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'].subscribe(handleLinearGradientModelUpdate);
	};
	
	
	//when any of our color stops has been updated, we need to update/render the gradientOutput
	linearGradientMakerWidget.prototype.subscribeToColorStopModelUpdate = function(){
		var self = this;//so call back functions can access method of this.
		
		//when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
		//re-render the gradientOuput so that it reflects the change the user made.
		function handleColorStopModelUpdate(event){
			//generate new css text and update the textarea and gradient outputs.
			self.refreshGeneratedOutput();
		}
		
		//subscribe to the event
		uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].subscribe(handleColorStopModelUpdate);
	};
	
	//when any of our color stops has been updated, we need to update/render the gradientOutput
	linearGradientMakerWidget.prototype.subscribeToColorStopModelAdd = function(){
		var self = this;//so call back functions can access method of this.
		
		//when the input of a color stop range (red, green, blue, alpha) has changed, we want to be notified so we can
		//re-render the gradientOuput so that it reflects the change the user made.
		function handleColorStopModelAdd(event){
			var newColorStop = event.data.colorStop;//grab the colorStop model from the event data.
			//generate the html
			var colorStopHtml = self.options.colorStopTemplate({colorStop:newColorStop});
			//add new colorStop html to colorStops element
			self.$colorStops.append(colorStopHtml);
			
			//create a new widget to represent the new colorStop
			var newColorStopWidget = self.createColorStopWidget(newColorStop);
			self.colorStopWidgets.push(newColorStopWidget);
			
			//generate new css text and update outputs (textarea & gradient)
			self.refreshGeneratedOutput();
		}
		
		//subscribe to the event
		uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'].subscribe(handleColorStopModelAdd);
	};
	
	//colorStopWidget will fire this event when the delete button is clicked.
	//we will delete the colorStop, colorStopWidget, and fire the colorStopModelHasBeenDeleted event.
	linearGradientMakerWidget.prototype.subscribeToColorStopModelShouldBeDeleted = function(){
		var self = this; //for callbacks
		function handleColorStopModelShouldBeDeleted(event){
			var colorStopToDelete = event.data.colorStop;//grab the colorStop model from the event data.
			//remove the model from our collection
			//calling this function will emit the event colorStopModelHasBeenDeleted, which will fire our handleColorStopModelDelete, which refreshes the ui.
			self.options.linearGradientModel.removeColorStop(colorStopToDelete);
		}
		//listen for events emitted by the colorStopWidget when the user clicks delete.
		uiDesignTools.events.eventManager.events['colorStopModelShouldBeDeleted'].subscribe(handleColorStopModelShouldBeDeleted);
	}
	
	//when the model has been updated (eg colorStop has been deleted), we need to refresh the ui.
	//not sure if having this as an event makes sense, since it is this object which deletes the colorStop from the model on colorStopModelShouldBeDeleted handler.
	//may be useful in the future though, and follows the same pattern as add & update
	linearGradientMakerWidget.prototype.subscribeToColorStopModelDelete = function(){
		var self = this;//for callbacks
		
		function handleColorStopModelDelete(event){
			var colorStopWhichWasDeleted = event.data.colorStop;
			
			//find the colorStopWidget with the matching model so we can delete it.
			var matchingColorStopWidget = self.findMatchingColorStopWidget(colorStopWhichWasDeleted);
			
			if(matchingColorStopWidget != null){
				//call the widget and have it remove $colorStop div from the dom
				matchingColorStopWidget.options.$colorStop.remove();
				
				//remove the colorStopWidget from our array of colorStopWidgets (thereby deleting it)
			  var indexToRemove = self.colorStopWidgets.indexOf(matchingColorStopWidget);
			  self.colorStopWidgets.splice(indexToRemove,1);
			  
			}else{
				alert('you deleted a colorstop which doesnt exist');
			}
	
			//generate new css text and update outputs (textarea & gradient)
			self.refreshGeneratedOutput();
		}
		
		//listen for the delete event.
		uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'].subscribe(handleColorStopModelDelete);
	
	}
	
	//useful when deleting a color stop.
	linearGradientMakerWidget.prototype.findMatchingColorStopWidget = function(colorStopModel){
		//iterate over colorStopWidgets and find one with matching model
		for(var i = 0; i < this.colorStopWidgets.length; ++i){
			var colorStopWidget = this.colorStopWidgets[i];
			if(colorStopWidget.options.colorStopModel == colorStopModel){
				return colorStopWidget;
			}
		}
		return null;
	}
	
//==================================================== Widget Creation ========================================
	//creates colorStopWidgets by constructing the jquery wrapper $colorStop
	linearGradientMakerWidget.prototype.createColorStopWidgets = function(){
		var colorStopModels = this.options.linearGradientModel.options.colorStops;
		for(var i = 0; i < colorStopModels.length; ++i){
			var colorStopModel = colorStopModels[i];//grab the model
			var colorStopWidget = this.createColorStopWidget(colorStopModel);//create the widget
			this.colorStopWidgets.push(colorStopWidget);//add the newly created widget to our internal collection
		}
	};
	
	//creates a single colorStopWidget, using the model you pass in
	linearGradientMakerWidget.prototype.createColorStopWidget = function(colorStopModel){
		//create a color stop widget
			var newColorStopWidget = new colorStopWidget({
				$colorStop : $('#' + colorStopModel.options.colorStopId, this.options.linearGradientMaker), //<-- jquery wrapper $colorStop created here.
				colorStopModel : colorStopModel
			});
			
			return newColorStopWidget;
	};
	
//==================================================== HTML Generation ========================================
	//convenience function for refreshing both the gradient output and generated css text area
	//by having them call their respective templates to generated new html & css
	linearGradientMakerWidget.prototype.refreshGeneratedOutput = function(){
		this.refreshGradientOutput();
		this.refreshGeneratedCssTextArea();
	}
	
	//after an update to the linearGradientModel has been made, most likely this function should be called.
	linearGradientMakerWidget.prototype.refreshGradientOutput = function(newLinearGradientCssText){
		//generate the background: linear-gradient css style using the updated model
		if(!newLinearGradientCssText){ newLinearGradientCssText = this.options.linearGradientCssTemplate({linearGradient : this.options.linearGradientModel}); }
		//update the css
		this.$gradientOutput[0].style.cssText = newLinearGradientCssText;
	};
	
	//call this when the model has been updated and you want the generated css textarea to reflect the change
	linearGradientMakerWidget.prototype.refreshGeneratedCssTextArea = function(newLinearGradientCssText){
		//generate the background: linear-gradient css style using the updated model
		if(!newLinearGradientCssText){ newLinearGradientCssText = this.options.linearGradientCssPrettyPrintTemplate({linearGradient : this.options.linearGradientModel}); }
		//update the textarea's value/inner
		this.$generatedLinearGradientCssOutputTextArea.val(newLinearGradientCssText);
	};
	

//===================================================== Polyfill Creation =====================================
	//called by the callback function of Modernizr.load for the fdslider input range polyfill
	linearGradientMakerWidget.prototype.polyfillInputRangeForAllColorStops = function(){
		for(var i = 0; i < this.colorStopWidgets.length; ++i){
			this.colorStopWidgets[i].polyfillInputRanges();
		}
	}
	
	
//===================================================== Export =================================================
	return linearGradientMakerWidget;

});//end requirejs

