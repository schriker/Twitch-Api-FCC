var streamList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx"];

streamList.forEach(function(streamName){

    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/"+streamName,
        headers: {
            "Client-ID": "u5elyzs2cdmw7khltny7moaxyuaxtl",
        },
        error: function(err){
            console.log(err);
        },
        success: function(result){
            if(result.stream == null){
                offlineStreamInfo(streamName);
            }
            else {
                if(result.stream.channel.logo == null){
                result.stream.channel.logo="https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";
                }
                if(result.stream.channel.status == null){
                result.stream.channel.status="<i>No info</i>";
                }
                $(".main-container").append("<div class=\"stream-list online\"><a href=\""+result.stream.channel.url+"\" target=\"_blank\"></a><img width=\"70px\" height=\"70px\" src=\""+result.stream.channel.logo+"\" alt=\"Thumbnail\"><h2 class=\"stream-title\">"+result.stream.channel.display_name+"</h2><p>"+result.stream.channel.status+"</p></div>");
            }
        },
    });

});

function offlineStreamInfo(offlineStreamName){
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/"+offlineStreamName,
        headers: {
            "Client-ID": "u5elyzs2cdmw7khltny7moaxyuaxtl",
        },
        error: function(err){
            console.log(err);
        },
        success: function(result){
            if(result.logo == null){
                result.logo="https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";
            }
            if(result.status == null){
                result.status="<i>No info</i>";
            }
            $(".main-container").append("<div class=\"stream-list offline\"><a href=\""+result.url+"\" target=\"_blank\"></a><img width=\"70px\" height=\"70px\" src=\""+result.logo+"\" alt=\"Thumbnail\"><h2 class=\"stream-title\">"+result.display_name+"</h2><p>"+result.status+"</p></div>");
        },
    });
}