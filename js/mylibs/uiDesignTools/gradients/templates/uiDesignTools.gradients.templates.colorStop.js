// This file was automatically generated from uiDesignTools.gradients.templates.colorStop.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.gradients == 'undefined') { uiDesignTools.gradients = {}; }
if (typeof uiDesignTools.gradients.templates == 'undefined') { uiDesignTools.gradients.templates = {}; }
if (typeof uiDesignTools.gradients.templates.colorStop == 'undefined') { uiDesignTools.gradients.templates.colorStop = {}; }


uiDesignTools.gradients.templates.colorStop.colorStopTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorStopId), '">');
  uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate(null, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.colorStop.colorStopInnerContentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label for="redRange">red</label><input id="redRange" type="range" min="0" max="255" value="25" /><label for="greenRange">green</label><input id="greenRange" type="range" min="0" max="255" value="25" /><label for="blueRange">blue</label><input id="blueRange" type="range" min="0" max="255" value="25" /><label for="alphaRange">alpha</label><input id="alphaRange" type="range" min="0" max="1" step=".01" value="1" />');
  return opt_sb ? '' : output.toString();
};
