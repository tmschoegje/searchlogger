var firsttask = "In dit experiment wordt u gevraagd om het antwoord te vinden op 6 zoekvragen die te maken hebben met het beleid van de Gemeente Utrecht. Dit experiment duurt tussen 45 en 75 minuten. Voor de helft van de taken gebruikt u een zoekmachine dat uw resultaten probeert te vinden in de <b>beleidsdocumenten</b> van de Gemeente Utrecht, en voor de andere helft gebruikt u een zoekmachine dat uw resultaten probeert te vinden in <b>online documenten</b>. Zodra u een pagina vindt die helpt om de vraag te beantwoorden geeft u dit aan met de toolbar aan de linkerzijde. <p><b>Verloop experiment</b><p>U wordt straks verwezen naar een zoekmachine om een zoekvraag mee te beantwoorden, waarbij u de toolbar aan de linkerzijde kunt gebruiken. Hierin heeft u de volgende functies:<ul><li>Een knop om te navigeren naar uw huidige opdracht (vragenlijst of zoekmachine)</li><li> Een ster die u kunt aanklikken om aan te geven dat de huidige pagina u helpt om de vraag te beantwoorden</li><li>Een knop om de zoektaak afronden indien u eerder klaar bent dan de tijdslimiet </li><li>Een knop om een stap in het experiment terug tegaan, indien u een antwoord wil wijzigen</li><li>Een balk waarin u kan zien hoe ver u in het experiment bent.</li></ul><p>Als u de browser per ongeluk sluit kunt u deze opnieuw starten en doorgaan met het experiment. Ga voor uzelf na: zijn alle knoppen hiernaast nu duidelijk?<p><p>"
var ibabsintro = "U gaat nu 3 (van de 6) zoektaken uitvoeren met een zoekmachine die naar antwoorden zoekt binnen de beleidsdocumenten. Dit zijn de documenten die gebruikt worden in het openbare beleidsvormingsproces van de Gemeente Utrecht. Hierin staat hoe en waarom besluiten genomen zijn. U krijgt nu een oefentaak om bekend te worden met het zoeken in deze informatie<p><b>Zoektaak</b><p>"
var googleintro = "U gaat nu 3 (van de 6) zoektaken uitvoeren met een zoekmachine die naar antwoorden zoekt binnen online bronnen. Veel mensen blijven vooral op de hoogte van nieuw beleid van de Gemeente via het nieuws en andere webpagina\'s. U zal nu met dit type informatie de zoekvragen beantwoorden. U krijgt nu een oefentaak om bekend te worden met het zoeken in deze informatie:<p><b>Zoektaak</b><p>"
var posttutorial = "<p>Dit is geen oefentaak meer. Als u nog vragen heeft over het experiment kunt u ze nu stellen."
//first one is the training task, keep this in mind when doing the randomisation
var searchtasks = ['Hoe zijn de problemen met het geluidslek in Tivoli Vredenburg aangepakt en opgelost?',
'U heeft gehoord dat er misschien een nieuwe supermarkt op de Uithof komt. Wie heeft deze plannen aan de politiek voorgelegd, en wat is hier nu de status van?',
'De Uithof wordt ook wel eens Science Park genoemd, en de Gemeente zit erover te denken om de naam officieel te veranderen. Waarom is deze verandering zo belangrijk dat de Gemeenteraad er tijd aan wil besteden?',
'De Rijksoverheid heeft besloten en vastgelegd dat huishoudelijke hulp voortaan geregeld gaat worden op Gemeente niveau. Welke voorzieningen biedt de Gemeente een burger nu aan?',
'De Uithoflijn is de naam van de tramlijn die tussen Utrecht Centraal en de Universiteit Utrecht wordt aangelegd. U kijkt naar de Uithoflijn als alternatief om naar de universiteit te komen, maar u weet niet wanneer deze bruikbaar is. Wanneer kunt u deze gebruiken?',
'U bent als student aan het nadenken over een nieuwe woning en heeft gehoord dat de Gemeenteraad van Utrecht het belangrijk vindt dat studenten betaalbaar kunnen wonen. Werkt de Gemeente aan beleid dat invloed kan hebben op uw verhuisplannen?']
var searchtaskshort = ['Hoe zijn de problemen met het Geluidslek in Tivoli Vredenburg aangepakt en opgelost?',
'Wie heeft de supermarkt aan de Uithof politiek aangekaart, en wat is de status hiervan?',
'Waarom wil de Gemeente De Uithof van naam veranderen naar Science Park, en waarom is dit een belangrijke beslissing?',
'Welke Huishoudelijke Hulp voorzieningen biedt de Gemeente een burger nu aan?',
'Wanneer kunt u de Uithoflijn gebruiken?',
'Heeft de Gemeente beleid besloten dat invloed kan hebben op wanneer een student verhuist?'
]

