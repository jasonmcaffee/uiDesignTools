// This file was automatically generated from uiDesignTools.inputs.templates.radioButtonSet.html.
// Please don't edit this file by hand.

if (typeof uiDesignTools == 'undefined') { var uiDesignTools = {}; }
if (typeof uiDesignTools.inputs == 'undefined') { uiDesignTools.inputs = {}; }
if (typeof uiDesignTools.inputs.templates == 'undefined') { uiDesignTools.inputs.templates = {}; }
if (typeof uiDesignTools.inputs.templates.radioButtonSet == 'undefined') { uiDesignTools.inputs.templates.radioButtonSet = {}; }


uiDesignTools.inputs.templates.radioButtonSet.radioButtonSetTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.radioButtonSetModel.options.radioButtonSetId), '">');
  var radioButtonModelList6 = opt_data.radioButtonSetModel.options.radioButtonModels;
  var radioButtonModelListLen6 = radioButtonModelList6.length;
  for (var radioButtonModelIndex6 = 0; radioButtonModelIndex6 < radioButtonModelListLen6; radioButtonModelIndex6++) {
    var radioButtonModelData6 = radioButtonModelList6[radioButtonModelIndex6];
    uiDesignTools.inputs.templates.radioButtonSet.radioButtonTemplate({radioButtonModel: radioButtonModelData6}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


uiDesignTools.inputs.templates.radioButtonSet.radioButtonTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="', soy.$$escapeHtml(opt_data.radioButtonModel.options.radioButtonId), '" class="inputs-radio-button">', (opt_data.radioButtonModel.options.isSelected) ? '<img src="img/plusButton.png" alt="Selection Image"><label>' + soy.$$escapeHtml(opt_data.radioButtonModel.options.displayText) + '</label>' : '<img src="img/emptyButton.png" alt="Selection Image"><label>' + soy.$$escapeHtml(opt_data.radioButtonModel.options.displayText) + '</label>', '</div>');
  return opt_sb ? '' : output.toString();
};
