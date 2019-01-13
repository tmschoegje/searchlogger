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

//On alarm, show the page action on the current tab
browser.alarms.onAlarm.addListener((alarm) => {
  //var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  //gettingActiveTab.then((tabs) => {
  //  browser.pageAction.show(tabs[0].id);
  //});
  browser.tabs.update({url: alarm.name});
  //This is where pre task goes to task
});

/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
//browser.pageAction.onClicked.addListener(() => {
 // browser.tabs.update({url: CATGIFS});
//});



//load next task, also used for logging.. should rename
function loadNextPhase(task){
	//first determine type: loading next page/stage, or logging event?
	
	
	//console.log('loadtask')
	//console.log(task)
	if (task.type == "prev"){
		//TODO get current stage and task
		//update logs
		task.curStage = logs.sessions[0].curStage - 1
		task.curTask = logs.sessions[0].curTask
		if(task.curStage < 0){
			task.curStage = 2
			task.curTask -= 1
		}
		task.type = "load"
//		logs.sessions[0].loglines.push(Date.now() + " Task " + curTask + " Stage " + curStage)
//		let contentToStore = {};
//		contentToStore['logs'] = logs;
//		browser.storage.local.set(contentToStore);
	}
	
	if(task.type == "load"){
		//update logs
		logs.sessions[0].curStage = task.curStage
		logs.sessions[0].curTask = task.curTask
		logs.sessions[0].loglines.push(Date.now() + " Task " + task.curTask + " Stage " + task.curStage)
		let contentToStore = {};
		contentToStore['logs'] = logs;
		browser.storage.local.set(contentToStore);
		
		//load prestudy
		if(task.curTask == -1){
			console.log('loading prestudy')
			browser.tabs.update({url: "./questionforms/prestudy.html"});
		}
		else if(task.curStage == 0){
			//TODO check if there are more tasks left to do
			console.log('start pre task')
			browser.tabs.update({url: "./questionforms/pretask.html"});
			//todo tell the task to the toolbar rather than via post
		}
		else if(task.curStage == 1){
			console.log('start task')
			browser.tabs.update({url: "http://uu.nl/"});
			restartAlarm("./questionforms/posttask.html");
		}
		else if(task.curStage == 2){
			console.log('start post study')
			browser.tabs.update({url: "./questionforms/poststudy.html"});
		}
		
		
		
	}
	else if(task.type == "log"){
		//Multiple http requests with the same URL, only log the first
		if(task.content.split(" ", 2)[1] != logs.sessions[0].loglines[logs.sessions[0].loglines.length - 1].split(" ", 2)[1]){
			logs.sessions[0].loglines.push(task.content)
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
	console.log('getttt')
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
				}]
			}
		}
		else{
			logs = results.logs
		}
	})
			
//	let test = 
//	console.log(browser.storage.local.get('logs').then((res) => { )
	
	
//	sessid = 0
//	partid = 0
	
	//Start the intro. TODO open in a new tab instead of refreshing the current one after 6 sec?
	restartAlarm("./questionforms/intro.html");
	
	
	
	
	
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