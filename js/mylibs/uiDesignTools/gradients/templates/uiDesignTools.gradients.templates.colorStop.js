// This file was automatically generated from uiDesignTools.gradients.templates.colorStop.html.
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
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), '" class="linearGradient-colorStop"><div id="colorStopColumn1" class="lg-color-stop-column-1"><div id="colorPicker" class="linearGradient-colorStop-colorPicker"></div><div id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'InputRanges" class="linearGradient-colorStop-inputRanges">');
  uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate(opt_data, output);
  output.append('</div></div><div id="colorStopColumn2" class="lg-color-stop-column-2"><div id="deleteColorStopButton', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), '" class="lg-delete-color-stop-button"><img src="img/deleteButton.png" alt="Delete color stop"/></div></div></div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'redRange">red</label><input id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'redRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.red), '" /><label for="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'greenRange">green</label><input id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'greenRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.green), '" /><label for="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'blueRange">blue</label><input id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'blueRange" type="range" min="0" max="255" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.blue), '" /><label for="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'alphaRange">alpha</label><input id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'alphaRange" type="range" min="1" max="100" step="1" value="', soy.$$escapeHtml(opt_data.colorStop.options.rgba.alpha), '" /><label for="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'positionRange">position</label><input id="', soy.$$escapeHtml(opt_data.colorStop.options.colorStopId), 'positionRange" type="range" min="0" max="100" step="1" value="', soy.$$escapeHtml(opt_data.colorStop.options.position), '" />');
  return opt_sb ? '' : output.toString();
};
