# ui design tools
This project defines some useful design related controls which you can use to aid you in generating css3.
Gradient css3 generation, drop shadows, text, text shadows, etc will eventually be provided.
The goal is to have a completely open source page/element designer which can be used from the browser.

##Demo
Demo of the final result of this code can be found here:
[uiDesignTools](http://jasonmcaffee.com/uiDesignTools/index.html)

##Goals
### Create a set of useful ui tools that you can use to generate css, html, etc.
Compete against the few existing sites that offer similar functionality.

### Open Source
Make it free and open!

### Examine tools and libraries
Requirejs rules! see below under Technologies Used

### Explore and define patterns for interaction between components
#### Separation of Concerns: break down work into granular modules.
##### Widgets
widgets are responsible for wiring up events for both model updates, as well as ui updates (eg when a user clicks a button)
They define the handlers for these events, and take appropriate ui actions (updating output when user interacts with ui)
Widgets DO NOT produce html. In fact, the produced html is required before the widget can be constructed.

##### Templates
Templates are responsible for generating the html for a given widget, using the passed in model.

##### Models
Models are used both to guide/instruct templates, as well as widgets.

#### Eventing
For eventing I chose to write my own little pub/sub model, as well as some custom event types.
Not really sure if that's any better than a simple observer pattern.
Perhaps move to promise model?

#### Model Updates
when updates are made to underlying models (eg when colorStop is updated after user moves red range slider/input), there are cases where other objects would like to know.
Currently using the eventing model described above under Eventing.

## Technologies Used
### Closure Javascript Templates
One of the goals of this project was to evaluate Google's Closure library for client-side templating.
Closure templates are pretty intuitive.  I only got frustrated a few times :) when performing conditional statements inside of the template.
Make sure you are using spaces ' ' and not tabs '\t' when editing your soy files.  Tabs caused wide gaps in the css that I was generating.

Closure is a big tool though, and js templating is just one of its facets.  
I mainly stuck to these pages for guidance in generating js templates:

http://code.google.com/closure/templates/docs/commands.html

http://code.google.com/closure/templates/docs/javascript_usage.html

### Requirejs & The Module Pattern
Asynchronous Module Definitions (AMD) and the Module Pattern help in establishing a cohesive project structure.

#### Module Pattern
The Module Pattern allows us to define self contained modules which do not pollute the global scope.
The modules that you 'define' have their dependecies injected when the module is first created.

#### Requirejs
Requirejs is an AMD library which allows you to elegantly define your modules and depencies.
Dependencies are either downloaded when needed at runtime, or you can use Requirejs to precompile 'bundles' of dependent modules.

I have found working with Requirejs to be overall enjoyable.  The provided apis allow you to write beautiful & clean code.
When things go wrong though, it will be a bit challenging to track down what is wrong.  
Requirejs throws an error message which gives you the list of modules that couldn't be loaded.

Refactoring an existing project while learning Requirejs was somewhat challenging, and took me about 4-5 hours to complete the first group of widgets.
Once I got used to the apis, refactoring another group of widgets only took about 30-45 minutes, and was actually pretty easy to do.

##### Requirejs methods:

###### require
the require method signature allows you to define a block of code which depends on external js files to be loaded before it's work can begin

``` javascript
require([
 'libs/depency1', 
 'libs/dependency2'
 ], 
 //the second parameter is the function you wish to execute once your dependencies have been loaded.
 functionToCallWhenDependenciesAreLoaded(dependency1, dependency2){
   //create a new dependency1
   var d1 = new dependecy1();
   
   //do some work with the instance of dependency1
   d1.doSomeWork();
   
   //create a new dependency2
   var d2 = new dependecy2();
   
   //do some work with the instance of dependency1
   d1.doSomeWork();
});
```
###### define
the define method is very similar to the require method, however with define you are expected to export/return a module of some kind. 
by default, your module's name will be the same name as the js file in which it lives, but without the .js extension.
e.g. module in file js/libs/myModule.js would be called 'myModule'

``` javascript
define([
 'libs/depency1', 
 'libs/dependency2'
 ], 
 //the second parameter is the function you wish to execute once your dependencies have been loaded.
 functionToCallWhenDependenciesAreLoaded(dependency1, dependency2){
   
   //our constructor function for the myModule module. note the name of this function doesn't matter, but it's probably smart to keep it the same as the filename
   function myModule(){
	   //create a new dependency1
	   var d1 = new dependecy1();
	   
	   //do some work with the instance of dependency1
	   d1.doSomeWork();
	   
	   //create a new dependency2
	   var d2 = new dependecy2();
	   
	   //do some work with the instance of dependency1
	   d1.doSomeWork();
   }
   
   //our export will be the constructor function for the module we've defined. 
   return myModule;
   
});
```

# Project Structure
<img src="http://github.com/downloads/jasonmcaffee/uiDesignTools/uiDesignToolsProjectStructure.png" alt="project structure screenshot"/>

The project is currently comprised of several widgets relating to the generation of css3 text.

## js/mylibs/uiDesignTools
all hand written and generated(from templates) js can be found here.

### js/mylibs/uiDesignTools/events
all things event related.
#### eventManager.js
global object of the uiDesignTools.event namespace, used for keeping track of all event types.

#### js/mylibs/uiDesignTools/uiDesignToolsEvent.js
defines the event structure, include subscribe and publish functionality.
subscription callbacks are maintained in an array.

### js/mylibs/uiDesignTools/gradients
components related to the generation of gradients.
#### models
models establish the structure in which data is passed around.  
These are typically free of any dom references, but do use some basic jquery provided methods, such as $.extend.
#### templates
templates are autogenerated by the soy compile jar provided by Google Closure.
Since templates are not generated in an AMD compliant way, we must create module wrappers so that the templates can be specified and loaded as dependencies.
Wrapping non-AMD-compliant libraries as modules is fairly easy to do, especially when using the order plugin for requirejs.
##### Wrapping A Non-AMD-Compliant Libraries Example

``` javascript
define([
	  'order!mylibs/uiDesignTools/gradients/templates/uiDesignTools.gradients.templates.colorStop',//need order! to ensure this is completely loaded before our function executes.
	], 
	function(){
	  // Tell Require.js that this module returns a reference to the global generated namespace.
	  //this is the global object. needed because of the way the templates are defined/auto-generated
	  return uiDesignTools.gradients.templates.colorStop;
	}); 
```
#### widgets
Widgets expect a containing element to already be defined and on the document before they are constructed.
Most all widgets expect the containing element to be passed in via the options param, and for that element to be wrapped by jquery.
This allows the widget to perform all event registration and dom creating to occur within only that container element.

### colorPicker
in progress control for selecting all the variances in brightness and saturation for a given hue color.

# [Jason McAffee](http://codeceratops.jasonmcaffee.com)
