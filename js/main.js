/**
 * @author Jason McAffee
 * The first script to load after requirejs.
 * Configures requirejs and begins the application initialization process.
 * 
 */

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jqueryModule: 'libs/jquery/jqueryModule',
    modernizr : 'libs/modernizr/modernizr-2.0.6.min',
    uiDesignTools : 'mylibs/uiDesignTools/uiDesignTools'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app'//,
  //'mylibs/uiDesignTools/uiDesignTools'
  //'modernizr' //,
  // Some plugins have to be loaded in order due to there non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
  //'order!libs/jquery/jquery.min'
  
], function(App){
	//alert('yoga flame!');
	
	// Modernizr.load({
		  // test: Modernizr.inputtypes.range,
		  // nope: ['js/libs/polyfills/fd-slider.js', 'css/inputRangePolyfill/fd-slider.css'],//older browser performance hit for not supporting cool stuff. that'll teach em.
		  // callback: function(id, testResult) {
        // // If the slider file has loaded then fire the onDomReady event        
        // if("fdSlider" in window && typeof (fdSlider.onDomReady) != "undefined") {
                // try { fdSlider.onDomReady(); } catch(err) {};
        // };
//         
        // //linearGradientMakerWidget.polyfillInputRangeForAllColorStops();//lame i hate this stupid polyfill
    	// }
	// });
	
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});