/**
 * @author Jason McAffee
 * input widget/control which creates a custom radiobuttonset-like block of html & click handling.
 * updates are pushed/published via model events.
 */
define([                 //todo: fsslider requirement
	'mylibs/uiDesignTools/uiDesignTools',
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/inputs/models/radioButton',
	'mylibs/uiDesignTools/inputs/models/radioButtonSet',
	'mylibs/uiDesignTools/inputs/templates/radioButtonSetTemplateModule'
], function(uiDesignTools, $, radioButton, radioButtonSet, radioButtonSetTemplateModule){
	var uniqueIdCount = 0; //useful for filtering events which come from this widget type
	
	function radioButtonSetWidget(optionsParam){
		this.options = {
			uniqueId : 'radioButtonSetWidget'+ uniqueIdCount++, //useful for filtering events
			$radioButtonSetContainer : false, //top level container whos inner html will be generated
			radioButtonSetModel: false, //set these when you create this widget
			radioButtonSetTemplate : radioButtonSetTemplateModule.radioButtonSetTemplate
		};
		$.extend(this.options, optionsParam);
		
		//generate html
		this.refreshUI();
		
		//register on click events
		this.registerRadioButtonClickedHandlers();
		
	}

//============================================================== UI Events ====================================================
	//when a radiobutton is clicked
	radioButtonSetWidget.prototype.registerRadioButtonClickedHandlers = function(){
		var self = this;
		var lastSelectedRadioButton = this.options.radioButtonSetModel.options.radioButtonModels[0];//hard coding is bad! pointing to top at first. BAD
		
		function handleRadioButtonClick(event){
			//grab the model by using the passed in index (prevents stale data)
			var selectedRadioButtonModel = self.options.radioButtonSetModel.options.radioButtonModels[event.data.selectedRadioButtonIndex];
			
			//tell the last model it is no longer selected.
			if(lastSelectedRadioButton){
				lastSelectedRadioButton.options.isSelected = false;
			}
			
			//tell the model it has been selected
			selectedRadioButtonModel.options.isSelected = true;
			
			//we are now the old model
			lastSelectedRadioButton = selectedRadioButtonModel;
			
			//publish radioButtonSetModelUpdate event. lame...
			uiDesignTools.events.eventManager.events['radioButtonSelected'].publish({
				eventOriginatorId: self.options.uniqueId, //so people can filter event listeners
				 selectedRadioButton: selectedRadioButtonModel});
			
			self.refreshUI();//make the selected thing selected.
		}
		
		//iterate over each radioButton in the set, listen for its id
		for(var i = 0; i < this.options.radioButtonSetModel.options.radioButtonModels.length; ++i){
			var radioButtonModel = this.options.radioButtonSetModel.options.radioButtonModels[i];
			this.options.$radioButtonSetContainer.on('click', 
				'#'+radioButtonModel.options.radioButtonId, //id to listen for click on
				{ selectedRadioButtonIndex: i }, //extra data
				handleRadioButtonClick);
		}
	};

//============================================================== HTML Generation ==============================================
	radioButtonSetWidget.prototype.refreshUI = function(){
		var newHtml = this.options.radioButtonSetTemplate({radioButtonSetModel: this.options.radioButtonSetModel});
		this.options.$radioButtonSetContainer[0].innerHTML = newHtml;
	};
	
//Export ======================================================================================================================
	return radioButtonSetWidget;
});//end define
