/**
 * @author Jason McAffee
 * 
 * model for cssOutputWidget
 * 
 */

define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule',
  'mylibs/uiDesignTools/gradients/models/colorStop',
  'mylibs/uiDesignTools/gradients/models/linearGradient',
  'mylibs/uiDesignTools/boxShadow/models/boxShadow'
  ], function(uiDesignTools, $, colorStop, linearGradient){
  
  
  function cssOutput(optionsParam){
    this.options = {
       gradientType : 'linear', //circular, eliptical, circular repeating... what type of gradient are we generating/outputing
       colorStops : [], //array of colorStop models which are used to generate gradients. should apply to all gradient types
       linearGradientModel : {}, //use when generating linear gradient output & css
       boxShadowModel : {} //use when generating box shadow output & css
    };
    $.extend(this.options, optionsParam);
    
    
  }
  
//============================================================== Export =============================================
  return cssOutput;
});