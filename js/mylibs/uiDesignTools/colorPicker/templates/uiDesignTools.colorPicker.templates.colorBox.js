// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.colorPicker == 'undefined') { uiDesignTools.colorPicker = {}; }
if (typeof uiDesignTools.colorPicker.templates == 'undefined') { uiDesignTools.colorPicker.templates = {}; }
if (typeof uiDesignTools.colorPicker.templates.colorBox == 'undefined') { uiDesignTools.colorPicker.templates.colorBox = {}; }


uiDesignTools.colorPicker.templates.colorBox.colorPickerInnerContentsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorPickerMinimizedDivId), '" class="colorPicker-minimized" style="background-color: rgba(1,1,1,1);">&nbsp;</div><div id="', soy.$$escapeHtml(opt_data.colorPickerExpandedDivId), '" class="colorPicker-expanded"><div id="', soy.$$escapeHtml(opt_data.colorBoxesDivId), '" class="colorPicker-colorBoxes">');
  uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate(opt_data, output);
  output.append('</div>\t<div class="hueRangeContainer"><label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0"/></div></div><!-- end colorPickerDivIdExpanded -->');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var colorBoxRowList17 = opt_data.colorPickerModel.options.colorBoxRows;
  var colorBoxRowListLen17 = colorBoxRowList17.length;
  for (var colorBoxRowIndex17 = 0; colorBoxRowIndex17 < colorBoxRowListLen17; colorBoxRowIndex17++) {
    var colorBoxRowData17 = colorBoxRowList17[colorBoxRowIndex17];
    output.append('<div class="colorBoxRow">');
    var colorBoxList19 = colorBoxRowData17.colorBoxes;
    var colorBoxListLen19 = colorBoxList19.length;
    for (var colorBoxIndex19 = 0; colorBoxIndex19 < colorBoxListLen19; colorBoxIndex19++) {
      var colorBoxData19 = colorBoxList19[colorBoxIndex19];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData19.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData19.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData19.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData19.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData19.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.hueRangeTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="hueRangeContainer"><label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0"/></div>');
  return opt_sb ? '' : output.toString();
};
