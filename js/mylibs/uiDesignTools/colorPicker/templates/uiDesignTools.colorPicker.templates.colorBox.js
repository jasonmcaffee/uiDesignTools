// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.colorPicker == 'undefined') { uiDesignTools.colorPicker = {}; }
if (typeof uiDesignTools.colorPicker.templates == 'undefined') { uiDesignTools.colorPicker.templates = {}; }
if (typeof uiDesignTools.colorPicker.templates.colorBox == 'undefined') { uiDesignTools.colorPicker.templates.colorBox = {}; }


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorBoxesDivId), '" class="colorPicker-colorBoxes">');
  var colorBoxRowList6 = opt_data.colorBoxRows;
  var colorBoxRowListLen6 = colorBoxRowList6.length;
  for (var colorBoxRowIndex6 = 0; colorBoxRowIndex6 < colorBoxRowListLen6; colorBoxRowIndex6++) {
    var colorBoxRowData6 = colorBoxRowList6[colorBoxRowIndex6];
    output.append('<div class="colorBoxRow">');
    var colorBoxList8 = colorBoxRowData6.colorBoxes;
    var colorBoxListLen8 = colorBoxList8.length;
    for (var colorBoxIndex8 = 0; colorBoxIndex8 < colorBoxListLen8; colorBoxIndex8++) {
      var colorBoxData8 = colorBoxList8[colorBoxIndex8];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData8.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData8.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData8.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData8.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData8.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
    }
    output.append('</div>');
  }
  output.append('</div><div class="hueRangeContainer"><label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0"/></div>');
  return opt_sb ? '' : output.toString();
};
