/**
 * @author Jason McAffee
 * 
 * page which displays the gradient widget
 * 
 */

define([
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/gradients/models/linearGradient',
	'mylibs/uiDesignTools/gradients/models/colorStop',
	'mylibs/uiDesignTools/gradients/templates/linearGradientMakerTemplateModule',
	'mylibs/uiDesignTools/gradients/widgets/linearGradientMakerWidget',
	'mylibs/uiDesignTools/pages/gradientsPage/models/gradientsPage',
	'mylibs/uiDesignTools/pages/gradientsPage/templates/gradientsPageTemplateModule'
	], function(uiDesignTools, $, linearGradient, colorStop, linearGradientMakerTemplateModule, linearGradientMakerWidget, gradientsPage, gradientsPageTemplateModule){
	
	
	function gradientsPageWidget(optionsParam){
		this.options = {
		  $gradientsPageContainer : false, //jquery representation of the container element. required!
		  gradientsPageModel : false, //model for this page
		  gradientsPageTemplate : gradientsPageTemplateModule.gradientsPageTemplate,  //generates html for the page
		  linearGradientMakerTemplate : linearGradientMakerTemplateModule.linearGradientMakerTemplate
		};
		
		$.extend(this.options, optionsParam);
		
		//create the model if not passed in
		if(!this.options.gradientsPageModel){
		  this.options.gradientsPageModel = new gradientsPage({});
		}
		
//html generation
		//generate html
		//this.refreshUI();
		
//jquery objects
    this.$linearGradientMakerWidgetContainer = $('#linearGradientMakerWidgetContainer', this.options.$gradientsPageContainer);
		
		//create linear gradient widget
		//bad, should move this html creation to the gradientsPage template so dom is only manipulated once
		this.createLinearGradientModelAndWidget();
	}
	
//============================================================ HTML Generation =================================================================

  gradientsPageWidget.prototype.refreshUI = function(){
    var newHtml = this.options.gradientsPageTemplate({gradientsPageModel: this.options.gradientsPageModel});
    this.options.$gradientsPageContainer[0].innerHTML = newHtml;
  };
	
	//only call this after document ready.
	gradientsPageWidget.prototype.createLinearGradientModelAndWidget = function(){
		//first construct an inital model
		var linearGradientModel = new linearGradient({
			angle : 0, //only written out if sideOrCorner is empty
			sideOrCorner : 'top',//if not empty, this will be written out, and angle will not be written out.
			colorStops : [
				//colorStop 1
  			new colorStop({ 
  				colorStopId: 'colorStop0',
					rgba: { red:206, green:155, blue:215, alpha:100 },
					position : 1 
				}),//end colorStop 1
  			//colorStop 2
  			new colorStop({ 
  				colorStopId: 'colorStop1',
					rgba: { red:155, green:109, blue:183, alpha:100 },
					position : 100 
				})//end colorStop 2
			]
		});
		
		//use the template to generate html reflective of the model.
		var linearGradientMakerHtml = this.options.linearGradientMakerTemplate({linearGradient:linearGradientModel});
		//grab where we will place the newly created html
		//var $linearGradientMakerWidgetContainer = $('#linearGradientMakerWidgetContainer');
		
		//insert the html into the dom
		this.$linearGradientMakerWidgetContainer[0].innerHTML = linearGradientMakerHtml;
		
		//now that the html is in the dom, we can query to get the top level element
		var $linearGradientMaker = $('#linearGradientMaker', this.$linearGradientMakerWidgetContainer);
		
		//now we can create the widget
		var newLinearGradientMakerWidget = new linearGradientMakerWidget({
			linearGradientModel : linearGradientModel,
			$linearGradientMaker : $linearGradientMaker //the widget needs its jquery wrapper for the html it represents.
		});
	}//end createLinearGradientModelAndWidget
	  	
	return gradientsPageWidget;
});
