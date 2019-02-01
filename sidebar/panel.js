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
var numsearchtasks = 5
var PRESTUDY = -1
var POSTSTUDY = numsearchtasks
var PRETASK = 0
var TASKTASK = 1
var POSTTASK = 2
var DELAY = 10

firsttime = true

//if user has to fill in questions, ask them to fill out questions instead
//also, show and start the clock if it's the first time we notice that a task is going on
function greyOutButton(){
	//get logs 
	browser.storage.local.get().then((results) => {
		logs = results.logs
		session = logs.sessions[logs.curSession]
		
		//If prestudy or poststudy
		if(session.curTask == PRESTUDY || session.curTask == POSTSTUDY){
			document.getElementById("nextButton").disabled = true;
			document.getElementById("homeButton").disabled = true;
	//		document.getElementById("clock").visibility = "hidden"
		}
		//if pretask or posttask, disable teh button. also, stop the timer.
		else if(session.curStage == PRETASK || session.curStage == POSTTASK){
			document.getElementById("nextButton").disabled = true;
			document.getElementById("homeButton").disabled = true;
	//		console.log('HIDING')
			document.getElementById("clock").innerHTML = ""
//			console.log(document.getElementById("clock"))
			firsttime = true;
			clearInterval(timer)
		}
		//restore button to normal for regular tasks. start clock
		else{
			console.log('showing')
			document.getElementById("nextButton").disabled = false;
			document.getElementById("homeButton").disabled = false;
			
			//if in task, and this is the first time we get there, start the clock
			if(firsttime == true)
			{
				document.getElementById("clock").visibility = "visible"
				firsttime = false
				setClock()
				//todo stop timer
			}
			//ctrl f 
		}
	})
}


/*
Update the sidebar's content.
1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {
	greyOutButton()
	bookmarkUpdate();
	
	//unset confirm button
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "hidden"

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
	getTask();

  
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

/*function confirmClick(){
	var confirmbutton = document.getElementById("confirmbutton")
	if(confirmbutton.style.visibility == "visible"){
		confirmbutton.style.visibility = "hidden"
		//load next/prev
	}
}*/

function confirmPrev(e){
	e.preventDefault()
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "hidden"
	
	browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "prev", "content": ""})
	console.log('back in toolbar')
}

function cancelConfirm(e){
	e.preventDefault(e)
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "hidden"
}

function prev(e){
	e.preventDefault();
	
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "visible"
	var confirmtext = document.getElementById("confirmtext")
	confirmtext.innerHTML = "Weet u zeker dat u de huidige taak wilt afbreken?"
	var confirmtext = document.getElementById("confirmform")
	confirmtext.setAttribute("onclick", "confirmPrev(event)")


	/*if(confirm("Weet u zeker dat u terug wilt om een fout te corrigeren?") == true) {
		browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "prev", "content": ""})
		console.log('back in toolbar')
	}*/
}

function confirmNext(e){
	e.preventDefault()
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "hidden"
	
	browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "next", "content": ""})
		console.log('next in toolbar')
}


//how many seconds remaining until skipping to end of task
remaining = DELAY
timer = null

//Updating the clock every 10 seconds
function reduceTimer(){
	remaining = +(remaining - 0.1).toFixed(2)
	if(remaining < 1){
		document.getElementById("clock").style.color = "red"
		document.getElementById("clock").style.fontWeight = "bold"
	}
	else{		
		document.getElementById("clock").style.color = "black"
		document.getElementById("clock").style.fontWeight = "normal"
	}
	document.getElementById("clock").innerHTML = remaining + " minutes remaining"
}

//called when the 
function setClock(task) {	
	//console.log('STARTTTT')
	//if(task.curTask != PRESTUDY && task.curTask != POSTSTUDY && task.type == "load" && task.curStage != TASKTASK){
	//	console.log('a good')
	//var clock = 
	remaining = DELAY
	document.getElementById("clock").innerHTML = remaining + " minutes remaining"
	timer = setInterval(reduceTimer, 10000);
	//}
	//in other cases, hide the timer
	//else if(task.type == "load"){
	//	console.log('A BADDDD')
	//	var clock = document.getElementById("clock")
	//	clock.innerHTML = ""
	//}
}

//function setClock2(){
//	console.log('	--------------------------------------------------------')
//}

//browser.runtime.onMessage.addListener(setClock2)
//onmessage
//if we read the proper task?
//set a starttime for the task?

function home(e){
	e.preventDefault();
	browser.tabs.update({url: "http://www.uu.nl"});
}

