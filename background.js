//verbose logging for debugging/reference. panel.js logs url on updated tabs
function logURL(requestDetails) {
  //console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

//parameters for 
var DELAY = 0.1; //in minutes
var CATGIFS = "./questionforms/prestudy.html"//http://chilloutandwatchsomecatgifs.com/";

//restartAlarm: clear all alarms, then set a new alarm for the given tab.
//Called when options are closed
function restartAlarm(nextUrl) {
	console.log('restart alarm')
//  browser.pageAction.hide(tabId);
    browser.alarms.clearAll();
//  var gettingTab = browser.tabs.get(tabId);
//  gettingTab.then((tab) => {
//    if (tab.url != CATGIFS) {
      browser.alarms.create(nextUrl, {delayInMinutes: DELAY});
//    }
//  });
}

//When addon is reinstalled, navigate to last open page
function initAlarm(){
	console.log('init alarm')
	browser.alarms.clearAll();
	browser.alarms.create("resume", {delayInMinutes: 0.1})
}

function storeLogs(){
	let contentToStore = {};
	contentToStore['logs'] = logs;
	browser.storage.local.set(contentToStore);
}

//On alarm, show the page action on the current tab
//Cases: starting the app, time limit task is over
browser.alarms.onAlarm.addListener((alarm) => {
  //var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  //gettingActiveTab.then((tabs) => {
  //  browser.pageAction.show(tabs[0].id);
  //});
  
  //Called when extension is installed/session is resumed
  if(alarm.name == "resume"){
	 tmpTask = { "curStage":logs.sessions[logs.curSession].curStage,
				 "curTask":logs.sessions[logs.curSession].curTask,
				 "type":"load",
				 "content":""
	 }
	 loadNextPhase(tmpTask)
//     browser.tabs.update({url:"./questionforms/intro.html"});
  } 
  else{
	//note: only every called when the next stage is in the same task, so we never have to increment that
	logs.sessions[logs.curSession].curStage += 1
	storeLogs();
	browser.tabs.update({url: alarm.name});
  }
//  if(logs.sessions[0].curStage > 2)
  
    
  //This is where pre task goes to task
});

/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
//browser.pageAction.onClicked.addListener(() => {
 // browser.tabs.update({url: CATGIFS});
//});

function closeOtherTabs(){
	browser.tabs.query({})
    .then((tabs) => {
		console.log('these tabs')
		console.log(tabs)
		tabs.forEach(function (tab) {
			if(tab.active == false){
				browser.tabs.remove(tab.id)
				console.log(tab.id)
			}
		})
	}
)}


var searchtasks = ['U kijkt naar de Uithoflijn als alternatief om naar de universiteit te komen, maar u weet niet wanneer deze bruikbaar is. Hoe is de planning van het bouwen van de Uithoflijn verlopen, en aangepast?',
'U heeft gehoord dat er misschien een nieuwe supermarkt op de Uithof komt. Wie heeft deze plannen politiek gezien aangekaart, en wat is hier de status van?']
var searchtaskshort = ['Hoe is de planning van het bouwen van de Uithoflijn verlopen, en aangepast?',
'Hoe wordt er gelobbyd voor een grotere supermarkt op de Uithof?'
]

//update toolbar and pre forms
function setTask(taskid){
	console.log('setting task!')
	stask = ""
	staskshort = ""
	if(taskid > 0 && taskid < 1){
		stask = searchtasks[taskid]
		staskshort = searchtaskshort[taskid]
	}
		
	//in case of edge cases where user
	 browser.tabs.query({}).then((tabs) => {
		 console.log('tabs')
		 console.log(tabs)
	for (let tab of browser.tabs) {
		browser.tabs.sendMessage(
		tab.id,
		{"type": "setTask", "searchtask": searchtasks[taskid], "searchtaskshort": searchtaskshort[taskid]}
		)/*.then(response => {
		console.log("Message from the content script:");
		console.log(response.response);
		}).catch(onError);*/
	 }
	 })
}

//load next task, also used for logging.. should rename
function loadNextPhase(task){
	//first determine type: loading next page/stage, or logging event?
	
	//If there are other windows open with the extension/questionnaires when navigating, close the previous ones
	//deprecated
//	if(task.type == "prev" || task.type == "next"){
		//for(tab in tabs){
		//	console.log(tab)
		//	if(tab.active == false){
		//		browser.tabs.remove(tab.id);
		//	}}
	//})
	//	contentToStore[''+Date.now()] = tabs[0].url;
		//console.log(contentToStore)
		//browser.storage.local.set(contentToStore);
	//})
//	}




	//OLD If a toolbar button was pressed before the session started -> go to setup page
	//if (task.type == "prev" || task.type == "next" && inSession == 0)
		
	if(task.type == "setTask"){
		console.log('background message settask')
		console.log(task)
	}
//	console.log('message received')
	if (task.type == "prev"){
	console.log(task.type)
	console.log(logs.sessions[logs.curSession].curTask)
	console.log(logs.sessions[logs.curSession].curStage)
		//TODO get current stage and task
		//update logs
		//if not already already at the start
		if(!(logs.sessions[logs.curSession].curTask < 0 && logs.sessions[logs.curSession].curStage < 1)){
			task.curStage = logs.sessions[logs.curSession].curStage - 1
			task.curTask = logs.sessions[logs.curSession].curTask
		
			//clear alarms previously set
			browser.alarms.clearAll();
				
			//if this was the first stage in the poststudy, go to last stage of a task
			if(task.curStage < 0){
				if(task.curTask == 1){
					task.curStage = 2
					task.curTask -= 1
				}
				//if it was the first stage in the first task, go to last stage of prestudy
				else if(task.curTask == 0){
					task.curStage = 1
					task.curTask -= 1
				}
			}
			
			//If we go back enough stages, we get to the previous task
			//(should be unused now) If we are before the pre-study(-1), don't go back further
			
			
			/*if(task.curStage < 0 && !(task.curTask == -1)){
				task.curTask -= 1
				//prestudy task has only 2 stages
				if(task.curTask == 0){
					task.curStage = 1
				}
				//other tasks have 3 stages
				else{
					task.curStage = 2
				}
			}*/
			task.type = "load"
			console.log(task.type)
	console.log(task.curTask)
	console.log(task.curStage)
		}
//		logs.sessions[0].loglines.push(Date.now() + " Task " + curTask + " Stage " + curStage)
//		let contentToStore = {};
//		contentToStore['logs'] = logs;
//		browser.storage.local.set(contentToStore);
	}
	if (task.type == "next"){
	console.log(task.type)
	console.log(logs.sessions[logs.curSession].curTask)
	console.log(logs.sessions[logs.curSession].curStage)
		//if not the final page
		if(!(logs.sessions[logs.curSession].curTask == 1)){
			//increase the search stage
			task.curStage = logs.sessions[logs.curSession].curStage + 1
			task.curTask = logs.sessions[logs.curSession].curTask
			
			//clear alarms previously set
			browser.alarms.clearAll();
			
			//if this was the final stage of the prestudy, next task
			if(task.curTask == -1 && task.curStage > 1){
				task.curTask += 1
				task.curStage = 0
			}
			//if the final stage of a search task, next task
			else if(task.curStage > 2){
				task.curTask += 1
				task.curStage = 0
			}
			task.type = "load"
			console.log(task.type)
			console.log(task.curTask)
			console.log(task.curStage)
		}
	}
	if(task.type == "load"){
		//focus on window with the questions
		closeOtherTabs();
		
		//make sure the task is updated
		setTask(task.curTask)
		
		//update logs
		
		logs.sessions[logs.curSession].curStage = task.curStage
		logs.sessions[logs.curSession].curTask = task.curTask
		logs.sessions[logs.curSession].loglines.push(Date.now() + " Task " + task.curTask + " Stage " + task.curStage)
		let contentToStore = {};
		contentToStore['logs'] = logs;
		browser.storage.local.set(contentToStore);
		
		//load prestudy
		if(task.curTask == -1){
			if(task.curStage == 0){
				console.log('loading intro')
				browser.tabs.update({url: "./questionforms/intro.html"});
			}
			else if(task.curStage == 1){
				console.log('loading prestudy')
				browser.tabs.update({url: "./questionforms/prestudy.html"});
			}
			else{ alert('unknown state') }
		}
		//test if done
		else if(task.curTask == 1){
			console.log('start post study')
			browser.tabs.update({url: "./questionforms/poststudy.html"});
		}
		else if(task.curStage == 0){
			//TODO check if there are more tasks left to do
			console.log('start pre task')
			browser.tabs.update({url: "./questionforms/pretask.html"});
			//todo tell the task to the toolbar rather than via post
		//last is optional
		}
		else if(task.curStage == 1){
			console.log('start task')
			browser.tabs.update({url: "http://uu.nl/"});
			restartAlarm("./questionforms/posttask.html");
		}
		//menu navigation can get here instead of by the alarm
		else if(task.curStage == 2){
			console.log('post task')
			browser.tabs.update({url: "./questionforms/posttask.html"});
		}
			
		
		
		
		
	}
	else if(task.type == "log"){
		//Multiple http requests with the same URL, only log the first
		if(task.content.split(" ", 4)[3] != logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1].split(" ", 4)[3]){
			console.log('current')
			console.log(task.content)
			console.log('previous')
			console.log(logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1])
		
		
			logs.sessions[logs.curSession].loglines.push(task.content)
			//console.log(logs)
			//update stored logs
			let contentToStore = {};
			contentToStore['logs'] = logs;
//		console.log(contentToStore)
			browser.storage.local.set(contentToStore);
			
			
			//example of retrieving logs
			//console.log('this one')			
			//let retrieveLogs = browser.storage.local.get();
			//retrieveLogs.then((results) => { console.log(results) })
			
			////console.log(browser.storage.local.get('logs'))
			
		}
	}
	else if(task.type == "nextsession"){
		logs.curSession += 1;
		//create this new session
		logs.sessions.push({
			"participantid": logs.curSession,
			"curTask": -1,
			"curStage": 0,
			"loglines": [Date.now() + " Logs for session 0 with participant 0"]
			})
		//not currently used/properly implemented
//		logs.curParticipant = task.curParticipant; 
		//TODO add warning that cursession is at invalid value
	}
	
		
}

