class Tournament {

    constructor()
    {
    }

    ////////////////////////////////////////////////////////////////////////////////////
    
    GetMatchs(start_id, diff_num)
    {
        for(let i = start_id ; i < (start_id + diff_num) ; ++i)
        {
            this.GetscheduleItemsJson(i);
        }
    }

    GetscheduleItemsJson(id)
    {
        let self = this;

        $.ajax(
        {
            url: `http://api.lolesports.com/api/v1/scheduleItems?leagueId=${id}`,
            type: 'GET',
            dataType: 'json',
            scriptCharset: 'utf-8',
            data: {},
            
            success: function (json)
            {
                console.log(`scheduleItem : Success ${id}`);
                console.log(json);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                self.ShowscheduleItem(id,json);
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
    
    ////////////////////////////////////////////////////////////////////////////////////

    ShowscheduleItem(index, data)
    {
        let target = document.getElementById("scheduleItem_list");
        let newTag;
        
        newTag = document.createElement(`scheduleItem_list_${index}`);
        newTag.id = "scheduleItem_list_"+index;

        let tag = new Array();
        let url = `http://api.lolesports.com/api/v1/scheduleItems?leagueId=${index}`;
        
        tag.push("<a href="+url+" TARGET=\"_blank\">"+url+"</a>");
        tag.push("<br>");
        
        let scheduleItem = {};

        for(let i = 0 ; i < data.highlanderTournaments.length ; ++i)
        {
            const tn_data = data.highlanderTournaments[i];
            const tn_id = data.highlanderTournaments[i].id;

            if(tn_data.startDate === undefined)
                continue;

            
            const yearFilter = $('#yearFilter')[0].value;

            if(yearFilter != -1)
            {
                if(tn_data.description.indexOf(yearFilter) == -1 && tn_data.title.indexOf(yearFilter) == -1)
                    continue;
            }

            if(scheduleItem[tn_id] === undefined)
                scheduleItem[tn_id] = {};
            
            scheduleItem[tn_id].startDate = tn_data.startDate;
            scheduleItem[tn_id].description = tn_data.description;
            scheduleItem[tn_id].title = tn_data.title;
            
            for(let j in data.highlanderTournaments[i].brackets)
            {
                for(let k in data.highlanderTournaments[i].brackets[j].matches)
                {
                    const match_id = data.highlanderTournaments[i].brackets[j].matches[k].id;

                    let isUpdate = true;
                    for(let l in data.scheduleItems)
                    {
                        if(data.scheduleItems[l].match == match_id)
                        {
                            const scheduleKey = data.scheduleItems[l].scheduledTime;
                            const searchIndex = scheduleKey.search("T");
                            const key = scheduleKey.substr(0,searchIndex+3);
                            const time = scheduleKey.substr(0,searchIndex);
                            
                            if( scheduleItem[tn_id][time] === undefined )
                            {
                                scheduleItem[tn_id][time] = {};
                            }

                            scheduleItem[tn_id][time][key] = {};
                            scheduleItem[tn_id][time][key].match_id = match_id;
                            isUpdate = false;
                        }
                    }

                    if(isUpdate)
                    {
                        const time = "0000-00-00";
                        if(scheduleItem[tn_id][time] === undefined)
                        {
                            scheduleItem[tn_id][time] = {};
                        }
                    }

                    for(let l in data.highlanderTournaments[i].brackets[j].matches[k].games)
                    {
                        let game_id = data.highlanderTournaments[i].brackets[j].matches[k].games[l].gameId;
                        const game_realm = data.highlanderTournaments[i].brackets[j].matches[k].games[l].gameRealm;
                        const game_name = data.highlanderTournaments[i].brackets[j].matches[k].games[l].name;
                        const id = data.highlanderTournaments[i].brackets[j].matches[k].games[l].id;

                        let match_name = data.highlanderTournaments[i].brackets[j].matches[k].name;
                        match_name = match_name == undefined ? "" : match_name;

                        if(game_id === undefined || game_realm === undefined)
                            continue;

                        game_id = game_id.trim();

                        for(let tn in scheduleItem)
                        {
                            for(let tm in scheduleItem[tn])
                            {
                                for(let key in scheduleItem[tn][tm])
                                {
                                    if(scheduleItem[tn][tm][key].match_id == match_id)
                                    {
                                        if(scheduleItem[tn][tm][key].games === undefined)
                                            scheduleItem[tn][tm][key].games = new Array();

                                        if(scheduleItem[tn][tm][key].games[game_name] === undefined)
                                            scheduleItem[tn][tm][key].games[game_name] = {};

                                        scheduleItem[tn][tm][key].games[game_name].game_id = game_id;
                                        scheduleItem[tn][tm][key].games[game_name].game_realm = game_realm;
                                        scheduleItem[tn][tm][key].games[game_name].match_name = `${match_name}_${game_name}`;
                                        scheduleItem[tn][tm][key].games[game_name].id = id;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // ソート
        for(let tnId in scheduleItem)
        {
            for(let day in scheduleItem[tnId])
            {
                if(day == "description" || day == "startDate" || day == "title")
                    continue;
                
                for(let time in scheduleItem[tnId][day])
                {
                    scheduleItem[tnId][day][time].games = this.ObjectSort(scheduleItem[tnId][day][time].games);
                }
                scheduleItem[tnId][day] = this.ObjectSort(scheduleItem[tnId][day]);
            }
            scheduleItem[tnId] = this.ObjectSort(scheduleItem[tnId]);
        }

        for(let tnId in scheduleItem)
        {
            let newTnTag = document.createElement(`tn_${tnId}`);
            newTnTag.id = tnId;
            const startDate = scheduleItem[tnId].startDate;

			let tntag = new Array();
			tntag.push(`startDate : ${startDate}<br>`);
			tntag.push("トーナメント名 : " + scheduleItem[tnId].description +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			tntag.push("title : " + scheduleItem[tnId].title +"<br>");

			newTnTag.innerHTML = tntag.join("");
            
            for(let day in scheduleItem[tnId])
            {
                if(day == "description" || day == "startDate" || day == "title")
                    continue;
                
                let newDayTarget = document.createElement(`day_${day}`);
                newDayTarget.id = day;
                newDayTarget.innerHTML = `GameDay : ${day}<br>`;

                for(let time in scheduleItem[tnId][day])
                {
                    let newTimeTarget = document.createElement(`time_${time}`);
                    newTimeTarget.id = time;

                    for(let gameName in scheduleItem[tnId][day][time].games)
                    {
                        const gameHashId = scheduleItem[tnId][day][time].games[gameName].id;
                        const gameId = scheduleItem[tnId][day][time].games[gameName].game_id;
                        const gameRealm = scheduleItem[tnId][day][time].games[gameName].game_realm;
                        const matchName =scheduleItem[tnId][day][time].games[gameName].match_name;
                        const matchId = scheduleItem[tnId][day][time].match_id;

                        let newGameTarget = document.createElement(`game_${gameHashId}`);
                        newGameTarget.id = gameHashId;

                        newTimeTarget.appendChild(newGameTarget);

                        this.GethighlanderMatchDetailsJson(tnId, matchId, gameRealm, gameId, gameHashId, matchName);
                    }

                    newDayTarget.appendChild(newTimeTarget);
                }

                newTnTag.appendChild(newDayTarget);
            }

            newTag.appendChild(newTnTag);
        }

        newTag.innerHTML = tag.join("") + newTag.innerHTML;
        
        target.appendChild(newTag);
    }

    GethighlanderMatchDetailsJson(tn_id, match_id, game_realm, game_id, game_hashId, match_name)
    {
        const self = this;
        const path = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=" + tn_id + "&matchId=" + match_id;

        $.ajax(
        {
            url: path,
            type: 'GET',
            dataType: 'json',
            scriptCharset: 'utf-8',
            data: {},

            success: function (json)
            {
                for(let i = 0 ; i < json.gameIdMappings.length ; ++i)
                {
                    if(json.gameIdMappings[i].id == game_hashId)
                    {
                        const gameHash = json.gameIdMappings[i].gameHash;
                        const url = "http://matchhistory.na.leagueoflegends.com/en/#match-details/" + game_realm + "/" + game_id +"?gameHash=" + gameHash;
                        self.ShowMatchDetailsURL( tn_id, game_hashId, match_name, url);
                    }
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

    ShowMatchDetailsURL(tn_id, game_hashId, march_name, url)
    {
        let target = $(`#${tn_id} #${game_hashId}`)[0];
        let tag = new Array();
        
        tag.push("<a href="+url+" TARGET=\"_blank\">"+url+"</a> name : " + march_name);
        tag.push("<br>");
        
        target.innerHTML = tag.join("");
    }

    ObjectSort(object)
    {
        let sorted = {};
        let array = [];

        for (let key in object)
        {
            if (object.hasOwnProperty(key))
                array.push(key);
        }
        //配列のソート
        array.sort(); 
     
        for (let i = 0 ; i < array.length ; ++i)
        {
            sorted[array[i]] = object[array[i]];
        }
        
        return sorted;
    }
}

let tournament = new Tournament();
