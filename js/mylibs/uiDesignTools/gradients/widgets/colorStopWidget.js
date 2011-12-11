/**
 * @author Jason McAffee
 * Widget provides UI which allows a user to adjust the color stop color and opacity.
 * The sub elements typically found in a color stop include <input type="range"> for red, blue, green, and opacity.
 * 
 * Before a widget is created, the html must have been generated from the template first!
 * widgets don't generate html, they layer functionality on top of the html
 * 
 */
define([                 //todo: fsslider requirement
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/gradients/templates/colorStopTemplateModule',
	'mylibs/uiDesignTools/gradients/models/colorStop'
	], function(uiDesignTools, $, colorStopTemplate){
	/**
	 * colorStopWidget constructor function
	 * calling this constructor will return a new colorStopWidget (when new keyword is used)
	 * this will result in the html representation for this widget getting added to the $parent[0].innerHTML
	 * @requires @param colorStopModel model representation of a color stop (has rgba)
	 * @requires @param $colorStop the jquery wrapper for the element that this widget resides in.
	 * 
	 */
	function colorStopWidget(optionsParam){
		
		//default options
		this.options = {
			colorStopModel : {}, //model used to dictate rgba values
			colorStopTemplate : colorStopTemplate.colorStopTemplate, //<div id="colorStopX"> + inner content + </div> <--NOT NEEDED. TODO: DELETE. ONLY NEED INNERCONTENTS TEMPLATE
			colorStopInnerContentTemplate : colorStopTemplate.colorStopInnerContentTemplate, //red, green, blue, alpha sliders html generator 
			$colorStop : false //jquery representation must be given.
		};
		$.extend(this.options, optionsParam);//merge default options with passed in options.
	
	 var self = this;
	//JQuery Object Initialization
		//this.polyfillInputRanges();//only executes if needed
		// Modernizr.load({
			  // test: Modernizr.inputtypes.range,
			  // nope: ['js/libs/polyfills/fd-slider.js', 'css/inputRangePolyfill/fd-slider.css'],//older browser performance hit for not supporting cool stuff. that'll teach em.
			  // callback: function(id, testResult) {
	        // // If the slider file has loaded then fire the onDomReady event        
	        // if("fdSlider" in window && typeof (fdSlider.onDomReady) != "undefined") {
	                // try { fdSlider.onDomReady(); } catch(err) {};
	                // self.polyfillInputRanges();
	        // };
	//         
	        // //linearGradientMakerWidget.polyfillInputRangeForAllColorStops();//lame i hate this stupid polyfill
	    	// }
			// });
		
		//click handlers
		this.registerDeleteColorStopButtonClickHandler();
	
		//listen for change events emitted by the red,green,blue, alpha sliders/range inputs.
		this.registerSliderChangeHandlers();
		
		
	}
	
	//only initializes if Modernizr.inputtypes.range == false
	//we need to register the input range polyfill (to get support in firefox & ie)
	colorStopWidget.prototype.polyfillInputRanges = function(){	
		if(Modernizr.inputtypes.range){return;}
		
		//WE ONLY NEED THESE IF THE BROWSER DOESN'T SUPPORT INPUT TYPE="RANGE": TO DO : optimize by not querying for these if range type is supported?
		this.$redRange = $("#" + this.options.colorStopModel.options.colorStopId + "redRange", this.options.$colorStop);
		this.$greenRange = $("#" + this.options.colorStopModel.options.colorStopId + "greenRange", this.options.$colorStop);
		this.$blueRange = $("#" + this.options.colorStopModel.options.colorStopId + "blueRange", this.options.$colorStop);
		this.$alphaRange = $("#" + this.options.colorStopModel.options.colorStopId + "alphaRange", this.options.$colorStop);
		this.$positionRange = $("#" + this.options.colorStopModel.options.colorStopId + "positionRange", this.options.$colorStop);
	
	
		//these will only execute if the input doesn't support type="range"
		fdSlider.createSlider({html5Shim :true, inp:this.$redRange[0], animation:"tween", min:1, max:100, step:1});
		fdSlider.createSlider({ html5Shim :true, inp:this.$greenRange[0], animation:"tween", min:1, max:100, step:1});
		fdSlider.createSlider({ html5Shim :true, inp:this.$blueRange[0], animation:"tween", min:1, max:100, step:1});
		fdSlider.createSlider({ html5Shim :true, inp:this.$alphaRange[0], animation:"tween", min:1, max:100, step:1});
		fdSlider.createSlider({ html5Shim :true, inp:this.$positionRange[0], animation:"tween", min:1, max:100, step:1});
			
	}
	
	//define and register handler for when the delete color stop button is clicked
	colorStopWidget.prototype.registerDeleteColorStopButtonClickHandler = function(){
		var self = this;//for callbacks
		
		function handleDeleteColorStopButtonClick(event){
			uiDesignTools.events.eventManager.events['colorStopModelShouldBeDeleted'].publish({
					colorStop : self.options.colorStopModel
				});
		}
		
		this.options.$colorStop.on('click', '#deleteColorStopButton' + this.options.colorStopModel.options.colorStopId, handleDeleteColorStopButtonClick);
	};
	
	//adds on change events to the appropriate sub widgets (redRange, etc)
	colorStopWidget.prototype.registerSliderChangeHandlers = function(){
		var self = this;//for anonymous functions, callbacks, etc.
	//Helper functions	
		//first define a helper function to assist in registering change handlers. (lessens repetitive code)
		function registerColorStopRangeChangeHandlerFor(rangeIdSelector, colorStopIndex, rgbaColorPropertyBeingUpdated){
			self.options.$colorStop.on("change", rangeIdSelector, 
				{//event data
					colorStopIndex : colorStopIndex,//access the correct color stop ( not really needed, as it's updated by reference)
					rgbaColorPropertyBeingUpdated : rgbaColorPropertyBeingUpdated//used to access the appropriate property on the colorStop model
				}, 
				colorStopRangeChangeHandler);
			
			//sub helper function (reduce scope)
			//handles when red slider is manipulated. todo: determine which color stop was chosen.
			function colorStopRangeChangeHandler(e){
				//get value
				var rangeValue = $(this).val(),
					  rgbaColorPropertyBeingUpdated = e.data.rgbaColorPropertyBeingUpdated,
						colorStopIndex = e.data.colorStopIndex;
						
				//update model to reflect ui selection
				var colorStop = self.options.colorStopModel;
				//eww hacky to avoid refactoring these helper methods. ewww
				if(rgbaColorPropertyBeingUpdated == "position"){
					colorStop.options.position = rangeValue;
				}else{
					if(rgbaColorPropertyBeingUpdated == "alpha"){ rangeValue = rangeValue * .01}//convert 1 to .1, 100 to 1
					colorStop.options.rgba[rgbaColorPropertyBeingUpdated] = rangeValue;
				}
				
				//emit event so that others can update outputs (such as gradient output)
				uiDesignTools.events.eventManager.events['colorStopModelHasChanged'].publish({
					colorStop : colorStop
				});
			}//end colorStopRangeChangeHandler
			
		}//end registerColorStopRangeChangeHandlerFor
		
		
	
	//Register change handlers	
		//register
		var rangeIdPrepend = this.options.colorStopModel.options.colorStopId;
		registerColorStopRangeChangeHandlerFor("#" + rangeIdPrepend + "redRange", 0, "red");
		registerColorStopRangeChangeHandlerFor("#" + rangeIdPrepend + "greenRange", 0, "green");
		registerColorStopRangeChangeHandlerFor("#" + rangeIdPrepend + "blueRange", 0, "blue");
		registerColorStopRangeChangeHandlerFor("#" + rangeIdPrepend + "alphaRange", 0, "alpha");
		registerColorStopRangeChangeHandlerFor("#" + rangeIdPrepend + "positionRange", 0, "position");
	}
	
	//just update the inner contents.
	colorStopWidget.prototype.refreshUI = function(){
		var newHtmlText = this.options.colorStopInnerContentTemplate({colorStop:this.options.colorStopModel});
		this.$colorStopDiv[0].innerHTML = newHtmlText;
	}
  
  //our define export
  return colorStopWidget;
});//end requirejs