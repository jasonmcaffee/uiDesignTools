/**
 * @author Jason McAffee
 * Manages events. Pretty much just holds an events object which has properties/event types added to it. 
 */

define([], function(){

	//define the event manager. global scope singleton for eventing.
	function eventManager(optionsParam){
		this.options = {
			
		};
		$.extend(this.options, optionsParam);
		
		this.events = {};//array of events by type.  access done via eventManager.events['eventType']
	
	}
	
	//our define export
	return eventManager;

});
