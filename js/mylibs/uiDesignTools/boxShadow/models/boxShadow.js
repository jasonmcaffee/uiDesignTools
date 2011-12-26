
/**
 * @author Jason McAffee
 */
define([
  'mylibs/uiDesignTools/uiDesignTools',
  'libs/jquery/jqueryModule'
], function(uiDesignTools, $){
  
  function boxShadow(optionsParam){
    this.options = {
      horizontalLength : 1, //support %
      verticalLength : 1,
      blur : 5,
      spread : 5,
      rgba : {red : 128, green : 128, blue : 128, alpha : 1}
    };
    
    $.extend(this.options, optionsParam);
    
  }  
  
//=========================================== Export ===============================

  return boxShadow;
})
