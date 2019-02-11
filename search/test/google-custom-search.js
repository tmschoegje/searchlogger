var _prevIndex = 0;
var _nextIndex = 0;
var _resultsPerPage = 10;
var _pageNumber = 1;

$(function ()
{
    $(&#39;#btnSearch&#39;).show().click(function () { Search($(&quot;#txtSearchTerm&quot;).val(),0);});
    $(&#39;#lnkPrev&#39;).click(function () { Search($(&quot;#txtSearchTerm&quot;).val(),-1); });
    $(&#39;#lnkNext&#39;).click(function () { Search($(&quot;#txtSearchTerm&quot;).val(),1);  });
});

function Search(term, direction)
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

    var url = &quot;https://www.googleapis.com/customsearch/v1?key=&quot;
    + mGoogleApiKey + &quot;&amp;num=10&amp;cx=&quot; + mGoogleCustomSearchKey + &quot;&amp;start=&quot; + startIndex + &quot;&amp;q=&quot; + escape(term) + &quot;&amp;callback=?&quot;;

 //   url = &quot;http://hahndorf/ws/dummy.aspx?q=&quot; + escape(term) + &quot;&amp;start=&quot; + startIndex + &quot;&amp;callback=?&quot;;

    $.getJSON(url, &#39;&#39;, SearchCompleted);
}

function SearchCompleted(response)
{
    var html = &quot;&quot;;
    $(&quot;#searchResult&quot;).html(&quot;&quot;);

    if (response.items == null)
    {
        $(&quot;#searchResult&quot;).html(&quot;No matching pages found&quot;);
        return;
    }

    if (response.items.length === 0)
    {
        $(&quot;#searchResult&quot;).html(&quot;No matching pages found&quot;);
        return;
    }

    $(&quot;#searchResult&quot;).html(response.queries.request[0].totalResults + &quot; pages found for &lt;b&gt;&quot; +response.queries.request[0].searchTerms+ &quot;&lt;/b&gt;&quot;);

    if (response.queries.nextPage != null)
    {
        _nextIndex = response.queries.nextPage[0].startIndex;
        $(&quot;#lnkNext&quot;).show();
    }
    else
    {
        $(&quot;#lnkNext&quot;).hide();
    }

    if (response.queries.previousPage != null)
    {
        _prevIndex = response.queries.previousPage[0].startIndex;
        $(&quot;#lnkPrev&quot;).show();
    }
    else
    {
        $(&quot;#lnkPrev&quot;).hide();
    }

    if (response.queries.request[0].totalResults &gt; _resultsPerPage){
        $(&quot;#lblPageNumber&quot;).show().html(_pageNumber);
    }
    else{
        $(&quot;#lblPageNumber&quot;).hide();
    }

    for (var i = 0; i &lt; response.items.length; i++){
        var item = response.items[i];
        var title = item.htmlTitle;
        
        html += &quot;&lt;p&gt;&lt;a class=&#39;searchLink&#39; href=&#39;&quot; + item.link + &quot;&#39;&gt; &quot; + title + &quot;&lt;/a&gt;&lt;br&gt;&quot;;
        html += item.snippet + &quot;&lt;br&gt;&quot;;
        html += item.link + &quot; - &lt;a href=&#39;http://www.google.com/search?q=cache:&quot;+item.cacheId+&quot;:&quot;+item.displayLink+&quot;&#39;&gt;Cached&lt;/a&gt;&lt;/p&gt;&quot;;
    }
    $(&quot;#output&quot;).html(html);
}