// This file was automatically generated from uiDesignTools.gradients.templates.linearGradient.soy.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.gradients == 'undefined') { uiDesignTools.gradients = {}; }
if (typeof uiDesignTools.gradients.templates == 'undefined') { uiDesignTools.gradients.templates = {}; }
if (typeof uiDesignTools.gradients.templates.linearGradient == 'undefined') { uiDesignTools.gradients.templates.linearGradient = {}; }


uiDesignTools.gradients.templates.linearGradient.linearGradientCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientForMozillaCssTemplate(opt_data, output);
  uiDesignTools.gradients.templates.linearGradient.linearGradientForWebkitCssTemplate(opt_data, output);
  uiDesignTools.gradients.templates.linearGradient.linearGradientForOperaCssTemplate(opt_data, output);
  uiDesignTools.gradients.templates.linearGradient.linearGradientForMicrosoftCssTemplate(opt_data, output);
  uiDesignTools.gradients.templates.linearGradient.linearGradientForW3cCssTemplate(opt_data, output);
  uiDesignTools.gradients.templates.linearGradient.linearGradientWebkitOlderTemplate(opt_data, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientCssPrettyPrintTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientForMozillaCssTemplate(opt_data, output);
  output.append('\n');
  uiDesignTools.gradients.templates.linearGradient.linearGradientForWebkitCssTemplate(opt_data, output);
  output.append('\n');
  uiDesignTools.gradients.templates.linearGradient.linearGradientForOperaCssTemplate(opt_data, output);
  output.append('\n');
  uiDesignTools.gradients.templates.linearGradient.linearGradientForMicrosoftCssTemplate(opt_data, output);
  output.append('\n');
  uiDesignTools.gradients.templates.linearGradient.linearGradientForW3cCssTemplate(opt_data, output);
  output.append('\n');
  uiDesignTools.gradients.templates.linearGradient.linearGradientWebkitOlderTemplate(opt_data, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientWebkitOlderTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('background-image: -webkit-gradient(linear, ', soy.$$escapeHtml(opt_data.linearGradient.options.oldWebKitSideOrCorner.startPosition), ', ', soy.$$escapeHtml(opt_data.linearGradient.options.oldWebKitSideOrCorner.endPosition), ',');
  var colorStopList39 = opt_data.linearGradient.options.colorStops;
  var colorStopListLen39 = colorStopList39.length;
  for (var colorStopIndex39 = 0; colorStopIndex39 < colorStopListLen39; colorStopIndex39++) {
    var colorStopData39 = colorStopList39[colorStopIndex39];
    uiDesignTools.gradients.templates.linearGradient.colorStopForOldWebkitTemplate({colorStop: colorStopData39}, output);
    output.append((! (colorStopIndex39 == colorStopListLen39 - 1)) ? ', ' : '');
  }
  output.append(');');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('background-image: ', soy.$$escapeHtml(opt_data.gradientName), '(', (opt_data.linearGradient.options.sideOrCorner != '') ? soy.$$escapeHtml(opt_data.linearGradient.options.sideOrCorner) : soy.$$escapeHtml(opt_data.linearGradient.options.angle), ',');
  var colorStopList57 = opt_data.linearGradient.options.colorStops;
  var colorStopListLen57 = colorStopList57.length;
  for (var colorStopIndex57 = 0; colorStopIndex57 < colorStopListLen57; colorStopIndex57++) {
    var colorStopData57 = colorStopList57[colorStopIndex57];
    uiDesignTools.gradients.templates.linearGradient.colorStopTemplate({colorStop: colorStopData57}, output);
    output.append((! (colorStopIndex57 == colorStopListLen57 - 1)) ? ', ' : '');
  }
  output.append(');');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientForMozillaCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-moz-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientForMicrosoftCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-ms-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientForW3cCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientForOperaCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-o-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.linearGradientForWebkitCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.linearGradientCommonFormatCssTemplate({gradientName: '-webkit-linear-gradient', linearGradient: opt_data.linearGradient}, output);
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.colorStopTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  uiDesignTools.gradients.templates.linearGradient.rgbaTemplate({rgba: opt_data.colorStop.options.rgba}, output);
  output.append(' ', soy.$$escapeHtml(opt_data.colorStop.options.position), '%');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.colorStopForOldWebkitTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('color-stop(', soy.$$escapeHtml(opt_data.colorStop.options.position), '%,');
  uiDesignTools.gradients.templates.linearGradient.rgbaTemplate({rgba: opt_data.colorStop.options.rgba}, output);
  output.append(')');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.gradients.templates.linearGradient.rgbaTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('rgba(', soy.$$escapeHtml(opt_data.rgba.red), ', ', soy.$$escapeHtml(opt_data.rgba.green), ', ', soy.$$escapeHtml(opt_data.rgba.blue), ', ', soy.$$escapeHtml(opt_data.rgba.alpha), ')');
  return opt_sb ? '' : output.toString();
};