tutorialtasks = ['Hoe zijn de problemen met het geluidslek in Tivoli Vredenburg aangepakt en opgelost?',
'De Rijksoverheid heeft besloten en vastgelegd dat huishoudelijke hulp voortaan geregeld gaat worden op Gemeente niveau. Welke voorzieningen biedt de Gemeente een burger nu aan?']
tutorialtaskshort = ['Hoe zijn de problemen met het Geluidslek in Tivoli Vredenburg aangepakt en opgelost?',
'Welke Huishoudelijke Hulp voorzieningen biedt de Gemeente een burger nu aan?']
generictasks = ['U heeft gehoord dat er misschien een nieuwe supermarkt op de Uithof komt. Wie heeft deze plannen aan de politiek voorgelegd, en wat is hier nu de status van?', 
'U bent als student aan het nadenken over een nieuwe woning en heeft gehoord dat de Gemeenteraad van Utrecht het belangrijk vindt dat studenten betaalbaar kunnen wonen. Werkt de Gemeente aan beleid dat invloed kan hebben op uw verhuisplannen?']
generictaskshort = ['Wie heeft de supermarkt aan de Uithof politiek aangekaart, en wat is de status hiervan?',
'Heeft de Gemeente beleid besloten dat invloed kan hebben op wanneer een student verhuist?']
specifictasks = ['De Uithof wordt ook wel eens Science Park genoemd, en de Gemeente zit erover te denken om de naam officieel te veranderen. Waarom is deze verandering zo belangrijk dat de Gemeenteraad er tijd aan wil besteden?',
'De Uithoflijn is de naam van de tramlijn die tussen Utrecht Centraal en de Universiteit Utrecht wordt aangelegd. U kijkt naar de Uithoflijn als alternatief om naar de universiteit te komen, maar u weet niet wanneer deze bruikbaar is. Wanneer kunt u deze gebruiken?']
specifictaskshort = ['Waarom wil de Gemeente De Uithof van naam veranderen naar Science Park, en waarom is dit een belangrijke beslissing?',
'Wanneer kunt u de Uithoflijn gebruiken?']


var searchengine = ['https://cse.google.com/cse?cx=002312860193215934518:dcojxiqiv44',
'https://cse.google.com/cse?cx=002312860193215934518:dcojxiqiv44',
'https://cse.google.com/cse?cx=002312860193215934518:dcojxiqiv44',
'https://zoek.openraadsinformatie.nl/#/g/utrecht','https://zoek.openraadsinformatie.nl/#/g/utrecht','https://zoek.openraadsinformatie.nl/#/g/utrecht']

var searchengine = ['../search/google-custom-search-master/google-search.html?se=g',
'../search/google-custom-search-master/google-search.html?se=g',
'../search/google-custom-search-master/google-search.html?se=g',
'../search/google-custom-search-master/google-search.html?se=g2',
'../search/google-custom-search-master/google-search.html?se=g2',
'../search/google-custom-search-master/google-search.html?se=g2']
/*'https://cse.google.com/cse?cx=002312860193215934518:dcojxiqiv44',
'https://cse.google.com/cse?cx=002312860193215934518:dcojxiqiv44',
'https://zoek.openraadsinformatie.nl/#/g/utrecht',
'https://zoek.openraadsinformatie.nl/#/g/utrecht',
'https://zoek.openraadsinformatie.nl/#/g/utrecht']
*/
var numsearchtasks = 6
var PRESTUDY = -1
var POSTSTUDY = numsearchtasks
var PRETASK = 0
var TASKTASK = 1
var POSTTASK = 2
var POSTTASKBLOCK = 3
var TASKBLOCKSIZE = 3

