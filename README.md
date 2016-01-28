More Menu plugin
=====================

More Menu provides an elegant solution for making menus responsive.  View the [project page](http://pattle.github.io/more-menu) to see it in action

More Menu is released under the [MIT License](https://opensource.org/licenses/MIT)

Usage
------

Start by including the JS file on your page

````html
<script type="text/javascript" src="path/to/moreMenu.js"></script>
````

and the CSS file

````html
<link rel="stylesheet" href="path/to/moreMenu.css">
````

Your HTML structure will need to be 

````html
<ul id="primary-nav">
	<li><a href="/" title="Link">Link</a></li>
	<li><a href="/" title="Another link">Another link</a></li>
	....
</ul>
```

Then initialise the plugin on your menu element (e.g the ul)

````javascript
<script type="text/javascript">
    $('ul#primary-nav').moreMenu();
</script>
````

Options
-------

You can pass the following options to the `moreMenu` method.  

| Option        | Description   |
| ------------- |:-------------:|
| minWidth      | Specify a minimum width for the plugin to start working at |
| menuTemplate  | Suppy HTML for the more menu |
| menuClass     | If you supply custom HTML for the menu you need to supply the class name of the `li` |
| dropdownMenuClass | If you supply custom HTML for the menu you need to supply the class of the dropdown menu (`ul`) | 

Donate
-------
If you found this plugin useful please consider a PayPal donation to chris.pattle@gmail.com

Author
-----------
[Chris Pattle](http://www.chrispattle.com)