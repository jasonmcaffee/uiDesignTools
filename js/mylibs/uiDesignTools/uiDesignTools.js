/**
 * @author Jason McAffee
 * Core library for uiDesignTools.
 * Holds subscriptions to all uiDesignToolEvents via the eventManager.
 */

//not sure how to do this only once...without global namespace pollution.
define([
	'mylibs/uiDesignTools/events/eventManager',
	'mylibs/uiDesignTools/events/uiDesignToolsEvent'
], function(eventManager, uiDesignToolsEvent){
	
	//create our core library
	var uiDesignTools = {};
	
//Events Setup
	uiDesignTools.events = {}; 
	
	//create the event manager
	uiDesignTools.events.eventManager = new eventManager();
	
//create events
	
	//color stops
	uiDesignTools.events.eventManager.events['colorStopModelHasChanged'] = new uiDesignToolsEvent({type:'colorStopModelHasChanged'});
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'] = new uiDesignToolsEvent({type:'colorStopModelHasBeenAdded'});
	//color stop widget cant delete the model, so fires this event when the delete button is clicked
	uiDesignTools.events.eventManager.events['colorStopModelShouldBeDeleted'] = new uiDesignToolsEvent({type:'colorStopModelShouldBeDeleted'});
	//not sure if this should be used...probably
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'] = new uiDesignToolsEvent({type:'colorStopModelHasBeenDeleted'});
	
	//linearGradient
	uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'] = new uiDesignToolsEvent({type:'linearGradientModelHasChanged'});
	uiDesignTools.events.eventManager.events['linearGradientModelSideOrCornerHasChanged'] = new uiDesignToolsEvent({type:'linearGradientModelSideOrCornerHasChanged'});
	//colorpicker
	uiDesignTools.events.eventManager.events['colorPickerModelChanged'] = new uiDesignToolsEvent({type:'colorPickerModelChanged'});
	uiDesignTools.events.eventManager.events['colorPickerNewColorSelected'] = new uiDesignToolsEvent({type:'colorPickerNewColorSelected'});//fires when a colorBox is clicked
	
	//inputs 
	uiDesignTools.events.eventManager.events['radioButtonSelected'] = new uiDesignToolsEvent({type:'radioButtonSelected'});
	//example uiDesignTools.events.eventManager.events['radioButtonSelected'].publish({
				//eventOriginatorId: self.options.uniqueId, //so people can filter event listeners
				 //selectedRadioButton: selectedRadioButtonModel});
	
	//let the generated output & css be updated when the gradient type has been changed.
	uiDesignTools.events.eventManager.events['gradientTypeHasBeenUpdated'] = new uiDesignToolsEvent({type:'gradientTypeHasBeenUpdated'});
	
	return uiDesignTools;
});//end require