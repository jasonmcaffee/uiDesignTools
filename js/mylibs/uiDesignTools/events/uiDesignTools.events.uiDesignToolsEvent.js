/**
 * @author Jason McAffee
 * Define our own type of event, following the pub/sub model.
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; } //ensure existence
if(typeof uiDesignTools.events == 'undefined') { uiDesignTools.events = {}; } //ensure existence

//define the event
uiDesignTools.events.uiDesignToolsEvent = function(optionsParam){
	this.options = {
		type: '', //some string representation of the event being emitted/received
		callbacks : [] //array of callbacks to call
	};

	$.extend(this.options, optionsParam);
}

//let all subscribers know that this event has occurred.
uiDesignTools.events.uiDesignToolsEvent.prototype.publish = function(eventData){
	//iterate over each registered callback/handler and execute it, passing it the passed in event data.
	for(var i=0; i < this.options.callbacks.length; ++i){
		var callbackToFire = this.options.callbacks[i];
		callbackToFire({data:eventData});
	}
}

//subscribers add their callback functions here, so that they can be notified when this event occurs/is published.
uiDesignTools.events.uiDesignToolsEvent.prototype.subscribe = function(callbackToFireOnEventPublish){
	//add the callback to callbacks
	this.options.callbacks.push(callbackToFireOnEventPublish);
}

uiDesignTools.events.uiDesignToolsEvent.prototype.unsubscribe = function(callbackToFireOnEventPublish){
	//todo: array.slice out matching index
}