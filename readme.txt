Google Web Desktop (not affiliated with Google, Inc.)
=======

Creates a web-based desktop UI for Google Docs.

[![](https://github.com/joepestro/Google-Docs-Web-Desktop/raw/master/googlewebdesktop.png)](https://github.com/joepestro/Google-Docs-Web-Desktop/raw/master/googlewebdesktop.png)

About the project
=======

I. Installation

1. Change the "next" parameter of
https://www.google.com/accounts/AuthSubRequest to your URL.
2. Copy the /googlewebdesktop directory to the desired location
3. Point your browser to /googlewebdesktop/index.php

Note: PHP required for HTTP requests (developed with 4.1.2). There is nothing magic about these HTTP requests, but this PHP example was put together as a quick demo, as PHP is available on many web servers. Obviously, other languages can accomplish the same goal of using the Google Docs Data API to request a full document list. 

II. How do the files work together? 

* api.php
Accepts a POST request containing a valid session token, and prints the user's document list to the screen. Currently used as the target for AJAX requests to refresh the desktop after load.

* docs.php
Performs the actual HTTP requests to the Google Docs Data APIs.

* index.php
There are two div tags included which connect all these parts together.
googleSessionToken - contains the session token after being upgraded.
jsonFeedData - contains the full feed response to be parsed by the desktop. 

* javascripts/lightwindow.js
This is a modified version of http://www.stickmanlabs.com/lightwindow/. Provides functionality for the overlay which displays the document to be edited. When a document is closed, also fires a callback to update any icons which have been modified while the overlay has been active.

* javascripts/desktop.js
Handles the initialization and all updates to the desktop, including populating the desktop with icons from a JSON feed and polling api.php.

III. Supported browsers

<<<<<<< HEAD
Tested in Google Chrome, Mozilla Firefox (2.0, 3.0b2), Internet Explorer (6, 7), Opera (9), Safari (3.0).
=======
Tested in Mozilla Firefox (2.0, 3.0b2), Internet Explorer (6, 7), Opera (9), Safari (3.0).
>>>>>>> 6bf51ac7a4cb6dc14b1a0c611b0ecbfcf6beed08
