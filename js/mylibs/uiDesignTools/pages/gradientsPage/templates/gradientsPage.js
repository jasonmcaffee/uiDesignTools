// This file was automatically generated from gradientsPage.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.pages == 'undefined') { uiDesignTools.pages = {}; }
if (typeof uiDesignTools.pages.templates == 'undefined') { uiDesignTools.pages.templates = {}; }
if (typeof uiDesignTools.pages.templates.gradientsPage == 'undefined') { uiDesignTools.pages.templates.gradientsPage = {}; }


uiDesignTools.pages.templates.gradientsPage.gradientsPageTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.gradientsPageModel.options.uniqueId), '" data-role="page" class="gradients-page"><div id="linearGradientMakerWidgetContainer" class="linearGradientMakerWidgetContainer">Loading...</div></div>');
  return opt_sb ? '' : output.toString();
};
