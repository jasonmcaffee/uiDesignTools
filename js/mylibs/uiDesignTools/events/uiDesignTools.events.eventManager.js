/**
 * @author Jason McAffee
 * including this script will instantiate a globally scoped singleton event manager.
 * found here:
 * uiDesignTools.events.eventManager
 * 
 * all eventing between widgets, sub-widgets, etc, should go through this event manager.
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.events == 'undefined') { uiDesignTools.events = {}; } //ensure existence


//define the event manager. global scope singleton for eventing.
uiDesignTools.events.uiEventManager = function(optionsParam){
	this.options = {
		
	};
	$.extend(this.options, optionsParam);
	
	this.events = {};//array of events by type.  access done via eventManager.events['eventType']

}

//instantiate global scope singleton event manager.
uiDesignTools.events.eventManager = new uiDesignTools.events.uiEventManager({});

