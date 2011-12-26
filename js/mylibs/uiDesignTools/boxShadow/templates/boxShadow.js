// This file was automatically generated from boxShadow.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.boxShadow == 'undefined') { uiDesignTools.boxShadow = {}; }
if (typeof uiDesignTools.boxShadow.templates == 'undefined') { uiDesignTools.boxShadow.templates = {}; }
if (typeof uiDesignTools.boxShadow.templates.boxShadow == 'undefined') { uiDesignTools.boxShadow.templates.boxShadow = {}; }


uiDesignTools.boxShadow.templates.boxShadow.boxShadowTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="boxShadow" class="box-shadow"><label for="boxShadowHorizontalLength">Horizontal Length</label><input type="range" id="boxShadowHorizontalLength" min="0" max="255" value="25" /><label for="boxShadowVerticalLength">Vertical Length</label><input type="range" id="boxShadowVerticalLength" min="0" max="255" value="25" /><label for="boxShadowBlur">Blur</label><input type="range" id="boxShadowBlur" min="0" max="255" value="25" /><label for="boxShadowSpread">Spread</label><input type="range" id="boxShadowSpread" min="0" max="255" value="25" /></div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.boxShadow.templates.boxShadow.boxShadowCssTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('-webkit-box-shadow: ', soy.$$escapeHtml(opt_data.boxShadowModel.options.horizontalLength), 'px ', soy.$$escapeHtml(opt_data.boxShadowModel.options.verticalLength), 'px ', soy.$$escapeHtml(opt_data.boxShadowModel.options.blur), 'px ', soy.$$escapeHtml(opt_data.boxShadowModel.options.spread), 'px rgba(', soy.$$escapeHtml(opt_data.boxShadowModel.options.rgba.red), ', ', soy.$$escapeHtml(opt_data.boxShadowModel.options.rgba.green), ', ', soy.$$escapeHtml(opt_data.boxShadowModel.options.rgba.blue), ', ', soy.$$escapeHtml(opt_data.boxShadowModel.options.rgba.alpha), '); -moz-box-shadow: 1px 2px 3px 22px rgba(95, 95, 95, 1); box-shadow: 1px 2px 3px 22px rgba(95, 95, 95, 1);');
  return opt_sb ? '' : output.toString();
};
