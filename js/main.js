////////////////////////////////////////////////////////////////////////////////////
// Global

function errorDlg(msg)
{
	window.alert("Error:" + msg);
}

////////////////////////////////////////////////////////////////////////////////////
//
var request = new Array();


var start = 1;
var diff = 10;

if(0)
{
for( var i = start ; i <= start + diff ; i++ )
	request.push( { error_id: i, url: 'http://api.lolesports.com/api/v1/scheduleItems?leagueId='+i } )

var jqXHRList = [];

for( var i = 0, max = request.length ; i < max ; ++i )
{
	jqXHRList.push($.ajax(
	{
		url: request[i].url,
		type: 'GET',
		dataType: 'json',
		data: request[i].data,
	}));
}

$.when.apply(null, jqXHRList).done(function ()
{
	var json = [];
	var statuses = [];
	var jqXHRResultList = [];
	
	for( var i = 0, max = arguments.length ; i < max ; ++i )
	{
		var result = arguments[i];
		json.push(result[0]);
		statuses.push(result[1]);
		jqXHRResultList.push(result[3]);
	}
	
	var request2 = new Array();
	
	console.log(arguments);
	console.log(json);
	
	/*
	var match = new Array();
	var tournament = new Array();
	var bracket = new Array();
	var games = new Array();
	var gameRealm = new Array();
	var gameId = new Array();
	*/
	for( var i = 0 ; i < json.length ; i++ )
	{
		
		var index = start + i;
		document.write("=========== LeagueID:" + index + " ===========");
		document.write("<br>");
		document.write("url : http://api.lolesports.com/api/v1/scheduleItems?leagueId=" + index);
		document.write("<br>");
		
		for( var j = 0 ; j < json[i].highlanderTournaments.length ; j++ )
		{
			if(0)
			{
				document.write("j : " + j );
				document.write("<br>");
				document.write("description : " + json[i].highlanderTournaments[j].description);
				document.write("<br>");
				document.write("title : " + json[i].highlanderTournaments[j].title);
				document.write("<br>");
				document.write("Date start: " + json[i].highlanderTournaments[j].startDate + "  end : " + json[i].highlanderTournaments[j].endDate);
				document.write("<br>");
			}
			else
			{
/*
				document.write("j : " + j );
				document.write("<br>");
				document.write("description : " + json[i].highlanderTournaments[j].description);
				document.write("<br>");
				document.write("title : " + json[i].highlanderTournaments[j].title);
				document.write("<br>");
				document.write("Date start: " + json[i].highlanderTournaments[j].startDate + "  end : " + json[i].highlanderTournaments[j].endDate);
				document.write("<br>");
*/
				for( var k in json[i].highlanderTournaments[j].brackets )
				{
					for( var l in json[i].highlanderTournaments[j].brackets[k].matches )
					{
						for( var m in json[i].highlanderTournaments[j].brackets[k].matches[l].games )
						{
//							document.write("gameRealm :" + json[i].highlanderTournaments[j].brackets[k].matches[l].games[m].gameRealm );
//							document.write("<br>");
/*
							if( json[i].highlanderTournaments[j].brackets[k].matches[l].games[m].gameRealm == "ESPORTSTMNT02" )
							{
								var tornament = json[i].highlanderTournaments[j].id;
								var match = l;
								var isYear = false;
								
								if( json[i].highlanderTournaments[j].startDate != undefined )
									json[i].highlanderTournaments[j].startDate.indexOf("2017") != -1 ? true : false;

								if( tornament != undefined && match != undefined )
									request2.push( { error_id: "scheduleItems : " + i, url: "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=" + tornament + "&matchId=" + match } )
							}
*/
						}
					}
				}
			}
		}
		
		
		/*
		for( var j in json[i].scheduleItems )
		{
			var tornament = json[i].scheduleItems[j].tournament;
			var match = json[i].scheduleItems[j].match;
			var isYear = json[i].scheduleItems[j].scheduledTime.indexOf("2017") != -1 ? true : false;
			
			if( tornament != undefined && match != undefined && isYear == true )
				request2.push( { error_id: "scheduleItems : " + i, url: "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=" + tornament + "&matchId=" + match } )
		}
		*/
	}
	
	console.log(request2);
	
	if( request2.length <= 0 )
	{
		console.log("NO REQUEST2");
		return;
	}
	
	var jqXHRList2 = [];

	for( var i = 0, max = request2.length ; i < max ; ++i )
	{
		jqXHRList2.push($.ajax(
		{
			url: request2[i].url,
			type: 'GET',
			dataType: 'json',
			data: request2[i].data,
		}));
	}

	$.when.apply(null, jqXHRList2).done(function ()
	{
		var json2 = [];
		var statuses2 = [];
		var jqXHRResultList2 = [];
		
		for( var i = 0, max = arguments.length ; i < max ; ++i )
		{
			var result2 = arguments[i];
			json2.push(result2[0]);
			statuses2.push(result2[1]);
			jqXHRResultList2.push(result2[3]);
		}
		
		console.log(json2);
		
		for( var i in json )
		{
			for( var j in json[i].teams )
			{
				document.write("======= TEAM " + j + "=====<br>");
				document.write("name : " + json[i].teams[j].name);
				document.write("<br>");
				document.write("logo url : " + json[i].teams[j].logoUrl);
				document.write("<br>");
			}
		}
	});

	$.when.apply(null, jqXHRList2).fail(function ()
	{
		for( var i = 0 ; i < jqXHRList2.length ; ++i )
		{
			if( jqXHRList2[i].statusText === "error" )
			{
				errorDlg(request2[i].error_id);
			}
		}
	});
	
	console.log("END");
/*
	var match = new Array();
	var tournament = new Array();
	var bracket = new Array();
	var games = new Array();
	gameRealm = new Array();
	var gameId = new Array();

	for( var i in json["scheduleItems"] )
	{
		match.push(json["scheduleItems"][i].match);
		tournament.push(json["scheduleItems"][i].tournament);
		bracket.push(json["scheduleItems"][i].bracket);
//              console.log(json["scheduleItems"][i].match);
	}

	console.log("highlanderTournaments");
	console.log(json["highlanderTournaments"]);
	for( var i in json["highlanderTournaments"][0].brackets )
	{
		console.log(json["highlanderTournaments"][0].brackets[i]);
		for( var j in json["highlanderTournaments"][0].brackets[i].matches )
		{
		    for( var k in json["highlanderTournaments"][0].brackets[i].matches[j].games )
		    {
//			console.log(json["highlanderTournaments"][0].brackets[i].matches[j].games[k]);
		        games.push(k);
//			console.log(json["highlanderTournaments"][0].brackets[i].matches[j].games[k].gameRealm);
//			console.log(json["highlanderTournaments"][0].brackets[i].matches[j].games[k].gameId);
		        gameRealm.push(json["highlanderTournaments"][0].brackets[i].matches[j].games[k].gameRealm);
		        gameId.push(json["highlanderTournaments"][0].brackets[i].matches[j].games[k].gameId);
		    }
		}
	}
	
	var path = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=" + tournament[0] + "&matchId=" + match[0];
	
	console.log(path);
	
	$.ajax(
	{
		url: path,
		type: 'GET',
		dataType: 'json',
		scriptCharset: 'utf-8',
		data: {},

		success: function (json)
		{
			console.log("highlanderMatchDetails : success");
			console.log(json);
			console.log(gameRealm);
			var gameHash = json["gameIdMappings"][0].gameHash;
//			console.log(gameHash);
			console.log("http://matchhistory.na.leagueoflegends.com/en/#match-details/" + gameRealm[0] + "/" + gameId[0] +"?gameHash=" + gameHash );
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
*/

});

$.when.apply(null, jqXHRList).fail(function ()
{
	for( var i = 0 ; i < jqXHRList.length ; ++i )
	{
		if( jqXHRList[i].statusText === "error" )
		{
			errorDlg(request[i].error_id);
		}
	}
});

////////////////////////////////////////////////////////////////////////////////////
}
else
{
}


