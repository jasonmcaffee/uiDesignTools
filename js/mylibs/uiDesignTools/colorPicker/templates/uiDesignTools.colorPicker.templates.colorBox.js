// This file was automatically generated from uiDesignTools.colorPicker.templates.colorBox.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.colorPicker == 'undefined') { uiDesignTools.colorPicker = {}; }
if (typeof uiDesignTools.colorPicker.templates == 'undefined') { uiDesignTools.colorPicker.templates = {}; }
if (typeof uiDesignTools.colorPicker.templates.colorBox == 'undefined') { uiDesignTools.colorPicker.templates.colorBox = {}; }


uiDesignTools.colorPicker.templates.colorBox.colorPickerInnerContentsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.colorBoxesDivId), '" class="colorPicker-colorBoxes">');
  uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate(opt_data, output);
  output.append('</div>\t<div class="hueRangeContainer"><label for="hueRange">hue</label><input id="hueRange" type="range" max="359" min="0"/></div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.colorPicker.templates.colorBox.colorBoxesTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var colorBoxRowList12 = opt_data.colorPickerModel.options.colorBoxRows;
  var colorBoxRowListLen12 = colorBoxRowList12.length;
  for (var colorBoxRowIndex12 = 0; colorBoxRowIndex12 < colorBoxRowListLen12; colorBoxRowIndex12++) {
    var colorBoxRowData12 = colorBoxRowList12[colorBoxRowIndex12];
    output.append('<div class="colorBoxRow">');
    var colorBoxList14 = colorBoxRowData12.colorBoxes;
    var colorBoxListLen14 = colorBoxList14.length;
    for (var colorBoxIndex14 = 0; colorBoxIndex14 < colorBoxListLen14; colorBoxIndex14++) {
      var colorBoxData14 = colorBoxList14[colorBoxIndex14];
      output.append('<div id="', soy.$$escapeHtml(colorBoxData14.options.colorBoxId), '" class="colorBox" style="background-color: rgba(', soy.$$escapeHtml(colorBoxData14.options.rgba.red), ', ', soy.$$escapeHtml(colorBoxData14.options.rgba.green), ', ', soy.$$escapeHtml(colorBoxData14.options.rgba.blue), ', ', soy.$$escapeHtml(colorBoxData14.options.rgba.alpha), ');"><a href="javascript:return;" style="opacity:0.0">#</a></div>');
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