function next(e){
	e.preventDefault();	
	var confirmbutton = document.getElementById("confirmbutton")
	confirmbutton.style.visibility = "visible"
	var confirmtext = document.getElementById("confirmtext")
	confirmtext.innerHTML = "Weet u zeker dat u de huidige taak wilt afronden?"
	var confirmtext = document.getElementById("confirmform")
	confirmtext.setAttribute("onclick", "confirmNext(event)")
		
/*	if(confirm("Weet u zeker dat u klaar bent om door te gaan?") == true) {
		browser.runtime.sendMessage({"curTask":-3, "curStage":-3, "type": "next", "content": ""})
		console.log('next in toolbar')
	}*/
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

function getTask1(task){
	console.log('got task in toolbar')
	console.log(task.type)
	if(task.type == "setTask"){
		//set div to searchtask
		document.getElementById("taskdisplay").innerHTML = task.searchtask
//		console.log(task.searchtask)
		//task.searchtask task.searchtaskshort
	}
}

//browser.runtime.onMessage.addListener(getTask);

//read storage
function getTask(){
//	console.log('reading storage toolbar')
	let retrieveLogs = browser.storage.local.get().then((results) => {
		if(results.logs){
	//		console.log(results.logs)
	//		console.log(results.logs.sessions[results.logs.curSession].curTaskFull);
	//		console.log(results.logs.sessions[results.logs.curSession].curTaskShort);
		//set div to searchtask
			display = document.getElementById("toolbartaskdisplay")
//		console.log(display)
			if(display == null){
//			console.log('why though')
			}
			else{
//			console.log('setting the things')
				display.innerHTML = results.logs.sessions[results.logs.curSession].curTaskShort
			}	
		}
	})
}


//if url starts with file://, record all keypresses... or just record them always anyway, because why not? yea i think so
function startKeyLogs(){
	document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.code === "KeyE") {
        // DO YOUR STUFF HERE
    }
} )};




//called whenever the toolbar needs to be updated (tab switch etc)
function bookmarkUpdate(){
	//console.log()
	//console.log()
	//console.log('updating toolbar')
	//get url
	browser.tabs.query({windowId: myWindowId, active: true})
	.then((tabs) => {
		let retrieveLogs = browser.storage.local.get();
		retrieveLogs.then((results) => {
			prefix = logs.sessions[logs.curSession].curTask + " ";
			//console.log(results)
			logs = results.logs
//			console.log('reading logs')
//			console.log(logs)
//			console.log(logs.sessions[logs.curSession])
	//		console.log(prefix + tabs[0].url)
		//	console.log(logs)
			//console.log(logs.sessions[logs.curSession].bookmarks)
			//console.log(logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url])
			//logs = results.logs
			//TODO make tabs[0].url
			//console.log(logs[logs.curSession].bookmarks['curpage'])
			if(typeof logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url] === 'undefined' || logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url] === ""){
				//console.log('it was not set')
				//logs.sessions[logs.curSession].bookmarks[tabs[0].url] = ""
				document.getElementById("icon").setAttribute("src","../icons/star-empty-19.png")
			}
			else{
				//console.log('it was set')
				//logs.sessions[logs.curSession].bookmarks[tabs[0].url] = Date.now()
				document.getElementById("icon").setAttribute("src","../icons/star-filled-19.png")
			}
		})
	})
}

function updateLogs(){
	let gett = browser.storage.local.get();
	gett.then((results) => {
		logs = results.logs
		console.log('updated questions')
		console.log(questions.sessions[0])
	})
}

function logStorageChange(changes, area) {
  console.log("Change in storage area: " + area);
 
  var changedItems = Object.keys(changes);
 
/*  for (var item of changedItems) {
    console.log(item + " has changed:");
    console.log("Old value: ");
    console.log(changes[item].oldValue);
    console.log("New value: ");
    console.log(changes[item].newValue);
  }*/
}

//browser.storage.onChanged.addListener(logStorageChange)

function storeLogs(logs){
	console.log('writing logs\n')
	let contentToStore = {};
	console.log(logs.sessions[logs.curSession].bookmarks)
	contentToStore['logs'] = logs;
	browser.storage.local.set(contentToStore);
	console.log(contentToStore)
}

//called when the toolbar is clicked, so store the log
curpage = ""
//mark the page as useful with the icon, switch the icon on or off. called onclick
function toggleBookmark(){
	console.log('he clicked the thing!')
	icon = document.getElementById("icon")
	
	//get url
	browser.tabs.query({windowId: myWindowId, active: true})
	.then((tabs) => {
		//should probably be get('logs') instaed.. but easier for debugging like this
		let retrieveLogs = browser.storage.local.get();
		retrieveLogs.then((results) => {
		//	console.log('check')
		//	console.log(logs)
//		console.log(logs.sessions[logs.curSession])
//		console.log(logssessions[logs.curSession].bookmark)
//		onsole.log(logs[logs.curSession].bookmark['curpage'])
			logs = results.logs
			prefix = logs.sessions[logs.curSession].curTask + " ";
			curpage = logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url]
			newval = ""
			if(curpage == "" || typeof curpage === 'undefined'){
				console.log('toggle on')
				icon.setAttribute("src","../icons/star-filled-19.png");
				logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url] = Date.now();
				newval = "on"
			}
			else{
				icon.setAttribute("src","../icons/star-empty-19.png");
				logs.sessions[logs.curSession].bookmarks[prefix + tabs[0].url] = "";
				newval = "off"
			}
			logs.sessions[logs.curSession].loglines.push(Date.now() + " " + logs.sessions[logs.curSession].curTask + " Toggled bookmark " + prefix + " " + tabs[0].url + " " + newval)
			storeLogs(logs);
			
			
			//let newLogs = browser.storage.local.get();
			//newLogs.then((results) => { console.log(results) })
			//console.log(logs)
		})
	})
}



/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});