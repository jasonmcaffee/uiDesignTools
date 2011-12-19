// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.html.
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
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorPickerMinimizedDivId), '" class="colorPicker-minimized" style="background-color: rgba(', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.red), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.green), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.blue), ', 1);">rgb(', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.red), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.green), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.blue), ')</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var colorBoxRowList37 = opt_data.colorPickerModel.options.colorBoxRows;
  var colorBoxRowListLen37 = colorBoxRowList37.length;
  for (var colorBoxRowIndex37 = 0; colorBoxRowIndex37 < colorBoxRowListLen37; colorBoxRowIndex37++) {
    var colorBoxRowData37 = colorBoxRowList37[colorBoxRowIndex37];
    output.append('<div class="colorBoxRow">');
    var colorBoxList39 = colorBoxRowData37.colorBoxes;
    var colorBoxListLen39 = colorBoxList39.length;
    for (var colorBoxIndex39 = 0; colorBoxIndex39 < colorBoxListLen39; colorBoxIndex39++) {
      var colorBoxData39 = colorBoxList39[colorBoxIndex39];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData39.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData39.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData39.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData39.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData39.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
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