browser.runtime.onMessage.addListener(loadNextPhase)
	
// Load existent stats with the storage API.
var gettingStoredLogs = browser.storage.local.get();

gettingStoredLogs.then(logs => {
  // Initialize the saved logs if not yet initialized.
  if (!logs.stats) {
    logs = {
      num: 0
    }}
})


/*
//Store session id
let contentToStore = {};
   browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
		contentToStore[''+Date.now()] = tabs[0].url;
		console.log(contentToStore)
		browser.storage.local.set(contentToStore);
	})
*/


/*
function searchtask1(e){
	e.preventDefault();
	console.log('search task 1')
	//set toolbar stuffs
	
	//load next task
	browser.tabs.update({url: "http://uu.nl/"});
}*/

function onInstalledNotification(details) {
	//TODO see if it already exists
	console.log('checking if there are already logs stored')
	let gett = browser.storage.local.get();
	gett.then((results) => { 
		if(typeof results.logs === "undefined"){
			console.log('initialising logs')
			logs = {
				"sessions": [{
					"participantid": 0,
					"curTask": -1,
					"curStage": 0,
					"loglines": [Date.now() + " Logs for session 0 with participant 0"]
				}],
				"curSession": 0
			}
			storeLogs();
		}
		else{
			logs = results.logs
			logs.sessions[logs.curSession].loglines.push("Resuming logs at task " + logs.sessions[logs.curSession].curTask + " stage " + logs.sessions[logs.curSession].curStage)
		}
	})
			
//	let test = 
//	console.log(browser.storage.local.get('logs').then((res) => { )
	
	
//	sessid = 0
//	partid = 0
	
	//Start the intro. TODO open in a new tab instead of refreshing the current one after 6 sec?
	//restartAlarm("./questionforms/intro.html");
	initAlarm();
	
	
	
	
/*	let contentToStore = {};
    contentToStore["numLogs"] = "0";
    browser.storage.local.set(contentToStore);
	console.log('succes')
	console.log(contentToStore)*/
}

/*
//define numrules logged if it does not already exist
if (typeof browser.storage.local.get('loginfo') == 'undefined') {
	console.log('here')
	var loginfo = {
	'num': 0
	}

    browser.storage.local.set(loginfo);
}*/
	
browser.runtime.onInstalled.addListener(onInstalledNotification);