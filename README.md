RadioMeuhAir
============

Allows you to listen to the webradio RadioMeuh and to see the current, next and previous sounds name.  
Works on Windows, Mac OS, Linux.
  
![RadioMeuh Air](http://radiomeuh.woodgate.fr/screenshot.png "RadioMeuh Air")

Installation
--------------

- To install the player on your computer, just double-click on the RadioMeuh.air file. Don't worry about the warning about the author. I'm a nice guy.

- To test the application after a change (you will need [Adobe AIR SDK](http://www.adobe.com/devnet/air/air-sdk-download.html)):
```sh
adl ./RadioMeuh-app.xml
```

- To compile a new version of the application after a change (you will need [Adobe AIR SDK](http://www.adobe.com/devnet/air/air-sdk-download.html), again):
```sh
adt -package -storetype pkcs12 -keystore ./MyCert.pfx ./RadioMeuh.air ./RadioMeuh-app.xml .
```

Licence
--------------

Source code can be found on [github](https://github.com/JulienRamel/RadioMeuhAir), licenced under [MIT](http://opensource.org/licenses/mit-license.php).  
Developed by [Julien Ramel](http://www.woodgate.fr) ([@Woodgate](http://twitter.com/Woodgate))