function ShowscheduleItem(index,data)
{
	var target = document.getElementById("scheduleItem_list");
	var newTag;
	
	newTag = document.createElement("scheduleItem_list_"+index);
	
	var tag = new Array();
	var url = "http://api.lolesports.com/api/v1/scheduleItems?leagueId=" + index;
	
	tag.push("<a href="+url+" TARGET=\"_blank\">"+url+"</a>");
	tag.push("<br>");
	
	for(var i = 0 ; i < data.highlanderTournaments.length ; ++i)
	{
		var tn_data = data.highlanderTournaments[i];
		
		tag.push("startDate : " + tn_data.startDate + "<br>");
		tag.push("トーナメント名 : " + tn_data.description +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		tag.push("title : " + tn_data.title +"<br>");
	}
	newTag.innerHTML = tag.join("");
	
	target.appendChild(newTag);
}

function GetscheduleItemJson(index)
{
	$.ajax(
	{
		url: "http://api.lolesports.com/api/v1/scheduleItems?leagueId=" + index,
		type: 'GET',
		dataType: 'json',
		scriptCharset: 'utf-8',
		data: {},
		
		success: function (json)
		{
			console.log("scheduleItem : Success " + index);
			
			console.log(json);
			ShowscheduleItem(index,json);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			console.log("scheduleItem : Fail");
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function GetMatch(start_id, diff_num)
{
	for( var i = start_id ; i < (start_id + diff_num) ; i++ )
	{
		GetscheduleItemJson(i);
	}
}
