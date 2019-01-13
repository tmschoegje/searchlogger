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
		browser.runtime.sendMessage({"curTask":0, "curStage":0, "type": "log", "content":Date.now() + " " + tabs[0].url})
		
		
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

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});