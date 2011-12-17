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
			//var callbackToFire = this.options.callbacks[i];                     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND WAY TO REGISTER AND CALL FILTER CRITERIA SO THAT THE CALLBACK ISNT FIRED . ugh just add it to the event data and have them filter..maybe..
			//callbackToFire({data:eventData});
			var registrationContainer = this.options.callbacks[i];//grab the container so we can evaluate properties
			var callback = registrationContainer.callback;
			var filter = registrationContainer.filter;
			var filterFunctionEvaluationData = registrationContainer.filterFunctionEvaluationData;
			if(typeof filter != "undefined"){ //if there is a filter function defined, we should only call the callback when the filter returns true
				if(filter({data:eventData}, filterFunctionEvaluationData)){//only call the callback if true
					callback({data:eventData});
				}
			}else{ //if no filter present, call the callback.
				callback({data:eventData});
			}
		}
	};
	
	//subscribers add their callback functions here, so that they can be notified when this event occurs/is published.
	uiDesignToolsEvent.prototype.subscribe = function(callbackToFireOnEventPublish, filterFunction, filterFunctionEvaluationData){
		var registrationContainer = {
			callback : callbackToFireOnEventPublish,
			filter : filterFunction,
			filterFunctionEvaluationData : filterFunctionEvaluationData
		}
		//add the callback to callbacks
		//this.options.callbacks.push(callbackToFireOnEventPublish);
		this.options.callbacks.push(registrationContainer);
	};
	
	uiDesignToolsEvent.prototype.unsubscribe = function(callbackToFireOnEventPublish){
		//todo: array.slice out matching index
	};
	
	//our define export
	return uiDesignToolsEvent;

});