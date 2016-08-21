streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
            "habathcx", "RobotCaleb", "noobs2ninjas", "LotharHS"];

$(document).ready(function() {
  queryTwitch(streamers);
});

function queryTwitch(channels) {
  query = "https://api.twitch.tv/kraken/streams?channel=" + channels.join();
  console.log(query);
  $.getJSON(query, function(data) {
    $.each(data.streams, function(index, value) {

    })
  });
}

function updateTable(data) {
  $.each(streamers, function(index, value) {

  })
}
