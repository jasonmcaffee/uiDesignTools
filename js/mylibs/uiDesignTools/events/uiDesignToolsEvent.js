/**
 * @author Jason McAffee
 * Define our own type of event, following the pub/sub model.
 * A new one of these will be added to eventManager.events for each event type the application wants to create.
 * eg eventManager.events['myEventType'] = new uiDesignToolsEvent({'myEventType'})
 * 
 */
define([
	'libs/jquery/jqueryModule',
], function($){
	//define the event
	function uiDesignToolsEvent(optionsParam){
		this.options = {
			type: '', //some string representation of the event being emitted/received
			callbacks : [] //array of callbacks to call
		};
	
		$.extend(this.options, optionsParam);
	}
	
	//let all subscribers know that this event has occurred.
	uiDesignToolsEvent.prototype.publish = function(eventData){
		//iterate over each registered callback/handler and execute it, passing it the passed in event data.
		for(var i=0; i < this.options.callbacks.length; ++i){
			var callbackToFire = this.options.callbacks[i];
			callbackToFire({data:eventData});
		}
	};
	
	//subscribers add their callback functions here, so that they can be notified when this event occurs/is published.
	uiDesignToolsEvent.prototype.subscribe = function(callbackToFireOnEventPublish){
		//add the callback to callbacks
		this.options.callbacks.push(callbackToFireOnEventPublish);
	};
	
	uiDesignToolsEvent.prototype.unsubscribe = function(callbackToFireOnEventPublish){
		//todo: array.slice out matching index
	};
	
	//our define export
	return uiDesignToolsEvent;

});