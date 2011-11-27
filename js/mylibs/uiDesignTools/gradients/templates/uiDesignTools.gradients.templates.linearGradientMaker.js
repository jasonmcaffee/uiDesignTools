// This file was automatically generated from uiDesignTools.gradients.templates.linearGradientMaker.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.gradients == 'undefined') { uiDesignTools.gradients = {}; }
if (typeof uiDesignTools.gradients.templates == 'undefined') { uiDesignTools.gradients.templates = {}; }
if (typeof uiDesignTools.gradients.templates.linearGradientMaker == 'undefined') { uiDesignTools.gradients.templates.linearGradientMaker = {}; }


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMaker">');
  uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerInnerContentTemplate(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerInnerContentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMakerControlsRow1" class="linearGradient-linearGradientMakerControlsRow1"><!-- Column 1 --><div id="linearGradientMakerControlsColumn1" class="linearGradient-linearGradientMakerControlsColumn1"><div id="generatedOutputsContainer" class="linearGradient-generatedOutputsContainer"><div id="generatedLinearGradientCssOutput" class="linearGradient-generatedLinearGradientCssOutput"><textarea id="generatedLinearGradientCssOutputTextArea" rows="15" cols="70">generated css goes here</textarea></div><div id="gradientOutput" class="linearGradient-gradientOutput">&nbsp;</div></div></div><!-- End Column 1 --><!-- Column 2 --><div id="linearGradientMakerControlsColumn2" class="linearGradient-linearGradientMakerControlsColumn2">');
  uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate(opt_data, output);
  output.append('</div><!-- end column 2 --></div><!-- end row 1-->');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMakerControls" class="linearGradient-controls"><!-- all controls related to color stops --><div id="colorStopsComponent" class="linearGradient-colorStopsComponent"><h4>Color Stops</h4><!-- write out colorStops button panel (add colorStop)--><div id="colorStopsButtonPanel" class="linearGradient-colorStopsButtonPanel"><div id="addColorStopButtonContainer" class="linearGradient-colorStopButtonContainer"><input id="addColorStopButton" type="button" value="Add Color Stop"></div></div>');
  uiDesignTools.gradients.templates.colorStop.colorStopsTemplate({colorStops: opt_data.linearGradient.options.colorStops}, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};
