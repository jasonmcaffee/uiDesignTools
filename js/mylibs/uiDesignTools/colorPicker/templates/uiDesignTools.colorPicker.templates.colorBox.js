// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.colorPicker == 'undefined') { uiDesignTools.colorPicker = {}; }
if (typeof uiDesignTools.colorPicker.templates == 'undefined') { uiDesignTools.colorPicker.templates = {}; }
if (typeof uiDesignTools.colorPicker.templates.colorBox == 'undefined') { uiDesignTools.colorPicker.templates.colorBox = {}; }


uiDesignTools.colorPicker.templates.colorBox.colorPickerInnerContentsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorPickerMinimizedContainerDivId), '" class="colorPicker-minimized-container">');
  uiDesignTools.colorPicker.templates.colorBox.colorPickerMinimizedTemplate(opt_data, output);
  output.append('</div><div id="', soy.$$escapeHtml(opt_data.colorPickerExpandedDivId), '" class="colorPicker-expanded"><div id="', soy.$$escapeHtml(opt_data.colorBoxesDivId), '" class="colorPicker-colorBoxes">');
  uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate(opt_data, output);
  output.append('</div>\t<div class="hueRangeContainer"><label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0"/></div></div><!-- end colorPickerDivIdExpanded -->');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorPickerMinimizedTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorPickerMinimizedDivId), '" class="colorPicker-minimized" style="background-color: rgba(', soy.$$escapeHtml(opt_data.colorPickerModel.currentlySelectedRGBA.red), ',', soy.$$escapeHtml(opt_data.colorPickerModel.currentlySelectedRGBA.green), ',', soy.$$escapeHtml(opt_data.colorPickerModel.currentlySelectedRGBA.blue), ', 1);">&nbsp;</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var colorBoxRowList31 = opt_data.colorPickerModel.options.colorBoxRows;
  var colorBoxRowListLen31 = colorBoxRowList31.length;
  for (var colorBoxRowIndex31 = 0; colorBoxRowIndex31 < colorBoxRowListLen31; colorBoxRowIndex31++) {
    var colorBoxRowData31 = colorBoxRowList31[colorBoxRowIndex31];
    output.append('<div class="colorBoxRow">');
    var colorBoxList33 = colorBoxRowData31.colorBoxes;
    var colorBoxListLen33 = colorBoxList33.length;
    for (var colorBoxIndex33 = 0; colorBoxIndex33 < colorBoxListLen33; colorBoxIndex33++) {
      var colorBoxData33 = colorBoxList33[colorBoxIndex33];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData33.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData33.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData33.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData33.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData33.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
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
