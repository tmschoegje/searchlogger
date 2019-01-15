Firefox extension for performing and logging search tasks in an experimental setting.

Current state: Rough functionality for multiple sessions of hardcoded task orders. Bug: does not load search task descriptions

Backlog  
* update the smaller stuff we discussed on the hcibrowser-based version
* intro text google/iBabs and toolbar  
* input checking  
* toolbar button to mark the page as useful  
* toolbar clock  
* log when the user searches a document with (ctrl + f)
* automatic task order presentation


Installation  
Install as temporary extension: go to the URL about:debugging and select any file from the extension directory to Load As Temporary Extension.  
Install the most recent package: download and open the .xpi file.

Installation currently requires the browser to disable a security feature to work. Go to the URL about:config and double click on security.csp.enable, turning it to false.