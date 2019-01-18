function loadNext(e, taskId, phase){
	e.preventDefault();
	browser.runtime.sendMessage({"curTask":taskId, "curStage":phase, "type": "load", "content": "unknowntask"})
	console.log('other submit')
	//set toolbar stuffs	
}

function loadNextTaskless(e, phase){
	e.preventDefault();
	browser.runtime.sendMessage({"curTask":-3, "curStage":phase, "type": "loadTaskless", "content": ""})
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

function getTask1(task){
	if(task.type == "setTask"){
		//console.log('getTask in questions')
		//console.log(task)
		//console.log(task.searchtask)
		//set div to searchtask
		display = document.getElementById("taskdisplay")
		console.log(display)
		if(display == null){
			//console.log('why though')
		}
		else{
			display.innerHTML = task.searchtask
		}
//		console.log(task.searchtask)
		//task.searchtask task.searchtaskshort
	}
}

//read storage
function getTask(){
//	console.log('reading storage questions')
	let retrieveLogs = browser.storage.local.get().then((results) => {
//		console.log(results.logs)
//		console.log(results.logs.sessions[results.logs.curSession].curTaskFull);
//		console.log(results.logs.sessions[results.logs.curSession].curTaskShort);
	//set div to searchtask
		display = document.getElementById("taskdisplay")
//		console.log(display)
		if(display == null){
//			console.log('why though')
		}
		else{
//			console.log('setting the things')
			display.innerHTML = results.logs.sessions[results.logs.curSession].curTaskFull
		}	
	})
}

// window.addEventListener("load", function(event) {
 //   getTask();
//  });
browser.runtime.onMessage.addListener(getTask);
//browser.runtime.onMessage.addListener(getTask);