Firefox extension for performing and logging search tasks in an experimental setting.

Full list @ feedback.txt

Backlog (key features)
* See feedback.txt for full list of items
* Log keypresses (in particular for when the user searches a document with (ctrl + f)). could also log mouse hovers and scrolling?
* Automatic task order presentation
* If browser was closed/repoened during a task stage, the timer shouldn't restart
* In test task, check if user used all features
* Refactor stuff (e.g. clean up short-term solutions; navigation flow should be a linkedlist instead of curTask/curStage combination)

Installation
* Installation currently requires the browser to disable a security feature to work. Go to the URL about:config and double click on security.csp.enable, turning it to false.
* Install as temporary extension: go to the URL about:debugging and select any file from the extension directory to Load As Temporary Extension.  
* Install the most recent package: download and open the .xpi file.

Usage
* Firefox->options->address bar->disable all types of suggestions
* Firefox forgets preferences: from windows explorer I have to reset 'open file with' every time
