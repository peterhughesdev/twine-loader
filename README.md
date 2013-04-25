Twine-Loader
============

Provides a rudimentary external asset loader for Twine. Borne of my intitial frustrations with seeing how JS / CSS
had to be managed as Passages, I decided to create a little macro to alleviate some of the boilerplate and allow better
segmentation of assets from content. 

How it works
------------
So simple. 
* To load a CSS file, simply add:
    `<<load css stylesheet.css>>`

* To load a JS file, do:
  `<<load script main.js>>`

Directories
-----------

By default, files will be loaded relative to the HTML file that you are using. It is possible to set default paths for `root`, `scripts` and `styles`: 

    <<load set root lib>>
    <<load set styles /css/>>
    <<load set scripts /js/>>

Using it
--------
To use the loader, you will need to create a Twine passage to register this macro. 
Simply create a new passage, give it a *script* tag, and copy the contents of `src/loader.min.js` into it.

Once that is done, you can now load all required stylesheets, scripts from a single passage in a highly readable fashion:
    
    <<silently>>
      <<load set root lib >>
      <<load set styles /css/ >>
      <<load set scripts /js/ >>
      
      <<load css styles.css>>
      
      <<load script util.js>>
      <<load script main.js>>
    <<endsilently>>
    
This will have the result of loading:
* `lib/css/styles.css`
* `lib/js/util.js`
* `lib/js/main.js`

Typically you will want to put this at in your **Start** passage, but it will work in any location (this could allow you to do dynamic loading of styles, for instance).


Comments, forks and pull-requests welcome :)

To-do
-----
Provide support for loading in Macros.