//verbose logging for debugging/reference. panel.js logs url on updated tabs
function logURL(requestDetails) {
  //console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

//parameters for 
var DELAY = 10; //time for each task in minutes
var CATGIFS = "./questionforms/prestudy.html"//http://chilloutandwatchsomecatgifs.com/";


googleURL = '../search/google-custom-search-master/google-search.html?se=g'
iBabsURL = '../search/google-custom-search-master/google-search.html?se=g2'
//session id/which randomisation are we using
function randomiseTasks(seed){
	//store the result here for future bookkeeping
	let order = ""
	let newSearchtasks = searchtasks
	let newSearchtaskshort = searchtaskshort
	
	//first half of 16 participants do Google first
	if(seed < 8){
		order += 'google '
		engine1 = googleURL
		engine2 = iBabsURL
	}
	else{
		seed -= 8
		order += 'ibabs '
		engine1 = iBabsURL
		engine2 = googleURL
	}
	//first 3 tasks (1 tutorial + 2) are google
	for(let i = 0; i < 3; i++){
		searchengine[i] = engine1
		searchengine[i+3] = engine2
	}
	//within each group, first half do generic first + HH tutorial
	if(seed < 4){
		order += 'generic '
		tutorial1 = 1
		tutorial2 = 0
	}
	else{
		seed -= 4
		order += 'specific '
		tutorial1 = 0
		tutorial2 = 1
	}
	newSearchtasks[0] = tutorialtasks[tutorial1]
	newSearchtaskshort[0] = tutorialtaskshort[tutorial1]
	newSearchtasks[3] = tutorialtasks[tutorial2]
	newSearchtaskshort[3] = tutorialtaskshort[tutorial2]
	
	//randomise first set of 2 tasks
	if(seed < 2){
		order += 'task1 '
		task1 = 0
		task2 = 1
	}
	else{
		seed -= 2
		order += 'task2 '
		task1 = 1
		task2 = 0
	}
	//we have only 2 seeds left
	if(seed == 0){
		order += 'task1'
		task3 = 0
		task4 = 1
	}
	else{
		order += 'task2'
		task3 = 1
		task4 = 0
	}
	//remember if we are going generic first
	if(tutorial1 == 1){
		newSearchtasks[1] = generictasks[task1]
		newSearchtaskshort[1] = generictaskshort[task1]
		newSearchtasks[2] = generictasks[task2]
		newSearchtaskshort[2] = generictaskshort[task2]
		newSearchtasks[4] = specifictasks[task3]
		newSearchtaskshort[4] = specifictasks[task3]
		newSearchtasks[5] = specifictasks[task4]
		newSearchtaskshort[5] = specifictasks[task4]
	}
	else{
		newSearchtasks[1] = specifictasks[task1]
		newSearchtaskshort[1] = specifictasks[task1]
		newSearchtasks[2] = specifictasks[task2]
		newSearchtaskshort[2] = specifictasks[task2]
		newSearchtasks[4] = generictasks[task3]
		newSearchtaskshort[4] = generictasks[task3]
		newSearchtasks[5] = generictasks[task4]
		newSearchtaskshort[5] = generictasks[task4]
	}
	searchtasks = newSearchtasks
	searchtaskshort = newSearchtaskshort
	
	//Start prepping search task order.. 
	for(cnt = 0; cnt < searchtasks.length; cnt++)
		searchtasks[cnt] = "<font size='+2'>" + searchtasks[cnt] + "</font>"

	searchtasks[0] = firsttask + googleintro + searchtasks[0]
	searchtasks[1] = searchtasks[1] + posttutorial
	searchtasks[3] = ibabsintro + searchtasks[3]
	searchtasks[4] = searchtasks[4] + posttutorial
	return order
}

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
	console.log('storing logs')
	console.log(logs)
}

