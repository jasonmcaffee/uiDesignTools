// This file was automatically generated from cssOutput.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.cssOutput == 'undefined') { uiDesignTools.cssOutput = {}; }
if (typeof uiDesignTools.cssOutput.templates == 'undefined') { uiDesignTools.cssOutput.templates = {}; }
if (typeof uiDesignTools.cssOutput.templates.cssOutput == 'undefined') { uiDesignTools.cssOutput.templates.cssOutput = {}; }


uiDesignTools.cssOutput.templates.cssOutput.cssOutputTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="gradientOutput" class="linearGradient-gradientOutput">&nbsp;</div><div id="generatedLinearGradientCssPreviewContainer" class="linearGradient-generatedLinearGradientCssPreviewContainer"><div id="cssTextPreviewToolbar" class="css-text-preview-toolbar"><span id="cssTextPreviewButton" class="css-text-preview-toolbar-button"><img src="img/previewCssButton.png" alt="preview the generated css text"/></span><label for="cssTextPreviewButton">Preview CSS</label></div><div id="generatedLinearGradientCssOutput" class="linearGradient-generatedLinearGradientCssOutput"><textarea id="cssOutputTextArea" class="lg-css-output-textarea" rows="15" >generated css goes here</textarea></div></div>');
  return opt_sb ? '' : output.toString();
};
