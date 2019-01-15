var myWindowId;
const contentBox = document.querySelector("#content");

/*
Make the content box editable as soon as the user mouses over the sidebar.

window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});*/

/* example code
When the user mouses out, save the current contents of the box.

window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    contentToStore[tabs[0].url] = contentBox.textContent;
    console.log(contentToStore)
    browser.storage.local.set(contentToStore);
  });
});*/

/*
Update the sidebar's content.
1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {

  /*browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
	  //console.log(storedInfo)
    });*/
	
  //Also log URL
  //todo: index by log id instead of time
  //time will also work in a pinch
  let contentToStore = {};
   browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
		//console.log('gonna log');
		//console.log(tabs[0].url);
		//console.log(tabs)
		browser.runtime.sendMessage({"curTask":0, "curStage":0, "type": "log", "content":Date.now() + " " + tabs[0].id + " " + tabs[0].index + " " + tabs[0].url})//tabs[0].id
		
//		contentToStore[''+Date.now()] = tabs[0].url;
//		console.log(contentToStore)
//		browser.storage.local.set(contentToStore);
    })
 
  
  //var numrules = browser.storage.local.get('numLogs');
  //console.log('this one')
  //console.log(numrules)
  //console.log('end')
  
  //contentToStore[tabs[0].url] = contentBox.textContent;
}

function loadNext(e, taskId, phase){
	e.preventDefault();
	browser.runtime.sendMessage({"curTask":taskId, "curStage":phase, "type": "load", "content": ""})
	console.log('other submit')
	//set toolbar stuffs	
}
function prev(e){
	e.preventDefault();
	if(confirm("Weet u zeker dat u terug wilt om een fout te corrigeren?") == true) {
		browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "prev", "content": ""})
		console.log('back in toolbar')
	}
}
function next(e){
	e.preventDefault();
	if(confirm("Weet u zeker dat u klaar bent om door te gaan?") == true) {
		browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "next", "content": ""})
		console.log('next in toolbar')
	}
}
/*function start(e){
	e.preventDefault();
	//hide the start button, unhide the next/prev buttons
	console.log('starting experiment')
	browser.runtime.sendMessage({"curTask":-4,"curStage":-4, "type": "start", "content": ""})
}*/
document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.ctrlKey && zEvent.altKey  &&  zEvent.code === "KeyO") {
		if(confirm("Are you sure you want to start a new session? Not meant for experiment participants.")) {
		//sessid = prompt('Session id')
		//partid = prompt('Participant id')
		//TODO auto increment session/part id once finished
			browser.runtime.sendMessage({"curTask":-5, "curStage":-5, "type": "nextsession", "content": ""})
		}
    }
} );



/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

function getTask(task){
	if(task.type == "setTask"){
		//set div to searchtask
		document.getElementById("taskdisplay").innerHTML = task.searchtask
//		console.log(task.searchtask)
		//task.searchtask task.searchtaskshort
	}
}

browser.runtime.onMessage.addListener(getTask);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});