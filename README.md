# ui design tools
This project defines some useful design related controls which you can use to aid you in generating css.

##Goals
### Examine tools and libraries

### Explore and define patterns for interaction between components
#### Widgets, Templates, Models
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

# [Jason McAffee](http://codeceratops.jasonmcaffee.com)
