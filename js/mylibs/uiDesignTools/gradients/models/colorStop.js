/**
 * @author Jason McAffee
 * This type is based off the gradient definition found here:
 * http://dev.w3.org/csswg/css3-images/
 * 
 * a gradient can have multiple color stops. each color stop represents a transition in color and/or opacity.
 */
define([], function(){
	
	//colorStop used for defining transitions in the gradient
	function colorStop(optionsParam){
		this.options = {
			colorStopId : 0,//used for div id
			rgba : {red: 1, green: 1, blue: 1, alpha:100},
			position : 90 // where the color stop is positioned (50 for %50)  Color-stops are allowed to have positions before 0% or after 100%
		}
		
		$.extend(this.options, optionsParam);//merge default options with what was passed in
		
	};//end colorStop
	
	
	return colorStop;
});
