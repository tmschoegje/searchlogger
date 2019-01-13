function loadNext(e, taskId, phase){
	e.preventDefault();
	browser.runtime.sendMessage({"curTask":taskId, "curStage":phase, "type": "load", "content": ""})
	console.log('other submit')
	//set toolbar stuffs	
}

function downloadLogs() {
//Get the logs to make them downloadable
	browser.storage.local.get().then((logs) => {
		var element = document.createElement('a');
		element.style.display = 'none';
		document.body.appendChild(element);
	//	console.log(results)
	
		filename="log-0.txt"
		text=JSON.stringify(logs)
	
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	
	element.click();

	document.body.removeChild(element);

	});
	
  
}

// Start file download.
//download("hello.txt","This is the content of my file :)");