var TASKBLOCKSIZE = 3
var POSTTASKBLOCK = 3

function validateInput(input, type){
	//If this variable was not set, it cannot be wrong
	if (typeof input === 'undefined')
		return 0
	else if (type == "text" && input.value.length > 0)
		return 0
	else if (type == "number" && input.value.length > 0 && !isNaN(input.value))
		return 0
	else if (type == "year" && input.value.length == 4 && !isNaN(input.value))
		return 0
	else if (type == "check" && input.checked == true)
		return 0
	else if (type == "selection" && input.value != "")
		return 0
	//If none of these conditions are met, we have an input that violated its conditions
	return 1
}

function inputChecker (){
	errorcount = 0;
	//console.log(document.forms[0].elements);
	
	//should refactor so we can just register new inputs, instead of manually adding them at 3 places...
	errorcount += validateInput(document.forms[0].elements.consent, "check");
	
	errorcount += validateInput(document.forms[0].elements.sex, "selection");
	errorcount += validateInput(document.forms[0].elements.age, "year");
	errorcount += validateInput(document.forms[0].elements.citizentime, "number");
	errorcount += validateInput(document.forms[0].elements.nieuws, "selection");
	errorcount += validateInput(document.forms[0].elements.betrokken, "selection");
	
	errorcount += validateInput(document.forms[0].elements.hoogte, "selection");
	errorcount += validateInput(document.forms[0].elements.userantwoord, "text");
	errorcount += validateInput(document.forms[0].elements.tevreden, "selection");
	errorcount += validateInput(document.forms[0].elements.seq, "selection");

	errorcount += validateInput(document.forms[0].elements.sus1, "selection");
	errorcount += validateInput(document.forms[0].elements.sus2, "selection");
	errorcount += validateInput(document.forms[0].elements.sus3, "selection");
	errorcount += validateInput(document.forms[0].elements.sus4, "selection");
	errorcount += validateInput(document.forms[0].elements.sus5, "selection");
	errorcount += validateInput(document.forms[0].elements.sus6, "selection");
	errorcount += validateInput(document.forms[0].elements.sus7, "selection");
	errorcount += validateInput(document.forms[0].elements.sus8, "selection");
	errorcount += validateInput(document.forms[0].elements.sus9, "selection");
	errorcount += validateInput(document.forms[0].elements.sus10, "selection");
	
	console.log(errorcount)
		
	return errorcount;
}

var numsearchtasks = 6
var PRESTUDY = -1
var POSTSTUDY = numsearchtasks
var PRETASK = 0
var TASKTASK = 1
var POSTTASK = 2

