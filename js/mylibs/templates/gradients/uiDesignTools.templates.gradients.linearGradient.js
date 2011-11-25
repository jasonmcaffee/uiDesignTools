// This file was automatically generated from uiDesignTools.templates.gradients.linearGradient.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.templates == 'undefined') { uiDesignTools.templates = {}; }
if (typeof uiDesignTools.templates.gradients == 'undefined') { uiDesignTools.templates.gradients = {}; }
if (typeof uiDesignTools.templates.gradients.linearGradient == 'undefined') { uiDesignTools.templates.gradients.linearGradient = {}; }


uiDesignTools.templates.gradients.linearGradient.linearGradientCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientForMozillaCssTemplate(opt_data, output);
  uiDesignTools.templates.gradients.linearGradient.linearGradientForWebkitCssTemplate(opt_data, output);
  uiDesignTools.templates.gradients.linearGradient.linearGradientForOperaCssTemplate(opt_data, output);
  uiDesignTools.templates.gradients.linearGradient.linearGradientForMicrosoftCssTemplate(opt_data, output);
  uiDesignTools.templates.gradients.linearGradient.linearGradientForW3cCssTemplate(opt_data, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('background: ', soy.$$escapeHtml(opt_data.gradientName), '(', (opt_data.linearGradient.options.sideOrCorner != '') ? soy.$$escapeHtml(opt_data.linearGradient.options.sideOrCorner) : soy.$$escapeHtml(opt_data.linearGradient.options.angle), ',');
  var colorStopList23 = opt_data.linearGradient.options.colorStops;
  var colorStopListLen23 = colorStopList23.length;
  for (var colorStopIndex23 = 0; colorStopIndex23 < colorStopListLen23; colorStopIndex23++) {
    var colorStopData23 = colorStopList23[colorStopIndex23];
    uiDesignTools.templates.gradients.linearGradient.colorStopTemplate({colorStop: colorStopData23}, output);
    output.append((! (colorStopIndex23 == colorStopListLen23 - 1)) ? ', ' : '');
  }
  output.append(');');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientForMozillaCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-moz-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientForMicrosoftCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-ms-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientForW3cCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientForOperaCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-o-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.linearGradientForWebkitCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-webkit-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.colorStopTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.templates.gradients.linearGradient.rgbaTemplate({rgba: opt_data.colorStop.options.rgba}, output);
  output.append(' ', soy.$$escapeHtml(opt_data.colorStop.options.position), '%');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.templates.gradients.linearGradient.rgbaTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('rgba(', soy.$$escapeHtml(opt_data.rgba.red), ', ', soy.$$escapeHtml(opt_data.rgba.green), ', ', soy.$$escapeHtml(opt_data.rgba.blue), ', ', soy.$$escapeHtml(opt_data.rgba.alpha), ')');
  return opt_sb ? '' : output.toString();
};
