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

function ShowMatchDetailsURL( region_id, url, march_name, gameHash)
{
	var target = document.getElementById("scheduleItem_list_"+region_id);
	var newTag;
	
	newTag = document.createElement("match_detail_list_" + gameHash);
	
	var tag = new Array();
	
	tag.push("<a href="+url+" TARGET=\"_blank\">"+url+"</a> name : " + march_name);
	tag.push("<br>");
	
	newTag.innerHTML = tag.join("");
	
	target.appendChild(newTag);
}

function GethighlanderMatchDetailsJson( region_id, tn_id, match_id, game_realm, game_id, match_name)
{
	var path = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=" + tn_id + "&matchId=" + match_id;
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
//			console.log(json);

//			for( var i = 0 ; i < json.gameIdMappings.length ; ++i )
			if( json.gameIdMappings.length > 0 )
			{
				var gameHash = json.gameIdMappings[0].gameHash;
				var url = "http://matchhistory.na.leagueoflegends.com/en/#match-details/" + game_realm + "/" + game_id +"?gameHash=" + gameHash;
//				console.log( url );
				ShowMatchDetailsURL(region_id, url, match_name, gameHash);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ShowscheduleItem(index, data)
{
	var target = document.getElementById("scheduleItem_list");
	var newTag;
	
	newTag = document.createElement("scheduleItem_list_"+index);
	newTag.id = "scheduleItem_list_"+index;

	var tag = new Array();
	var url = "http://api.lolesports.com/api/v1/scheduleItems?leagueId=" + index;
	
	tag.push("<a href="+url+" TARGET=\"_blank\">"+url+"</a>");
	tag.push("<br>");
	
	for(var i = 0 ; i < data.highlanderTournaments.length ; ++i)
	{
		var tn_data = data.highlanderTournaments[i];
		
		if( tn_data.description.indexOf("2017") != -1 ? true : false ||
			tn_data.title.indexOf("2017") != -1 ? true : false
		)
		{
			tag.push("startDate : " + tn_data.startDate + "<br>");
			tag.push("トーナメント名 : " + tn_data.description +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			tag.push("title : " + tn_data.title +"<br>");

			var tn_id = data.highlanderTournaments[i].id;

			for( var j in data.highlanderTournaments[i].brackets )
			{
				for( var k in data.highlanderTournaments[i].brackets[j].matches)
				{
					var match_id = data.highlanderTournaments[i].brackets[j].matches[k].id;
					for( var l in data.highlanderTournaments[i].brackets[j].matches[k].games)
					{
						var game_id = data.highlanderTournaments[i].brackets[j].matches[k].games[l].gameId;
						var game_realm = data.highlanderTournaments[i].brackets[j].matches[k].games[l].gameRealm;
						var match_name = data.highlanderTournaments[i].brackets[j].matches[k].name;
						match_name = match_name == undefined ? "" : match_name;
						
						if( game_id != undefined && game_realm != undefined)
							GethighlanderMatchDetailsJson( index, tn_id, match_id, game_realm, game_id, match_name);
					}
				}
			}
		}
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

var MATCH_HISTORY_JSON = {};

function GetURL(url)
{
	var index = url.search("#");
	url = url.substr(index);
	index = url.search("/");
	url = url.substr(index+1);
	index = url.search("/");

	var gameRealm = url.substr(0, index);

	url = url.substr(index+1);
	index = url.search('[\?]');

	var gameId = url.substr(0, index);

	url = url.substr(index+1);
	index = url.search('=');
	url = url.substr(index+1);
	index = url.search('&');
	
	if( index != -1)
		url = url.substr(0, index);
	
	var gameHash = url;

	/*
	$.ajax(
	{
//		url: "http://matchhistory.na.leagueoflegends.com/en/#match-details/TRKR1/890266?gameHash=ab79c17ca6b4d876&tab=overview",
		url: "http://localhost/promatch/Match_History.html",
		type: 'GET',
		dataType: 'html',
		scriptCharset: 'utf-8',
		
		success: function (data)
		{
			console.log("GetURL : Success ");

	        var out_html = $($.parseHTML(data));//parse

			console.log(out_html);
			var data_doc = document.createElement("data");
			data_doc.innerHTML = data;

			var common_classList = ".section-wrapper .section-wrapper-content .section-wrapper-content-wrapper #main .viewport";
			var match_data = data_doc.querySelector(common_classList + " .game-header .map-header-content");
			var game_data = data_doc.querySelector(common_classList).getElementsByClassName("default-1-2");
			
			GetMatchData(match_data);
			GetGameData(game_data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			console.log("GetURL : Fail");
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	*/

	url_path = "https://acs.leagueoflegends.com/v1/stats/game/" + gameRealm + "/" + gameId + "?gameHash=" + gameHash;

	$.ajax(
	{
		url: url_path,
		type: 'GET',
		dataType: 'json',
		scriptCharset: 'utf-8',
		
		success: function (data)
		{
			console.log("GetURL : Success");
			console.log(data);

			MATCH_HISTORY_JSON.game = {};

			MATCH_HISTORY_JSON.game = GetMatchData2(data);
			MATCH_HISTORY_JSON.teams = [];
			MATCH_HISTORY_JSON.teams = GetTeamData2(data);

			console.log(MATCH_HISTORY_JSON);
/*
	        var out_html = $($.parseHTML(data));//parse

			console.log(out_html);
			var data_doc = document.createElement("data");
			data_doc.innerHTML = data;

			var common_classList = ".section-wrapper .section-wrapper-content .section-wrapper-content-wrapper #main .viewport";
			var match_data = data_doc.querySelector(common_classList + " .game-header .map-header-content");
			var game_data = data_doc.querySelector(common_classList).getElementsByClassName("default-1-2");
			
			GetMatchData(match_data);
			GetGameData(game_data);
*/

		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			console.log("GetURL : Fail");
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	
/*
	var a = new Ajax.Updater( 
		"container", 
		"http://matchhistory.na.leagueoflegends.com/proxy2.hq.scei.sony.co.jp:10080/en/#match-details/TRKR1/890266?gameHash=ab79c17ca6b4d876&tab=overview", 
		{ 
			"method": "get", 
			"parameters": "a=b&c=d&e=f", 
			onSuccess: function(request) { 
				// 成功時の処理を記述 
				alert('成功しました'); 
				// jsonの値を処理する場合↓↓ 
				  var json; 
				  eval("json="+request.responseText); 
			}, 
			onComplete: function(request) { 
				// 完了時の処理を記述 
				alert('読み込みが完了しました'); 
				// jsonの値を処理する場合↓↓ 
				//  var json; 
				//  eval("json="+request.responseText); 
			}, 
			onFailure: function(request) { 
				alert('読み込みに失敗しました'); 
			}, 
			onException: function (request) { 
				alert('読み込み中にエラーが発生しました'); 
			} 
		}
	); 
*/
}

function GetMatchData(data)
{
	var game_mode = data.querySelector(".map-header-mode .binding").innerText;
	var game_queue = data.querySelector(".map-header-queue .binding").innerText;
	var game_time = data.querySelector(".map-header-duration .binding").innerText;
	var game_date = data.querySelector(".map-header-date .binding").innerText;

	MATCH_HISTORY_JSON.game = {};

	MATCH_HISTORY_JSON.game.mode = game_mode;
	MATCH_HISTORY_JSON.game.queue = game_queue;
	MATCH_HISTORY_JSON.game.time = game_time;
	MATCH_HISTORY_JSON.game.date = game_date;
	
	console.log(MATCH_HISTORY_JSON);
}

function GetGameData(data)
{
	var blue = data[0];
	var red = data[1];

	MATCH_HISTORY_JSON.team = [];
	MATCH_HISTORY_JSON.team[0] = GetTeamData(blue);
	MATCH_HISTORY_JSON.team[1] = GetTeamData(red);

	console.log(MATCH_HISTORY_JSON);
}

function GetTeamData(data)
{
	var set_data = {};
	var team_data = data.getElementsByClassName("gs-container team-summary")[0];

	set_data.winText = team_data.getElementsByClassName("game-conclusion")[0].innerText;
	set_data.winText = set_data.winText.replace( / /g, "");
	set_data.gold = team_data.getElementsByClassName("gold")[0].innerText;
	set_data.kill = team_data.getElementsByClassName("kills")[0].innerText | "0";

	var player_data_list = data.getElementsByClassName("classic player");
	set_data.player = SetPlayerData(player_data_list);

	//Ban
	set_data.ban = [];
	for( var i = 0 ; i < data.getElementsByClassName("bans")[0].getElementsByClassName("champion-nameplate").length ; ++i )
	{
		set_data.ban[i] = $(data.getElementsByClassName("bans")[0].getElementsByClassName("champion-icon binding")[i].getElementsByTagName("div")[0]).data('rgId');
	}

	set_data.tower = data.getElementsByClassName("tower-kills")[0].innerText | 0;
	set_data.inhibitor = data.getElementsByClassName("inhibitor-kills")[0].innerText | 0;
	set_data.tower = data.getElementsByClassName("tower-kills")[0].innerText | 0;
	set_data.dragon = data.getElementsByClassName("dragon-kills")[0].innerText | 0;
	set_data.rift_herald = data.getElementsByClassName("rift-herald-kills")[0].innerText | 0;

	return set_data;
}

function SetPlayerData(list)
{
	var set_data = [];

	for( var i = 0 ; i < list.length ; ++i )
	{
		set_data[i] = {};
		set_data[i].championName = $(list[i].getElementsByClassName("champion-icon binding")[0].getElementsByTagName("div")[0]).data('rgId');
		set_data[i].lv = list[i].querySelector(".champion-nameplate-level div").innerText | 0;
		// Spell
		set_data[i].spell = [];
		for(var j = 0 ; j < list[i].getElementsByClassName("spell-icon binding").length ; ++j)
			set_data[i].spell[j] = $(list[i].getElementsByClassName("spell-icon binding")[j].getElementsByTagName("div")[0]).data('rgId');
		
		set_data[i].playerName = list[i].getElementsByClassName("champion-nameplate-name")[0].getElementsByTagName("span")[0].innerText;
		set_data[i].kills = list[i].getElementsByClassName("kda-kda")[0].getElementsByClassName("binding")[0].innerText | 0;
		set_data[i].death = list[i].getElementsByClassName("kda-kda")[0].getElementsByClassName("binding")[1].innerText | 0;
		set_data[i].assists = list[i].getElementsByClassName("kda-kda")[0].getElementsByClassName("binding")[2].innerText | 0;
		// Item
		set_data[i].item = [];
		for(var j = 0 ; j < list[i].getElementsByClassName("gs-container gs-no-gutter default-3-col inventory-items")[0].getElementsByClassName("item-icon binding").length ; ++j)
			set_data[i].item[j] = $(list[i].getElementsByClassName("gs-container gs-no-gutter default-3-col inventory-items")[0].getElementsByClassName("item-icon binding")[j].getElementsByTagName("div")[0]).data('rgId') | 0;
		
		set_data[i].cs = list[i].getElementsByClassName("minions-col cs")[0].getElementsByTagName("div")[0].innerText | 0;
		set_data[i].gold = list[i].getElementsByClassName("gold-col gold")[0].getElementsByTagName("div")[0].innerText;		
	}

	return set_data;
}

function GetMatchData2(data)
{
	var set_data = {};

	set_data.gameVer = data.gameVersion;
	
	return set_data;
}

function GetTeamData2(data)
{
	var set_data = [];

	for( var i = 0 ; i < 2 ; ++i )
	{
		set_data[i] = {};
		set_data[i] = SetTeamDataCommon(data.teams[i]);
		set_data[i].player = [];
		set_data[i].player = GetPlayerData(data, set_data[i].teamId);

		set_data[i].kill = 0;
		set_data[i].gold = 0;
		
		for( var j = 0 ; j < set_data[i].player.length ; ++j )
		{
			set_data[i].kill += set_data[i].player[j].kill;
			set_data[i].gold += set_data[i].player[j].gold;
		}

		var tag = set_data[i].player[0].name;
		var index = tag.search(" ");
		tag = tag.substr(0, index);

		set_data[i].team_name = tag;
	}

	return set_data;
}

function SetTeamDataCommon(data)
{
	var set_data = {};

	set_data.tower = data.towerKills;
	set_data.dragon = data.dragonKills;
	set_data.baron = data.baronKills;
	set_data.rift_herald = data.riftHeraldKills;
	set_data.inhibitor = data.inhibitorKills;
	set_data.ban = data.bans;
	set_data.win = data.win === "Win" ? true : false;
	set_data.teamId = data.teamId;

	return set_data;
}

function GetPlayerData(data, teamId)
{
	var set_data = [];

	for( var i = 0, index = 0 ; i < data.participants.length ; ++i)
	{
		if( teamId == data.participants[i].teamId )
		{
			set_data[index] = {};
			set_data[index].participantId = data.participants[i].participantId;
			set_data[index].championId = data.participants[i].championId;

			set_data[index].spell = [];
			set_data[index].spell[0] = data.participants[i].spell1Id;
			set_data[index].spell[1] = data.participants[i].spell2Id;

			set_data[index].kill = data.participants[i].stats.kills;
			set_data[index].assiste = data.participants[i].stats.assists;
			set_data[index].death = data.participants[i].stats.deaths;
			set_data[index].gold = data.participants[i].stats.goldEarned;
			set_data[index].cs = data.participants[i].stats.totalMinionsKilled;

			set_data[index].items = [];
			set_data[index].items[0] = data.participants[i].stats.item0;
			set_data[index].items[1] = data.participants[i].stats.item1;
			set_data[index].items[2] = data.participants[i].stats.item2;
			set_data[index].items[3] = data.participants[i].stats.item3;
			set_data[index].items[4] = data.participants[i].stats.item4;
			set_data[index].items[5] = data.participants[i].stats.item5;
			set_data[index].trinket = data.participants[i].stats.item6;

			set_data[index].lane = data.participants[i].timeline.lane;

			for( var j = 0 ; j < data.participantIdentities.length ; ++j )
			{
				if( set_data[index].participantId == data.participantIdentities[j].participantId )
				{
					set_data[index].name = data.participantIdentities[j].player.summonerName;
					break;
				}
			}
			index++;
			continue;
		}
	}

	return set_data;
}