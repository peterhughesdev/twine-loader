Twine-Loader
============

Provides a rudimentary external asset loader for Twine. Borne of my intitial frustrations with seeing how JS / CSS / Macros
had to be managed as Passages, I decided to create a little macro to alleviate some of the boilerplate and allow better
segmentation of assets from content. 

How it works
------------
So simple. 
* To load a CSS file, simply add:
    `<<load css stylesheet.css>>`

* To load a JS file, do:
  `<<load script main.js>>`

* And to load a macro (which we expect to be as a JS file):
  `<<load macro mymacro.js mymacro>>`
  
When loading a macro, be sure to include its name as the last parameter. This enables it to be initialised correctly after loading.

Directories
-----------

By default, files will be loaded relative to the HTML file that you are using. It is possible to set default paths for `root`, `scripts`, `styles` and `macros`: 

    <<load set root lib>>
    <<load set styles /css/>>
    <<load set scripts /js/>>
    <<load set macros /macros/>>


Using it
--------
To use the loader, you will need to create a Twine passage to register this macro. 
Simply create a new passage, give it a *script* tag, and copy the contents of `loader.js` into it.

Once that is done, you can now load all required stylesheets, scripts & macros from a single passage in a highly readable fashion:
    
    <<silently>>
      <<load set root lib >>
      <<load set styles /css/ >>
      <<load set scripts /js/ >>
      <<load set macros /macros/ >>
    	
      <<load macro macro1.js macro1>>
      <<load macro macro2.js macro2>>
      
      <<load css styles.css>>
      
      <<load script util.js>>
      <<load script main.js>>
    <<endsilently>>
    
This will have the result of loading:
* `lib/macros/macro1.js`
* `lib/macros/macro2.js`
* `lib/css/styles.css`
* `lib/js/util.js`
* `lib/js/main.js`

Typically you will want to put this at in your **Start** passage. If you're not loading any macros, you can work as normal; however, if you are loading macros and want to use them within your first 'real' passage, you will need to use the Twee API to begin the game once the main JS file has loaded. An example is provided in the `example` folder.


Comments, forks and pull-requests welcome :)
