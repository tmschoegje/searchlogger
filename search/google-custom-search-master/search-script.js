var _prevIndex = 0;
var _nextIndex = 0;
var _resultsPerPage = 10;
var _pageNumber = 1;
var _keywords = ""

$(function ()
{
    $('#btnSearch').show().click(function () { console.log('btnsearch'); Search($("#txtSearchTerm").val(), $("#engine").val(), 0);});
    $('#lnkPrev').click(function () { Search($("#txtSearchTerm").val(), $("#engine").val(), -1); });
    $('#lnkNext').click(function () { Search($("#txtSearchTerm").val(), $("#engine").val(), 1);  });
});


var _engine = "g"
function Search(term, engine, direction)
{
	
	var startIndex = 1;

	if (direction === -1)
	{
		startIndex = _prevIndex; 
		_pageNumber--;
	}
	if (direction === 1)
	{
		startIndex = _nextIndex; 
		_pageNumber++;
	}
	if (direction === 0)
	{
		startIndex = 1; 
		_pageNumber = 1;
	}
	
	//if we should use google
	if(engine == "g"){
		var url = "https://www.googleapis.com/customsearch/v1?key="
		+ mGoogleApiKey + "&num=" + _resultsPerPage + "&cx=" + mGoogleCustomSearchKey + "&start=" + startIndex + "&q=" + escape(term) + "&callback=?";

 //   url = "http://hahndorf/ws/dummy.aspx?q=" + escape(term) + "&start=" + startIndex + "&callback=?";
	}
	//oris
	else{
		console.log('test')
		//var url = "https://api.openraadsinformatie.nl/v0/utrecht/search?size=" + _resultsPerPage + "?query=" + escape(term) + "?from=" + startIndex
		_engine = "o"
		url = "http://api.openraadsinformatie.nl/v0/utrecht/search?query=de?size=1"
	}
	console.log('test2')
	_keywords = term.split(" ")
	$.getJSON(url, '', SearchCompleted);
}

function getPreview(str, keywords){
	var regKey = keywords[0]
	for(i = 1; i < keywords.length; i++)
		regKey += "|" + keywords[i]
//	var regKey = "hello"
//	var str = "Hello, how is it going. This is the bus we have to take!";
	
	var chunks = str.split(/[.?!]/).filter(function(n) {
		var re = new RegExp(regKey,"i");		
		return re.test(n);// /hello/i.test(n);
	});
	console.log(regKey)
	console.log('preview');
	console.log(chunks);
}

function SearchCompleted(response, keywords)
{
	getPreview("Hello, how is it going. This is the bus we have to take!", _keywords);
	console.log('search completed')
	console.log(_engine)
	console.log(response)
	
	
	result1 = response.events[0].classification + " " + response.events[0].name
	console.log(result1)
	
    var html = "";
    $("#searchResult").html("");

    if (response.items == null)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    if (response.items.length === 0)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    $("#searchResult").html(response.queries.request[0].totalResults + " pages found for <b>" +response.queries.request[0].searchTerms+ "</b><br><br>");

    if (response.queries.nextPage != null)
    {
        _nextIndex = response.queries.nextPage[0].startIndex;
        $("#lnkNext").show();
    }
    else
    {
        $("#lnkNext").hide();
    }

    if (response.queries.previousPage != null)
    {
        _prevIndex = response.queries.previousPage[0].startIndex;
        $("#lnkPrev").show();
    }
    else
    {
        $("#lnkPrev").hide();
    }

    if (response.queries.request[0].totalResults > _resultsPerPage){
        $("#lblPageNumber").show().html(_pageNumber);
    }
    else{
        $("#lblPageNumber").hide();
    }

    for (var i = 0; i < response.items.length; i++){
        var item = response.items[i];
        var title = item.htmlTitle;
        
        html += "<p><a class='searchLink' href='" + item.link + "'> " + title + "</a><br>";
        html += item.snippet + "<br>";
        html += item.link + " - <a href='http://www.google.com/search?q=cache:"+item.cacheId+":"+item.displayLink+"'>Cached</a></p><p>";
    }
    $("#output").html(html);
}