function storeQuestions(questions){
	let contentToStore = {};
	contentToStore['questions'] = questions;
	browser.storage.local.set(contentToStore);
	console.log(questions)
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
		updateCurPage(alarm.name);
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
			"searchtaskshort": logs.sessions[logs.curSession].curTaskShort,
			"searchengine": logs.sessions[logs.curSession].curEngine
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
	console.log('setting task!!!!!')
	stask = ""
	staskshort = ""
	sengine = ""
	//If we are currently in a task, set the contents
	if(taskid >= 0 && taskid < numsearchtasks){
		console.log('setting engine')
		stask = searchtasks[taskid]
		staskshort = searchtaskshort[taskid]
		sengine = searchengine[taskid]
		console.log(sengine)
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
	logs.sessions[logs.curSession].curEngine = sengine
	
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
				
			//if this was the first stage in a task/the poststudy, go to last stage of a task or to the SUS if applicable
			if(task.curStage < 0){
				//if prestudy and a SUS comes next
				if(task.curTask == TASKBLOCKSIZE || task.curTask == TASKBLOCKSIZE * 2){
					console.log('loadsus1')
					task.content = "loadsus"
					task.curStage = POSTTASKBLOCK
					task.curTask -= 1
				}
				//if it was the first stage in the first task, go to last stage of prestudy
				else if(task.curTask == 0){
					task.curStage = 1
					task.curTask -= 1
				}
				else {//if(task.curTask == 1){
					task.curStage = POSTTASK
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
			
			
			//if this was the final stage of the prestudy, next task  (it is shorter)
			if(task.curTask == PRESTUDY && task.curStage > TASKTASK){
				task.curTask += 1
				task.curStage = PRETASK
			}
			//if the final stage of a search task (i.e. posttask or posttaskblock), next task
			else if(task.curStage > POSTTASK){
				
				//if posttask and a SUS comes next
				if(task.curStage == POSTTASK + 1 && 
				(task.curTask == TASKBLOCKSIZE - 1 || task.curTask == TASKBLOCKSIZE * 2 - 1)){
					console.log(task)
					console.log('loadsus2')
					task.content = "loadsus"
					task.curStage = POSTTASKBLOCK
				}
				else{
					task.curTask += 1
					task.curStage = PRETASK
				}
			}
			task.type = "load"
			//console.log(task.type)
			//console.log(task.curTask)
			//console.log(task.curStage)
		}
	}
	if(task.type == "nextsession"){
		logs.curSession += 1;
		//create this new session
		logs.sessions.push({
			"participantid": logs.curSession,
			"curTask": -1,
			"curStage": 0,
			"loglines": [Date.now() + " Logs for session 0 with participant 0"],
			"bookmarks": {},
			"order": randomiseTasks(logs.curSession)
			})
		let gett = browser.storage.local.get()
		gett.then((results) => {
			results.questions.sessions.push({
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
					}],
					"sus":[{
						"sus1":"",
						"sus2":"",
						"sus3":"",
						"sus4":"",
						"sus5":"",
						"sus6":"",
						"sus7":"",
						"sus8":"",
						"sus9":"",
						"sus10":""
					},
					{
						"sus1":"",
						"sus2":"",
						"sus3":"",
						"sus4":"",
						"sus5":"",
						"sus6":"",
						"sus7":"",
						"sus8":"",
						"sus9":"",
						"sus10":""
					}]
			})
			let contentToStore = {};
			contentToStore["questions"] = results.questions;
			browser.storage.local.set(contentToStore);
		})
		//so load the proper stage
		task.type = "load"
		task.curTask = -1
		task.curStage = 0
	}
	if(task.type == "load"){
//		console.log('load')
//		console.log(task)
		//focus on window with the questions
		closeOtherTabs();
		
		//cancel alarms
		browser.alarms.clearAll();
		
		//make sure the task is updated in toolbar and questions 
		setTask(task.curTask)

		
		//update logs
		
		logs.sessions[logs.curSession].curStage = task.curStage
		logs.sessions[logs.curSession].curTask = task.curTask
		
		//if already indicated to load the sus, or if we come from a stage where we might load a sus + we're in the right task, load the sus
		if(task.content == "loadsus" ||
		((task.curStage == POSTTASKBLOCK) && (task.curTask == TASKBLOCKSIZE - 1 || task.curTask == TASKBLOCKSIZE * 2 - 1))){
			console.log(task)
			console.log('SUS IN LOAD')
			task.curStage = POSTTASKBLOCK
			task.content = "loadsus"
			console.log('this is why3')
		}
		logs.sessions[logs.curSession].loglines.push(Date.now() + " Task " + task.curTask + " Stage " + task.curStage)
		storeLogs();
		
		//load prestudy
		if(task.curTask == PRESTUDY){
			if(task.curStage == PRETASK){
				console.log('loading intro')
				browser.tabs.update({url: "../questionforms/intro.html"});
				updateCurPage("../questionforms/intro.html");
			}
			else if(task.curStage == TASKTASK){
				console.log('loading prestudy')
				browser.tabs.update({url: "../questionforms/prestudy.html"});
				updateCurPage("../questionforms/prestudy.html");
			}
			else{ alert('unknown state') }
		}
		//test if last task was performed
		else if(task.curTask == numsearchtasks){
			console.log('start post study')
			browser.tabs.update({url: "../questionforms/poststudy.html"});
			updateCurPage("../questionforms/poststudy.html");
		}
		// post task block/show the SUS?
		else if(task.content == "loadsus"){
			console.log('starting post task block')
			browser.tabs.update({url: "./questionforms/posttaskblock.html"});
			updateCurPage("../questionforms/posttaskblock.html");
		}
		//else it's a regular task
		else if(task.curStage == PRETASK){
			//If this is a posttaskblock -> if so insert SUS.
			
			//We can get here in two cases: prev/next toolbar (we can handle this in task.type = prev or next, by setting content as 'loadsus' if the below if statement)
			//we can get here from.. a posttak by 
			
			//if it's time for a posttaskblock SUS questionnaire, intercede the pre-task with 
			//if(task.curTask == TASKBLOCKSIZE - 1 || task.curTask == TASKBLOCKSIZE * 2 - 1){

			//GO TO TASKBLOCK IF: first time at pre-task     use content=?
			
		/*		console.log('should do the thing')
				
				let gett = browser.storage.local.get();
				gett.then((results) => {

					if(typeof results.questions.sessions[results.logs.curSession].sus[0] === ""){
						console.log('we should show the SUS')
						browser.tabs.update({url: "./questionforms/posttaskblock.html"});
					}
					})
			}
			else {*/
				//TODO check if there are more tasks left to do
				console.log('start pre task')
				browser.tabs.update({url: "./questionforms/pretask.html"});
				updateCurPage("../questionforms/pretask.html");
				//todo tell the task to the toolbar rather than via post
				//last is optional
			//}
		}
		else if(task.curStage == TASKTASK){
			console.log('start task')
			let retrieveLogs = browser.storage.local.get().then((results) => {
				curUrl = results.logs.sessions[results.logs.curSession].curEngine
				browser.tabs.update({url: curUrl});
				restartAlarm("../questionforms/posttask.html");
				updateCurPage(curUrl);
			})
		}
		//menu navigation can get here (instead of by the alarm)
		else if(task.curStage == POSTTASK){
			console.log('post task')
			browser.tabs.update({url: "../questionforms/posttask.html"});
			updateCurPage("../questionforms/posttask.html");
		}
			
		
		
		
		
	}
	else if(task.type == "log"){
		//Multiple http requests with the same URL?, only log the first
		//alert(task.content.split(" ", 4)[3])
		//alert(logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1].split(" ", 4)[3])
		if(task.content.split(" ", 4)[3] != logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1].split(" ", 4)[3]){
			//alert('same')
/*			console.log('current')
			console.log(task.content)
			console.log('previous')
			console.log(logs.sessions[logs.curSession].loglines[logs.sessions[logs.curSession].loglines.length - 1])*/
		
		
			logs.sessions[logs.curSession].loglines.push(task.content)
			//console.log(logs)
			//update stored logs
			//let contentToStore = {};
			storeLogs();
			
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


//Called when installed, and when starting a new session
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
					"bookmarks": {},
					"order": randomiseTasks(0)
				}],
				"curSession": 0,
				"searchtasks": searchtasks,
				"searchtaskshort": searchtaskshort,
				"curTaskFull": "",
				"curEngine":"",
				"curTaskShort": ""
			}
			curPage = ""
			
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
					}],
					"sus":[{
						"sus1":"",
						"sus2":"",
						"sus3":"",
						"sus4":"",
						"sus5":"",
						"sus6":"",
						"sus7":"",
						"sus8":"",
						"sus9":"",
						"sus10":""
					},
					{
						"sus1":"",
						"sus2":"",
						"sus3":"",
						"sus4":"",
						"sus5":"",
						"sus6":"",
						"sus7":"",
						"sus8":"",
						"sus9":"",
						"sus10":""
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
			updateCurPage("");
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

function updateCurPage(newUrl){
	let contentToStore = {};
    contentToStore["curPage"] = newUrl;
    browser.storage.local.set(contentToStore);
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