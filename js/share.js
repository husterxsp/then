(function(){
    var query = {current_story_id: 0, up_number: -1, down_number: 1, user_id: -1};
    query["current_story_id"] = getArgs()["current_story_id"];

    $.ajax({
        type: 'POST',
        url: 'http://sb.hustonline.net/api/reach_node.php',
        data: query,
        dataType: 'json',
        success: function(res){
            var story = res.data || [];
            appendStory(story);
            console.log(story);
        }
    });
}());

function getArgs(){
    var args = {};
    var query = document.location.search.substring(1) || "";
    var pairs = query.split("&");
    for(var i = 0; i < pairs.length; i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos+1);
        args[name] = value;
    }
    return args;
}

function appendStory(story){
    var appendHtml = "";
    for(var i = 0; i < story.length; i++){
        appendHtml  += '<li class="story_list"><p class="story_content">' 
                    + story[i]["content"] + '</p></li>';
    }
    if( !appendHtml ) {
        appendHtml += '<li class="story_list"><p class="story_content">这里还没有故事哦，快去开启属于你的新故事吧~</p></li>';
    }
    $("ul").append(appendHtml);
}