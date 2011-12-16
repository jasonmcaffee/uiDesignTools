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
	uiDesignTools.events.eventManager.events['colorStopModelHasChanged'] = new uiDesignToolsEvent({type:'colorStopModelHasChanged'});
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenAdded'] = new uiDesignToolsEvent({type:'colorStopModelHasBeenAdded'});
	//color stop widget cant delete the model, so fires this event when the delete button is clicked
	uiDesignTools.events.eventManager.events['colorStopModelShouldBeDeleted'] = new uiDesignToolsEvent({type:'colorStopModelShouldBeDeleted'});
	//not sure if this should be used...probably
	uiDesignTools.events.eventManager.events['colorStopModelHasBeenDeleted'] = new uiDesignToolsEvent({type:'colorStopModelHasBeenDeleted'});
	
	uiDesignTools.events.eventManager.events['linearGradientModelHasChanged'] = new uiDesignToolsEvent({type:'linearGradientModelHasChanged'});
	
	uiDesignTools.events.eventManager.events['colorPickerModelChanged'] = new uiDesignToolsEvent({type:'colorPickerModelChanged'});

	return uiDesignTools;//todo: stop global namespage polution and declare this as a local var. looks like it's already behaving that way.
});//end require