// This file was automatically generated from boxShadowPage.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.pages == 'undefined') { uiDesignTools.pages = {}; }
if (typeof uiDesignTools.pages.templates == 'undefined') { uiDesignTools.pages.templates = {}; }
if (typeof uiDesignTools.pages.templates.boxShadowPage == 'undefined') { uiDesignTools.pages.templates.boxShadowPage = {}; }


uiDesignTools.pages.templates.boxShadowPage.boxShadowPageTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="boxShadowPage" class="drop-shadow-page"><div id="boxShadowWidgetContainer" class="box-shadow-widget-container">');
  uiDesignTools.boxShadow.templates.boxShadow.boxShadowTemplate(null, output);
  output.append('</div></div>');
  return opt_sb ? '' : output.toString();
};
