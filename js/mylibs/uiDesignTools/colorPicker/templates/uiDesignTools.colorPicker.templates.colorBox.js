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
  output.append('</div>');
  uiDesignTools.colorPicker.templates.colorBox.hueRangeTemplate(opt_data, output);
  output.append('</div><!-- end colorPickerDivIdExpanded -->');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorPickerMinimizedTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorPickerMinimizedDivId), '" class="colorPicker-minimized" style="background-color: rgba(', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.red), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.green), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.blue), ', 1);">rgb(', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.red), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.green), ',', soy.$$escapeHtml(opt_data.colorPickerModel.options.currentlySelectedRGBA.blue), ')</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var colorBoxRowList38 = opt_data.colorPickerModel.options.colorBoxRows;
  var colorBoxRowListLen38 = colorBoxRowList38.length;
  for (var colorBoxRowIndex38 = 0; colorBoxRowIndex38 < colorBoxRowListLen38; colorBoxRowIndex38++) {
    var colorBoxRowData38 = colorBoxRowList38[colorBoxRowIndex38];
    output.append('<div class="colorBoxRow">');
    var colorBoxList40 = colorBoxRowData38.colorBoxes;
    var colorBoxListLen40 = colorBoxList40.length;
    for (var colorBoxIndex40 = 0; colorBoxIndex40 < colorBoxListLen40; colorBoxIndex40++) {
      var colorBoxData40 = colorBoxList40[colorBoxIndex40];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData40.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData40.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData40.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData40.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData40.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.hueRangeTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="hueRangeContainer" class="hueRangeContainer"><!-- <label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0" value="', soy.$$escapeHtml(opt_data.colorPickerModel.options.hueColor), '"/>-->');
  var hueRangeSelectorBoxList59 = opt_data.colorPickerModel.options.hueRangeSelectorBoxes;
  var hueRangeSelectorBoxListLen59 = hueRangeSelectorBoxList59.length;
  for (var hueRangeSelectorBoxIndex59 = 0; hueRangeSelectorBoxIndex59 < hueRangeSelectorBoxListLen59; hueRangeSelectorBoxIndex59++) {
    var hueRangeSelectorBoxData59 = hueRangeSelectorBoxList59[hueRangeSelectorBoxIndex59];
    output.append('<div id="hueRangeSelectorBox', soy.$$escapeHtml(hueRangeSelectorBoxData59.options.hueColor), '" class="hue-range-selector-box" style="background-color: rgba(', soy.$$escapeHtml(hueRangeSelectorBoxData59.options.rgba.red), ', ', soy.$$escapeHtml(hueRangeSelectorBoxData59.options.rgba.green), ', ', soy.$$escapeHtml(hueRangeSelectorBoxData59.options.rgba.blue), ', ', soy.$$escapeHtml(hueRangeSelectorBoxData59.options.rgba.alpha), ');">&nbsp;</div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};
