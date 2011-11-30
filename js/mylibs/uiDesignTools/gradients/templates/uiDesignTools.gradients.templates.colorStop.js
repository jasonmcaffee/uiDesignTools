// This file was automatically generated from uiDesignTools.gradients.templates.colorStop.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.gradients == 'undefined') { uiDesignTools.gradients = {}; }
if (typeof uiDesignTools.gradients.templates == 'undefined') { uiDesignTools.gradients.templates = {}; }
if (typeof uiDesignTools.gradients.templates.colorStop == 'undefined') { uiDesignTools.gradients.templates.colorStop = {}; }


uiDesignTools.gradients.templates.colorStop.colorStopsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="colorStops" class="linearGradient-colorStops">');
  var colorStopList4 = opt_data.colorStops;
  var colorStopListLen4 = colorStopList4.length;
  for (var colorStopIndex4 = 0; colorStopIndex4 < colorStopListLen4; colorStopIndex4++) {
    var colorStopData4 = colorStopList4[colorStopIndex4];
    uiDesignTools.gradients.templates.colorStop.colorStopTemplate({colorStop: colorStopData4}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.colorStop.colorStopTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), '" class="linearGradient-colorStop">');
  uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for="redRange">red</label><input id="redRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.red), '" /><label for="greenRange">green</label><input id="greenRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.green), '" /><label for="blueRange">blue</label><input id="blueRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.blue), '" /><label for="alphaRange">alpha</label><input id="alphaRange" type="range" min="1" max="100" step="1" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.alpha), '" /><label for="positionRange">position</label><input id="positionRange" type="range" min="0" max="100" step="1" value="', soy.$$escapeHtml(opt_data.colorStop.options.position), '" /><input id="deleteColorStopButton" type="button" value="Delete"/>');
  return opt_sb ? '' : output.toString();
};
