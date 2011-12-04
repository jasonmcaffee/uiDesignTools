// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.colorPicker == 'undefined') { uiDesignTools.colorPicker = {}; }
if (typeof uiDesignTools.colorPicker.templates == 'undefined') { uiDesignTools.colorPicker.templates = {}; }
if (typeof uiDesignTools.colorPicker.templates.colorBox == 'undefined') { uiDesignTools.colorPicker.templates.colorBox = {}; }


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorBoxesDivId), '" class="colorPicker-colorBoxes">');
  var colorBoxList6 = opt_data.colorBoxes;
  var colorBoxListLen6 = colorBoxList6.length;
  for (var colorBoxIndex6 = 0; colorBoxIndex6 < colorBoxListLen6; colorBoxIndex6++) {
    var colorBoxData6 = colorBoxList6[colorBoxIndex6];
    uiDesignTools.colorPicker.templates.colorBox.colorBoxTemplate({colorBox: colorBoxData6}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorBox.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(opt_data.colorBox.options.rgba.red), ', ', soy.$$escapeHtml(opt_data.colorBox.options.rgba.green), ', ', soy.$$escapeHtml(opt_data.colorBox.options.rgba.blue), ', ', soy.$$escapeHtml(opt_data.colorBox.options.rgba.alpha), ');">&nbsp;</div>');
  return opt_sb ? '' : output.toString();
};
