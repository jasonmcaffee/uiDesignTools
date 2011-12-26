// This file was automatically generated from uiDesignTools.gradients.templates.linearGradientMaker.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.gradients == 'undefined') { uiDesignTools.gradients = {}; }
if (typeof uiDesignTools.gradients.templates == 'undefined') { uiDesignTools.gradients.templates = {}; }
if (typeof uiDesignTools.gradients.templates.linearGradientMaker == 'undefined') { uiDesignTools.gradients.templates.linearGradientMaker = {}; }


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMaker" class="linearGradientMaker">');
  uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerInnerContentTemplate(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerInnerContentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate(opt_data, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradientMaker.linearGradientMakerControlsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="linearGradientMakerControls" class="linearGradient-controls"><div id="linearGradientOptionsTabBar" class="lg-options-tab-bar"><div id="colorStopsTab" class="lg-options-tab lg-options-tab-selected">Color Stops</div><div id="directionTab" class="lg-options-tab">Direction</div><div id="gradientTypeTab" class="lg-options-tab">Gradient Type</div></div><div id="linearGradientColorStopsScreen" class="lg-color-stops-screen"><!-- write out colorStops button panel (add colorStop)--><div id="colorStopsButtonPanel" class="linearGradient-colorStopsButtonPanel"><div id="addColorStopButtonContainer" class="linearGradient-colorStopButtonContainer"><img id="addColorStopButton" src="img/plusButton.png" alt="Add a color stop" /><label>Add Color Stop</label></div></div>');
  uiDesignTools.gradients.templates.colorStop.colorStopsTemplate({colorStops: opt_data.linearGradient.options.colorStops}, output);
  output.append('</div><div id="linearGradientDirectionScreen" class="lg-gradient-direction-screen"><div id="gradientDirectionRadioButtonSetContainer" class="lg-gradient-direction-radioButtonSet">loading...</div></div><div id="linearGradientGradientTypeScreen" class="lg-gradient-type-screen"><div id="gradientTypeRadioButtonSetContainer" class="lg-gradient-type-radioButtonSet">loading...</div></div></div>');
  return opt_sb ? '' : output.toString();
};