function loadAnswers() {
	//get logs
	let gett = browser.storage.local.get();
	gett.then((results) => {
		//console.log(results)
		//console.log('questions LOAD')
		//console.log(results.questions.sessions[0].consent)
		logs = results.logs
		questions = results.questions
		console.log(questions)
		
		//informed consent
		if(logs.sessions[logs.curSession].curTask == PRESTUDY && logs.sessions[logs.curSession].curStage == PRETASK)
			document.forms[0].elements.consent.value = questions.sessions[logs.curSession].consent;
		//prestudy
		if(logs.sessions[logs.curSession].curTask == PRESTUDY && logs.sessions[logs.curSession].curStage == TASKTASK){
			document.forms[0].elements.sex.value = questions.sessions[logs.curSession].sex;
			document.forms[0].elements.age.value = questions.sessions[logs.curSession].age;
			document.forms[0].elements.citizentime.value = questions.sessions[logs.curSession].citizentime;
			document.forms[0].elements.nieuws.value = questions.sessions[logs.curSession].nieuws;
			document.forms[0].elements.betrokken.value = questions.sessions[logs.curSession].betrokken;
		} //pretask
		else if(logs.sessions[logs.curSession].curTask != POSTSTUDY && logs.sessions[logs.curSession].curStage == PRETASK){
			//if regular pretask
			document.forms[0].elements.hoogte.value = questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].hoogte;
		} //posttask
		else if(logs.sessions[logs.curSession].curTask != POSTSTUDY && logs.sessions[logs.curSession].curStage == POSTTASK){
			document.forms[0].elements.tevreden.value = questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].tevreden;
			 document.forms[0].elements.seq.value = questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].seq;
			 document.forms[0].elements.userantwoord.value = questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].userantwoord;
		} //posttaskblock
		else if(typeof document.forms[0].elements.sus1 != "undefined"){
			//are we in the first or second taskblock
			tblock = 1
			if(logs.sessions[logs.curSession].curTask == TASKBLOCKSIZE - 1)
				tblock = 0
			console.log('load')
			console.log(document.forms[0])
			console.log(questions.sessions[logs.curSession])
			//store sus values
			document.forms[0].elements.sus1.value = questions.sessions[logs.curSession].sus[tblock].sus1;
			document.forms[0].elements.sus2.value = questions.sessions[logs.curSession].sus[tblock].sus2;
			document.forms[0].elements.sus3.value = questions.sessions[logs.curSession].sus[tblock].sus3;
			document.forms[0].elements.sus4.value = questions.sessions[logs.curSession].sus[tblock].sus4;
			document.forms[0].elements.sus5.value = questions.sessions[logs.curSession].sus[tblock].sus5;
			document.forms[0].elements.sus6.value = questions.sessions[logs.curSession].sus[tblock].sus6;
			document.forms[0].elements.sus7.value = questions.sessions[logs.curSession].sus[tblock].sus7;
			document.forms[0].elements.sus8.value = questions.sessions[logs.curSession].sus[tblock].sus8;
			document.forms[0].elements.sus9.value = questions.sessions[logs.curSession].sus[tblock].sus9;
			document.forms[0].elements.sus10.value = questions.sessions[logs.curSession].sus[tblock].sus10;
		}
	})
}



//whenever a click of press happens, update the logs
function storeAnswers() {
	//get logs
	let gett = browser.storage.local.get();
	gett.then((results) => {
		logs = results.logs
		questions = results.questions
		console.log('storing answers')
		console.log(logs)

		//informed consent
		if(logs.sessions[logs.curSession].curTask == PRESTUDY && logs.sessions[logs.curSession].curStage == PRETASK)
			questions.sessions[logs.curSession].consent = document.forms[0].elements.consent.value;
		//prestudy
		if(logs.sessions[logs.curSession].curTask == PRESTUDY && logs.sessions[logs.curSession].curStage == TASKTASK){
			console.log('1')
			questions.sessions[logs.curSession].sex = document.forms[0].elements.sex.value;
			questions.sessions[logs.curSession].age = document.forms[0].elements.age.value;
			questions.sessions[logs.curSession].citizentime = document.forms[0].elements.citizentime.value;
			questions.sessions[logs.curSession].nieuws = document.forms[0].elements.nieuws.value;
			questions.sessions[logs.curSession].betrokken = document.forms[0].elements.betrokken.value;
			console.log('2')
		} //pretask 
		else if(logs.sessions[logs.curSession].curTask != POSTSTUDY && logs.sessions[logs.curSession].curStage == PRETASK){
			questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].hoogte = document.forms[0].elements.hoogte.value;
		} //posttask
		else if(logs.sessions[logs.curSession].curTask != POSTSTUDY && logs.sessions[logs.curSession].curStage == POSTTASK){
			questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].tevreden = document.forms[0].elements.tevreden.value;
			questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].seq = document.forms[0].elements.seq.value;
			questions.sessions[logs.curSession].taskquestions[logs.sessions[logs.curSession].curTask].userantwoord = document.forms[0].elements.userantwoord.value;
		} //posttaskblock
		else if(typeof document.forms[0].elements.sus1 != "undefined"){
			console.log('gonna store')
			console.log(document.forms[0].elements.sus1.value)
			console.log(logs.sessions[logs.curSession].curTask)
			console.log(TASKBLOCKSIZE - 1)
			console.log(questions.sessions[logs.curSession])
			
			//are we in the first or second taskblock
			tblock = 1
			if(logs.sessions[logs.curSession].curTask == TASKBLOCKSIZE - 1)
				tblock = 0
			//store sus values
			questions.sessions[logs.curSession].sus[tblock].sus1 = document.forms[0].elements.sus1.value;
			questions.sessions[logs.curSession].sus[tblock].sus2 = document.forms[0].elements.sus2.value;
			questions.sessions[logs.curSession].sus[tblock].sus3 = document.forms[0].elements.sus3.value;
			questions.sessions[logs.curSession].sus[tblock].sus4 = document.forms[0].elements.sus4.value;
			questions.sessions[logs.curSession].sus[tblock].sus5 = document.forms[0].elements.sus5.value;
			questions.sessions[logs.curSession].sus[tblock].sus6 = document.forms[0].elements.sus6.value;
			questions.sessions[logs.curSession].sus[tblock].sus7 = document.forms[0].elements.sus7.value;
			questions.sessions[logs.curSession].sus[tblock].sus8 = document.forms[0].elements.sus8.value;
			questions.sessions[logs.curSession].sus[tblock].sus9 = document.forms[0].elements.sus9.value;
			questions.sessions[logs.curSession].sus[tblock].sus10 = document.forms[0].elements.sus10.value;
		}
		//store the logs
		let contentToStore = {};
		contentToStore['questions'] = questions;
		browser.storage.local.set(contentToStore);
		
		console.log('stored the following')
		console.log(questions.sessions[0])

		
		//update bookmark as well..
		//-> should have made each javascript use its own key in the localstorage to
		//avoid these race conditions, rather than putting everything into the logs structure.
		//console.log('questions STORE')
		//console.log(logs.sessions[0].questions)
		
		
		//updateLogs();
		
	})
}

