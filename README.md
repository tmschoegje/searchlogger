Firefox extension for performing and logging search tasks in an experimental setting.

Backlog
* Log keypresses (e.g. voor ctrl+f searches. Could also log mouse hovers and scrolling?
* If browser was closed/repoened during a task stage, the timer should probably resume
* Refactor stuff to make it resuable/extendable
* See feedback.txt for full list of items

Installation
* Installation currently requires the browser to disable a security feature to work. Go to the URL about:config and double click on security.csp.enable, turning it to false.
* Install as temporary extension: go to the URL about:debugging and select any file from the extension directory to Load As Temporary Extension.  
* Install the most recent package: download and open the .xpi file.

Usage
* Firefox->options->address bar->disable all types of suggestions
* Firefox forgets preferences: from windows explorer I have to reset 'open file with' every time
