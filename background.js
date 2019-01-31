//first one is the training task, keep this in mind when doing the randomisation
var searchtasks = ['Dit is een oefentaak om bekend te worden met het experiment! U wordt zo verwezen naar de zoekmachine waarmee u een oefentaak moet oplossen. Gebruik de toolbar om terug te gaan naar de zoekmachine als dat nodig is. Als u een fout heeft gemaakt in uw antwoorden kan u deze gebruiken om een stap in het experiment opnieuw te doen (gebruikt als u een vraag wilt corrigeren), of aangeven dat u klaar bent voor de volgende zoektaak. Gebruik de toolbar hiernaast om aan te geven dat een pagina of document informatief was voor uw doel.',
'U kijkt naar de Uithoflijn als alternatief om naar de universiteit te komen, maar u weet niet wanneer deze bruikbaar is. Hoe is de planning van het bouwen van de Uithoflijn verlopen, en aangepast?',
'U heeft gehoord dat er misschien een nieuwe supermarkt op de Uithof komt. Wie heeft deze plannen politiek gezien aangekaart, en wat is hier de status van?',
'U bent als zijnde student op aan het nadenken over een nieuwe woning en heeft gehoord dat de Gemeenteraad van Utrecht het belangrijk vind dat studenten betaalbaar kunnen wonen. Heeft de Gemeente recent besluiten genomen die invloed kunnen hebben op wanneer u verhuist?',
'De Uithof wordt ook wel eens Science Park genoemd, en de Gemeente zit erover te denken om de naam permanent te veranderen. Waarom is deze verandering zo belangrijk dat de Gemeenteraad er tijd aan wil besteden?']
var searchtaskshort = ['Markeer een pagina als informatief en begin de volgende taak!',
'Hoe is de planning van het bouwen van de Uithoflijn verlopen, en aangepast?',
'Hoe wordt er gelobbyd voor een grotere supermarkt op de Uithof?',
'Heeft de Gemeente besluiten genomen die invloed kunnen hebben op wanneer een student verhuist?',
'Waarom wil de Gemeente De Uithof van naam veranderen naar Science Park?'
]
numsearchtasks = 5

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



//start bookmark code
/*
var currentTab;
var currentBookmark;
currentUrl = ""

 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 
function updateIcon() {
  browser.sidebarAction.setIcon({
    path: currentBookmark ? {
      19: "icons/star-filled-19.png",
      38: "icons/star-filled-38.png"
    } : {
      19: "icons/star-empty-19.png",
      38: "icons/star-empty-38.png"
    },
    tabId: currentTab.id
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentBookmark ? 'Unbookmark it!' : 'Bookmark it!',
    tabId: currentTab.id
  }); 
}


 * Add or remove the bookmark on the current page.
 
function toggleBookmark() {
  currentTab = tabs[0];
  if (currentUrl != "") {
    //browser.bookmarks.remove(currentBookmark.id);
	console.log('removing bookmark') // TODO store in logs
	currentUrl = ""
	alert('remove')
  } else {
    console.log('adding bookmark') // TODO store in logs
	currentUrl = currentTab.url
	//browser.bookmarks.create({title: currentTab.title, url: currentTab.url});
  }
}

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 
function updateActiveTab(tabs) {

  function isSupportedProtocol(urlString) {
    var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    var url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
  }

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
	if(currentTab.url == ""
	  
    //  if (isSupportedProtocol(currentTab.url)) {
        var searching = browser.bookmarks.search({url: currentTab.url});
        searching.then((bookmarks) => {
          currentBookmark = bookmarks[0];
          updateIcon();
        });
    //  } else {
     //   console.log(`Bookmark it! does not support the '${currentTab.url}' URL.`)
      //}
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}*/

//browser.sidebarAction.onClicked.addListener(toggleBookmark);

//end bookmark code



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

//race issue: storing answers occurs concurrently with logging a load/stage update.
//currently fixed
//should be refactored so that the background, content (questions) and panel scripts use different parts of localmemory instead of everythign in the logs structure
function storeLogs(){
	let contentToStore = {};
	contentToStore['logs'] = logs;
	browser.storage.local.set(contentToStore);
}

function storeQuestions(questions){
	let contentToStore = {};
	contentToStore['questions'] = questions;
	browser.storage.local.set(contentToStore);
}

//Cases: starting the app, time limit task is over
//is this still the case?
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
  //go to next task
  else{
	//note: only every called when the next stage is in the same task, so we never have to increment the task
	//note: update of logs is kinda unnecessary here since onchanges 
	console.log('ALARM GOING OFF')
	console.log(alarm.name)
	let getlgs = browser.storage.local.get();
	getlgs.then((results) => { 
		logs = results.logs
		logs.sessions[logs.curSession].curStage = logs.sessions[logs.curSession].curStage + 1
		setTask(logs.sessions[logs.curSession].curTask);
		browser.tabs.update({url: alarm.name});
	})
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
//		console.log('these tabs')
//		console.log(tabs)
		tabs.forEach(function (tab) {
			if(tab.active == false){
				browser.tabs.remove(tab.id)
			//	console.log(tab.id)
			}
		})
	}
)}




function setSuccessfull(tabs) {
	console.log('setting')
	//console.log('tabs')
		 //console.log(tabs)
	for (let tab of tabs) {
		browser.tabs.sendMessage(
		tab.id,
		{
			"type": "setTask", 
			"searchtask": logs.sessions[logs.curSession].curTaskFull, 
			"searchtaskshort": logs.sessions[logs.curSession].curTaskShort
		})/*.then(response => {
		console.log("Message from the content script:");
		console.log(response.response);
		}).catch(onError);*/
	}
}

