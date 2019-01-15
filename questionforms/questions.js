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

/*function getTask(task){
	console.log('received message in questions!')
	console.log(task)
	if(task.type == "setTask"){
		//set div to searchtask
		document.getElementById("taskdisplay").innerHTML = task.searchtask
//		console.log(task.searchtask)
		//task.searchtask task.searchtaskshort
	}
}*/

//read storage
function getTask(){
	let retrieveLogs = browser.storage.local.get();
	retrieveLogs.then((results) => { console.log(results) })
}


browser.runtime.onMessage.addListener(getTask);