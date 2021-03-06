/**
 * @author Jason McAffee
 * 
 * This module is responsible for representing the colorPicker model.
 * It's primary responsibility is to define state, as well as some factory methods used to generate all the colorBoxes for a particular hue color.
 * This means that all the variances, including saturation and brightness, will be generated and placed into colorBoxRows.
 * 
 * A colorBoxRow represents all the colorBox saturation variances for a single brightness level.
 * 
 * Saturation values are 1-100, and run left to right. (row)
 * Brightness values are 1-100, and run bottom to top. (column)
 * 
 * 
 */


define([
	'mylibs/uiDesignTools/uiDesignTools', //core library
	'libs/jquery/jqueryModule',
	'mylibs/uiDesignTools/colorPicker/models/colorBox',
	'mylibs/uiDesignTools/colorPicker/models/hueRangeSelectorBox'
], function(uiDesignTools, $, colorBox, hueRangeSelectorBox){
	
	var uniqueIdCount = 0;
	
	function colorPicker(optionsParam){
		this.options = {
			uniqueId : uniqueIdCount++,
			colorBoxRows : [], //array of object {colorBoxes:[]}
			hueColor : 128, //color we are currently displaying in the colorPicker. 0-359
			numberOfRows : 30, //the number of rows the colorPicker should have
			numberOfColumns : 30,
			currentlySelectedRGBA : false, //will be calculated for you based off the hue color if not set. this quirk is due to us not having a formula to calculate hsv based off of rgba (we only have the other way around)
			hueRangeSelectorBoxes : false  //when we generate the hue range selector, we will use this model to figure out the rgba of each select box
		};
		
		$.extend(this.options, optionsParam);
		
		//when the user clicks a colorBox, this model will be set
		if(!this.options.currentlySelectedRGBA)
			this.options.currentlySelectedRGBA = this.calculateRgbColorsUsingHsv(this.options.hueColor, 100, 100);//needed for generating the template, as the background color of colorPicker-minimized depends on this value.
		
		if(!this.options.hueRangeSelectorBoxes)
			this.options.hueRangeSelectorBoxes = this.createHueRangeSelectorBoxes();
			
		//create all the rows for a given hue color
		this.createColorBoxRows(this.options.hueColor, this.options.numberOfRows,this.options.numberOfColumns);
		
	}
	
	//for the hue range selector (used in expanded view), we need a model to dictate the html generated
	colorPicker.prototype.createHueRangeSelectorBoxes = function(){
		var hueRangeSelectorBoxes = [];
		
		//iterate over each hueColor and create a box model representation
		for(var i = 0; i <=359; ++i){
			var calculatedRgb = this.calculateRgbColorsUsingHsv(i, 100, 100);
			calculatedRgb.alpha = 1;
			
			var newHueRangeSelectorBox = new hueRangeSelectorBox({
				hueColor: i,
				rgba : calculatedRgb
			});
			
			hueRangeSelectorBoxes.push(newHueRangeSelectorBox);//add to our return array
		}
		
		return hueRangeSelectorBoxes;
	}
	
  //model updates which emit events. regens colorBoxRows
	colorPicker.prototype.setHueColor = function(newHueColor){
		this.options.hueColor = newHueColor;
		
		this.options.currentlySelectedRGBA = this.calculateRgbColorsUsingHsv(this.options.hueColor, 100, 100);
		
		//regen colorBoxRows
		this.createColorBoxRows(this.options.hueColor, this.options.numberOfRows,this.options.numberOfColumns);
		
		uiDesignTools.events.eventManager.events['colorPickerModelChanged'].publish({colorPicker:this});
		
	};


	//using the hueColor(0-359), saturation(0-100), and brightness(0-100), this function calculates and returns the corresponding rgb values.
	colorPicker.prototype.calculateRgbColorsUsingHsv = function(hue, saturation, valueBrightness) {
	        while (hue >= 360)
	            hue -= 360;
	        
	        Hi = Math.floor(hue / 60);
	        if (hue == 360)
	            hue = 0;
	        f = hue / 60 - Hi;
	        if (saturation > 1)
	            saturation /= 100;
	        if (valueBrightness > 1)
	            valueBrightness /= 100;
	        p = (valueBrightness * (1 - saturation));
	        q = (valueBrightness * (1 - (f * saturation)));
	        t = (valueBrightness * (1 - ((1 - f) * saturation)));
	        switch (Hi) {
	            case 0:
	                red = valueBrightness;
	                green = t;
	                blue = p;
	                break;
	            case 1:
	                red = q;
	                green = valueBrightness;
	                blue = p;
	                break;
	            case 2:
	                red = p;
	                green = valueBrightness;
	                blue = t;
	                break;
	            case 3:
	                red = p;
	                green = q;
	                blue = valueBrightness;
	                break;
	            case 4:
	                red = t;
	                green = p;
	                blue = valueBrightness;
	                break;
	            default:
	                red = valueBrightness;
	                green = p;
	                blue = q;
	                break;
	        }
	        if (saturation == 0) {
	            red = valueBrightness;
	            green = valueBrightness;
	            blue = valueBrightness;
	        }
	        red *= 255;
	        green *= 255;
	        blue *= 255;
	        red = Math.round(red);
	        green = Math.round(green);
	        blue = Math.round(blue);
	        return {red: red,green: green,blue: blue}
	};
	
	
	//creates all brightness & saturation combinations for given hueColor.
	//rows & columns should likely be the same.
	colorPicker.prototype.createColorBoxRows = function(hueColor, numberOfRows, numberOfColumns){
		this.options.colorBoxRows = [];//always start anew when this is called.
		
		//calculate stages of brightness based off how many rows they want
		var brightnessDecrement = 100/numberOfRows;
		
		//iterate over each brightness possiblity, creating a new row for each possibility.
		
		for(var brightness = 100, rowNumber=0; brightness > 0; brightness-=brightnessDecrement, ++rowNumber){
			this.options.colorBoxRows.push(this.createColorBoxRow(numberOfColumns, brightness, hueColor, rowNumber));//create the row and add to our array
		}
		
	};
	
	//creates a colorBoxRow (saturation 1-100) comprised of colorBoxes for the given hue color and number of columns
	colorPicker.prototype.createColorBoxRow = function(numberOfColumns, rowBrightness, hueColor, rowNumber){
		var colorBoxes = this.createColorBoxesForRow(numberOfColumns, rowBrightness, hueColor, rowNumber);
		var colorBoxRow = {colorBoxes:colorBoxes};
		return colorBoxRow;
	};
	
	/*
	 * covers saturation 0-100 for given hueColor and rowBrightness
	 * a gradient box will be created for the various saturation and brightness of the hueColor
	 * @param hueColor - value 0 (orange) to 359 (red)
	 */
	//creates an array of colorBox models and pushes them to this.options.colorBoxes
	colorPicker.prototype.createColorBoxesForRow = function(numberOfColumns, rowBrightness, hueColor, rowNumber){
		var self = this;
		
	   //return value
		var colorBoxes = [];
		
		//calculate the number saturation stages (ie how many variances of saturation we can have given the number of columns)
		var saturationIncrement = 100 / numberOfColumns;
		
		//helper to quickly create colorbox and add to colorBoxes array.
		// function c(red, green, blue){
			// if(!red){return c;}//allow for placeholders (functioncalls with no params)
			// var newColorBox = self.createColorBox({red: red, green: green, blue:blue, alpha: 1});
			// colorBoxes.push(newColorBox);
			// return c;//chain calls to this function with no . operator
		// }
		
		//iterate over each saturation variance we can create, given the number of columns, and create a color box with that saturation
		for(var saturation = 0, columnNumber=0; saturation < 100; saturation+=saturationIncrement, ++columnNumber){
			//calculate the rgb for the given hue color, saturation, and brightness
			var calculatedRgb = this.calculateRgbColorsUsingHsv(hueColor, saturation, rowBrightness);
			
			//create the colorBox
			var newColorBox = new colorBox({ 
					rgba: {red: calculatedRgb.red, green: calculatedRgb.green, blue: calculatedRgb.blue, alpha: 1},
					colorBoxId : "colorBox_" + rowNumber + "_" + columnNumber //we don't want this to be unique every time.
				});
				
			//ad the colorBox to our collection
			colorBoxes.push(newColorBox);
		}
		
		//return the colorBoxes we've created
		return colorBoxes;
	};
	
	//creates a single colorBox which will display the given rgba (via css background)
	// colorPicker.prototype.createColorBox = function(rgba){
		// //var generatedBackgroundCssText = this.options.colorBoxRgbaBackgroundColorTemplate({rgba: rgba});  //don't do this. performance nightmare with so many objects keeping the text in memory
// 		
		// var newColorBox = new colorBox({
			// colorBoxId : this.generateColorBoxId(rgba),//unique id for the color box. useful for on click events.
			// rgba : rgba//the color the colorBox will be
		// });
// 		
		// return newColorBox;
	// };
	
	//generates a unique id (inside of its container, not necessarily unique for entire page) for the colorbox
	// colorPicker.prototype.generateColorBoxId = function(rgba){
		// return "colorBox_" + rgba.red + "_" + rgba.green + "_" + rgba.blue;
	// };
 
  //return module export
 	return colorPicker;

});//end define


