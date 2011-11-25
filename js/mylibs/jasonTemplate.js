// This file was automatically generated from jasonTemplate.soy.
// Please don't edit this file by hand.

if (typeof jasonTemplate == 'undefined') { var jasonTemplate = {}; }


jasonTemplate.helloName = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('Hello ', soy.$$escapeHtml(opt_data.name), '!');
  return opt_sb ? '' : output.toString();
};


jasonTemplate.helloNames = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  var nameList8 = opt_data.names;
  var nameListLen8 = nameList8.length;
  for (var nameIndex8 = 0; nameIndex8 < nameListLen8; nameIndex8++) {
    var nameData8 = nameList8[nameIndex8];
    jasonTemplate.helloName({name: nameData8}, output);
  }
  return opt_sb ? '' : output.toString();
};