function handleError(error) {
  console.log('Error: ${error}');
}


//update toolbar and pre forms
function setTask(taskid){
//	console.log('setting task!!!!!')
	stask = ""
	staskshort = ""
	//If we are currently in a task, set the contents
	if(taskid >= 0 && taskid < numsearchtasks){
		stask = searchtasks[taskid]
		staskshort = searchtaskshort[taskid]
	}
/*	console.log(stask)
	console.log(staskshort)
	console.log(searchtasks)
	console.log(taskid)
	console.log(searchtasks[0])*/
		
	//in case of edge cases where user
//	browser.tabs.query({}).then(setSuccessfull, handleError)

	//currently uses localstorage to avoid racing errors with message, also better for resuming session..
	logs.sessions[logs.curSession].curTaskFull = stask
	logs.sessions[logs.curSession].curTaskShort = staskshort
	
/*	let contentToStore = {};
    contentToStore["searchtask"] = stask;
	contentToStore["searchtaskshort"] = staskshort;
    browser.storage.local.set(contentToStore);
	console.log('set tasks')
//	console.log(contentToStore)*/
	storeLogs();
	
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
		alert('not supposed to happen')
	}
	//if we want to load but don't know the current task
	//note: could probably be replaced by calling the "next"
	if(task.type == "loadTaskless"){
		//task.curTask = logs.sessions[logs.curSession].curTask + 1
		task.type = "next"
	}
//	console.log('message received')
	if (task.type == "prev"){
		//console.log(task.type)
		//console.log(logs.sessions[logs.curSession].curTask)
		//console.log(logs.sessions[logs.curSession].curStage)
		//TODO get current stage and task
		//update logs
		//if not already already at the start
		if(!(logs.sessions[logs.curSession].curTask < 0 && logs.sessions[logs.curSession].curStage < 1)){
			task.curStage = logs.sessions[logs.curSession].curStage - 1
			task.curTask = logs.sessions[logs.curSession].curTask
		
			//clear alarms previously set
			//browser.alarms.clearAll();
				
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
			//console.log(task.type)
			//console.log(task.curTask)
			//console.log(task.curStage)
		}
//		logs.sessions[0].loglines.push(Date.now() + " Task " + curTask + " Stage " + curStage)
//		let contentToStore = {};
//		contentToStore['logs'] = logs;
//		browser.storage.local.set(contentToStore);
	}
	if (task.type == "next"){
		//console.log(task.type)
		//console.log(logs.sessions[logs.curSession].curTask)
		//console.log(logs.sessions[logs.curSession].curStage)
		//if not the final page
		if(!(logs.sessions[logs.curSession].curTask >= numsearchtasks)){
			//increase the search stage
			task.curStage = logs.sessions[logs.curSession].curStage + 1
			task.curTask = logs.sessions[logs.curSession].curTask
			
			//clear alarms previously set
			//browser.alarms.clearAll();
			
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
			//console.log(task.type)
			//console.log(task.curTask)
			//console.log(task.curStage)
		}
	}
	if(task.type == "load"){
		console.log('TRYING TO LOAD')
		//focus on window with the questions
		closeOtherTabs();
		
		//cancel alarms
		browser.alarms.clearAll();
		
		//make sure the task is updated in toolbar and questions 
		setTask(task.curTask)

		
		//update logs
		
		logs.sessions[logs.curSession].curStage = task.curStage
		logs.sessions[logs.curSession].curTask = task.curTask
		logs.sessions[logs.curSession].loglines.push(Date.now() + " Task " + task.curTask + " Stage " + task.curStage)
		storeLogs();
		
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
		else if(task.curTask == numsearchtasks){
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
/*			console.log('current')
			console.log(task.content)
			console.log('previous')
			console.log(logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1])*/
		
		
			logs.sessions[logs.curSession].loglines.push(task.content)
			//console.log(logs)
			//update stored logs
			let contentToStore = {};
			storeLogs();
			
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
			"loglines": [Date.now() + " Logs for session 0 with participant 0"],
			"bookmarks": {'dummy2':'test2'}
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
					"loglines": [Date.now() + " Logs for session 0 with participant 0"],
					"bookmarks": {}
				}],
				"curSession": 0,
				"searchtasks": searchtasks,
				"searchtaskshort": searchtaskshort,
				"curTaskFull": "",
				"curTaskShort": ""
			}
			
			questions = {
				"sessions": [{
					"consent":"",
					"sex":"",
					"age":"",
					"citizentime":"",
					"nieuws":"",
					"betrokken":"",
					"taskquestions":[{
						"hoogte": "",
						"userantwoord": "",
						"tevreden":"",
						"seq":""
					}]
				}]
			}
			
		//	console.log('okay')
		//	console.log(questions)
		//	console.log(questions.sessions[0])
		//	console.log(questions.sessions[0].taskquestions)
			for(i = 0; i < numsearchtasks - 1; i++){
				questions.sessions[0].taskquestions.push({
					"hoogte": "",
					"userantwoord": "",
					"tevreden":"",
					"seq":""
				})
			}
		//	console.log(questions)
			storeQuestions(questions);
			storeLogs();
		}
		else{
			logs = results.logs
			logs.sessions[logs.curSession].loglines.push("Resuming logs at task " + logs.sessions[logs.curSession].curTask + " stage " + logs.sessions[logs.curSession].curStage)
			questions = results.questions
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


//update our logs if another script makes changes
function updateLogs(){
	let gett = browser.storage.local.get();
	gett.then((results) => {
		logs = results.logs
		//console.log('onChange')
		//console.log(questions)
	})
}


browser.storage.onChanged.addListener(updateLogs)


//todo log all keypresses so we can keep track of ctrl+f

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