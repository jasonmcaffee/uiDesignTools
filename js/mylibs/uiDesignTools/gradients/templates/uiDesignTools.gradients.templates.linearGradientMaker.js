// This file was automatically generated from uiDesignTools.gradients.templates.linearGradientMaker.html.
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
  output.append('<div id="linearGradientMakerControlsRow1" class="linearGradient-linearGradientMakerControlsRow1"><!-- Column 1 --><div id="linearGradientMakerControlsColumn1" class="linearGradient-linearGradientMakerControlsColumn1"><div id="generatedOutputsContainer" class="linearGradient-generatedOutputsContainer"><div id="gradientOutput" class="linearGradient-gradientOutput">&nbsp;</div><div id="generatedLinearGradientCssPreviewContainer" class="linearGradient-generatedLinearGradientCssPreviewContainer"><div id="cssTextPreviewToolbar" class="css-text-preview-toolbar"><span id="cssTextPreviewButton" class="css-text-preview-toolbar-button"><img src="img/previewCssButton.png" alt="preview the generated css text"/></span><label for="cssTextPreviewButton">Preview CSS</label></div><div id="generatedLinearGradientCssOutput" class="linearGradient-generatedLinearGradientCssOutput"><textarea id="generatedLinearGradientCssOutputTextArea" class="lg-css-output-textarea" rows="15" >generated css goes here</textarea></div></div></div></div><!-- End Column 1 --><!-- Column 2 --><div id="linearGradientMakerControlsColumn2" class="linearGradient-linearGradientMakerControlsColumn2">');
  uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate(opt_data, output);
  output.append('</div><!-- end column 2 --></div><!-- end row 1-->');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMakerControls" class="linearGradient-controls"><div id="linearGradientOptionsTabBar" class="lg-options-tab-bar"><div id="colorStopsTab" class="lg-options-tab">Color Stops</div><div id="directionTab" class="lg-options-tab">Direction</div><div id="gradientTypeTab" class="lg-options-tab">Gradient Type</div></div><div id="colorStopsComponent" class="linearGradient-colorStopsComponent"><!-- write out colorStops button panel (add colorStop)--><div id="colorStopsButtonPanel" class="linearGradient-colorStopsButtonPanel"><div id="addColorStopButtonContainer" class="linearGradient-colorStopButtonContainer"><input id="addColorStopButton" type="button" value="Add Color Stop"></div></div>');
  uiDesignTools.gradients.templates.colorStop.colorStopsTemplate({colorStops: opt_data.linearGradient.options.colorStops}, output);
  output.append('</div><div id="lg-gradient-direction-screen" class="lg-gradient-direction-screen"><div id="linearGradientOptions" class="linearGradient-options"><label for="linearGradientSideOrCorner">gradient direction</label><select id="linearGradientSideOrCorner"><option value="top">top</option><option value="top left">top left</option><option value="top right">top right</option><option value="bottom">bottom</option><option value="bottom left">bottom left</option><option value="bottom right">bottom right</option><option value="right">right</option><option value="left">left</option></select></div></div></div>');
  return opt_sb ? '' : output.toString();
};