/*function printLogs(){
	let contentToStore = {};
	contentToStore['logs'] = logs;
	browser.storage.local.set(contentToStore);
}*/
//window.onmouseup.addListener(storeAnswers);
//document.onkeypress.addListener(storeAnswers);


//function logger(){
//	storeAnswers();
//}
//timer = setInterval(logger,200);
//clearInterval(timer)

function loadNext(e, taskId, phase){
	e.preventDefault();
	//pass for now..
	if(inputChecker() > 0)
		alert('Een van de invoeren is onduidelijk! Voer aub alle velden in, en gebruik cijfers waar dat van toepassing is.')
	else{
		//storeAnswers({"curTask":taskId, "curStage":phase, "type": "load", "content": "unknowntask"})
		storeAnswers();
		browser.runtime.sendMessage({"curTask":taskId, "curStage":phase, "type": "load", "content": "unknowntask"})
		//console.log('loadnext questions')
	}
}

function loadNextTaskless(e, phase){
	e.preventDefault();
	if(inputChecker() > 0)
		alert('Een van de invoeren is onduidelijk! Voer aub alle velden in, en gebruik cijfers waar dat van toepassing is.')
	else{
		//storeAnswers({"curTask":-3, "curStage":phase, "type": "loadTaskless", "content": ""})
		storeAnswers();
		content = ""
		if(phase == 0)
			content = "sus"
		browser.runtime.sendMessage({"curTask":-3, "curStage":phase, "type": "loadTaskless", "content": content})
		//console.log('other submit')
		
	}
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

window.onload = function () { loadAnswers(); console.log('loading answers!!!'); }
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

//update our logs if another script makes changes
function updateLogs(){
	let gett = browser.storage.local.get();
	gett.then((results) => {
		logs = results.logs
//		console.log('stored in questions')
//		console.log(logs.sessions[0].questions)
	})
}

//window.addEventListener("click", notifyExtension);

/*
//update our logs if another script makes changes
function updateLogs2(){
	let gett = browser.storage.local.get();
	gett.then((results) => {
		logs = results.logs
		console.log('reloaded logs from onChange event')
		console.log(logs.sessions[0].questions)
	})
}*/

//browser.storage.onChanged.addListener(updateLogs2)

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