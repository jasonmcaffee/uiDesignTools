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
 * @requires colorBox model
 * @requires colorBoxTemplate
 */

if(typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if(typeof uiDesignTools.colorPicker == 'undefined'){ uiDesignTools.colorPicker = {}; }
if(typeof uiDesignTools.colorPicker.models == 'undefined'){ uiDesignTools.colorPicker.models = {}; }

uiDesignTools.colorPicker.models.colorPicker = function(optionsParam){
	this.options = {
		//colorBoxes : [], //array of colorBox models
		colorBoxRows : [] //array of object {colorBoxes:[]}
		//colorBoxRgbaBackgroundColorTemplate : uiDesignTools.colorPicker.templates.colorBox.simpleRgbaBackgroundColorTemplate //default template

	};
	
	$.extend(this.options, optionsParam);
	
	//create all the rows for a given hue color
	this.createColorBoxRows(359, 30,30);
	
}

//using the hueColor(0-359), saturation(0-100), and brightness(0-100), this function calculates and returns the corresponding rgb values.
uiDesignTools.colorPicker.models.colorPicker.prototype.calculateRgbColorsUsingHsv = function(hue, saturation, valueBrightness) {
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
uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBoxRows = function(hueColor, numberOfRows, numberOfColumns){
	//calculate stages of brightness based off how many rows they want
	var brightnessDecrement = 100/numberOfRows;
	
	//iterate over each brightness possiblity, creating a new row for each possibility.
	for(var brightness = 100; brightness > 0; brightness-=brightnessDecrement){
		this.options.colorBoxRows.push(this.createColorBoxRow(numberOfColumns, brightness, hueColor));//create the row and add to our array
	}
	
}

//creates a colorBoxRow (saturation 1-100) comprised of colorBoxes for the given hue color and number of columns
uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBoxRow = function(numberOfColumns, rowBrightness, hueColor){
	var colorBoxes = this.createColorBoxesForRow(numberOfColumns, rowBrightness, hueColor);
	var colorBoxRow = {colorBoxes:colorBoxes};
	return colorBoxRow;
}

var callCount = 1; //temp hack
/*
 * covers saturation 0-100 for given hueColor and rowBrightness
 * a gradient box will be created for the various saturation and brightness of the hueColor
 * @param hueColor - value 0 (orange) to 359 (red)
 */
//creates an array of colorBox models and pushes them to this.options.colorBoxes
uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBoxesForRow = function(numberOfColumns, rowBrightness, hueColor){
	var self = this;
	
   //return value
	var colorBoxes = [];
	
	//calculate the number saturation stages (ie how many variances of saturation we can have given the number of columns)
	var saturationIncrement = 100 / numberOfColumns;
	
	//helper to quickly create colorbox and add to colorBoxes array.
	function c(red, green, blue){
		if(!red){return c;}//allow for placeholders (functioncalls with no params)
		var colorBox = self.createColorBox({red: red, green: green, blue:blue, alpha: 1});
		colorBoxes.push(colorBox);
		return c;//chain calls to this function with no . operator
	}
	
	//iterate over each saturation variance we can create, given the number of columns, and create a color box with that saturation
	for(var saturation = 0; saturation < 100; saturation+=saturationIncrement){
		//calculate the rgb for the given hue color, saturation, and brightness
		var calculatedRgb = this.calculateRgbColorsUsingHsv(hueColor, saturation, rowBrightness);
		c(calculatedRgb.red, calculatedRgb.green, calculatedRgb.blue);//create the colorBox
	}
	
	//return the colorBoxes we've created
	return colorBoxes;
}

//creates a single colorBox which will display the given rgba (via css background)
uiDesignTools.colorPicker.models.colorPicker.prototype.createColorBox = function(rgba){
	//var generatedBackgroundCssText = this.options.colorBoxRgbaBackgroundColorTemplate({rgba: rgba});  //don't do this. performance nightmare with so many objects keeping the text in memory
	
	var colorBox = new uiDesignTools.colorPicker.models.colorBox({
		colorBoxId : this.generateColorBoxId(rgba),//unique id for the color box. useful for on click events.
		rgba : rgba//the color the colorBox will be
	});
	
	return colorBox;
}

uiDesignTools.colorPicker.models.colorPicker.prototype.generateColorBoxId = function(rgba){
	return "colorBox_" + rgba.red + "_" + rgba.green + "_" + rgba.blue;
}





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
