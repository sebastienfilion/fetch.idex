### IDEX
# Fetch: Simple template fetcher

> Tested on Safari 7.0.1, Chrome 32, Firefox 26 and IExplorer 9

Fetch is a simple template fetcher. It's task is to get via Ajax (or not) templates, cache them and handle loader and error template.
Dependencies are a parsing library such as Mustache.js or Underscore and a DOM manipulation library such as jQueyr or Zepto.

**[DEMO](http://demo.idesignexperiences.com/fetch)**


## Usage

### Very basic usage

```js
idex.fetch('templates/mytemplate.html');
// OR
idex.fetch('<p>{{ text }}</p>'); // Yes, you can still benefit from Fetch even if you don't really need it to fetch
```

Sooooo. Fetch is pretty simple. If you provide an URL to it, it will fetch the template via Ajax (Callbacks are available) then cache it, else, it will only parse your HTML. Then it will append or prepend it to a parent (the body by default).

The ```idex.fetch``` function takes two arguments a ```content [string URL or HTML]``` and the ```options [object]```.

* * *

### The options

#### Callback ```[object function]```

Ok the callback option will either take a function that will be called when the content is appended to the DOM or an object of function for granular control.

```js
var url = 'template.html';

idex.fetch(url, {
    /**
     *
     * @this window {object}
     * @param $element {DOM jQury or Zepto} The element it just created
     *
     */
    callback: function($element) {
        // Do something to your new element!
    }
});

// OR

idex.fetch(url, {
    callback: {
        before: function() {},
        success: function() {},
        error: function() {},
        complete: function() {}
    }
});
```

##### $parent ```[DOM jQuery or Zepto]```

It is the parent object to which you want the new element to be appended or prepended too.
Can also be set to false so the element is not appended to anything, useful for caching.

##### hook ```[string]```

A simple flag to tell if you want the element to ```append``` or ```prepend``` to the parent.

*Used for button and submit type inputs*

#### Template ```[string]```

You can easily template the loader and the error by suppling a HTML structure like so:

```js
//...
template: {
    error: '<span>Error</span>',
    loader: '<span>Loading</span>'
}
//...
```