//old junk i don't want to get rid of yet
//basically you can do random ratios
	// subtract 10 from red, subtract 9 for green, subtract 0 for blue????????????????
	//more like a ratio
	
	
	//var numberOfColumns = 30;
	//var startBase = 255; //255, 242, etc
	// var decrement = Math.ceil(255 / numberOfColumns);
// 	
	// console.log('==================================================== Begin');
	// //if(++callCount == 1){
		// // var red = green = blue = startBase;
		// // for(var column=1; column <= numberOfColumns; ++column){
// // 			
			// // c(red, green, blue);
			// // red -= decrement;
			// // green = Math.ceil(red * (1 + (.03 * column)));
			// // if(red < 0){red = 1};
			// // if(green < 0){green = 1};
// // 			
			// // console.log('('+red+',' + green + ',' + blue + ')');
		// // }
// 		
// 		
		// //hazaa! the ratios are the same! now to figure out ratio growth rate between each row.
		// if(callCount == 1){
			// callCount++;
		// //top
			// c
		 // (255,255,255)   //
		 // (227,237,255)   // 1  255/227 = 1.123   255/237 = 1.075949                     log(x) *100 ???
		 // (199,219,255)   //    255/199 = 1.281   255/219 = 1.1643
		 // (171,202,255)   // 2  255/171 = 1.491   255/202 = 1.26237            1.164 * 1.281 = 1.491
		 // (143,184,255)   //    255/143 = 1.78    255/184 = 1.38               1.193
		 // (115,166,255)   // 3  255/115 = 2.21    255/166 = 1.53               1.241
		 // (87,148,255)   //     255/87 = 2.93     255/148 = 1.72               1.325
		 // (59,130,255)   //  4  255/59 = 4.32     255/130 = 1.96               1.474
		 // (31,113,255)   //     255/31 = 8.28     255/113 = 2.25               1.916
		 // (3,95,255)   //    5  255/3 = 85        255/95 = 2.68
		 // (0,93,255)   //
		 // ()   //
		// }else if(callCount ==2){
			// callCount++;
		// //middle - going down by 28 for red.  figure out ratio. the amount we subtract from red for each stop changes the further down (rows) we go.
			// c
		 // (128,128,128)   //
		 					// (113,119,128)  //   128/113 = 1.13
		 // (99,110,128)   // 1          128/99 = 1.292    128/110 = 1.63636363
		 					// (85,101,128)  //    128/85 = 1.505    128/101 = 1.26
		 // (71,92,128)   //  2    	    128/71 = 1.802    128/92 = 1.391
		 // (43,74,128)   //  3          128/43 = 2.96     128/74 = 1.7297
		 // (15,56,128)   //  4          128/15 = 8.53     128/56 = 2.28
		          // //(1,)
		 // (0,47,128)   //   5    
// 
		// }else if(callCount ==3){
			// callCount++;
	// //bottom
			// c
		 // (242,242,242)   //
		 // (235,238,242)   //
		 // (228,234,242)   //
		 // (216,228,242)   //
		 // (206,223,242)   //
		 // (194,216,242)   //
		 // (187,213,242)   //
		// }
		
		
			// //black to grey to white.
	// for(var red =1; red<=max; red+=increment){
		// var colorBox = this.createColorBox({red: red, green: red, blue:red, alpha: 1});
		// this.options.colorBoxes.push(colorBox);
	// }
// 	
// 	
// 	
// 	
	// for(var red =1; red<=60; red+=increment){
		// var colorBox = this.createColorBox({red: red, green: red, blue:red, alpha: 1});
		// this.options.colorBoxes.push(colorBox);
	// }
	
	//doing it this way, the colors don't look good together
	// for(var red = 1; red <= max; red+=increment){
		// for(var green = 1; green <= max; green+=increment){
			// for(var blue = 1; blue <= max; blue+=increment){
				// var colorBox = this.createColorBox({red: red, green: green, blue:blue, alpha: 1});
				// this.options.colorBoxes.push(colorBox);
			// }
		// }
	// }
