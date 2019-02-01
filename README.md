Firefox extension for performing and logging search tasks in an experimental setting.

Current state: Rough functionality for multiple sessions of hardcoded task orders. Bug: does not load search task descriptions

Backlog
* something like a progress bar
* log keypresses (in particular for when the user searches a document with (ctrl + f)). could also log mouse hovers and scrolling?
* automatic task order presentation (will instead be done through web server, probably)
* if browser was closed/repoened during a task stage, the timer shouldn't restart
* in test task, check if user bookmarked at least one page
* refactor task block code


Installation  
Install as temporary extension: go to the URL about:debugging and select any file from the extension directory to Load As Temporary Extension.  
Install the most recent package: download and open the .xpi file.

Installation currently requires the browser to disable a security feature to work. Go to the URL about:config and double click on security.csp.enable, turning it to false.