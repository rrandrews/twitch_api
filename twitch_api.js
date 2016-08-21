streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck",
            "habathcx", "RobotCaleb", "noobs2ninjas", "LotharHS", "brunofin"];

$(document).ready(function() {

  $.when(queryTwitch(streamers)).then(
    function(data) { updateTable(data); },
    function(data) { alert(data.status); }
  );

});

function queryTwitch(channels) {
  query = "https://api.twitch.tv/kraken/streams?channel=" + channels.join();
  console.log(query);
  return $.ajax(query);
}


function queryChannel(channel) {
  query = "https://api.twitch.tv/kraken/streams/" + channel;
  return $.ajax(query);
}

function updateTable(data) {
  var offlineStreamers = streamers;
  var html = '';
  $.each(data.streams, function(index, value) {
    offlineStreamers.splice(offlineStreamers.indexOf(this.channel.display_name), 1);
    html += '<tr><td><img class="logo" src="' + this.channel.logo + '"></td>' +
            '<td><a href="' + this.channel.url + '">' +
            this.channel.display_name + '</a></td>' +
            '<td>' + this.channel.status + '</td></tr>';
  })
  $("#streams-tbody").html(html);

  $.each(offlineStreamers, function(index, channelName) {
    html += '<tr><td></td><td>';
    $.when(queryChannel(channelName)).then(
      function(data) {
        $("#streams-tbody").append('<tr><td></td><td>' +
                  '<a href="' + data._links.channel + '">' + channelName +
                  '</a></td><td>Offline</td></tr>'); },
      function(failure) {
        $("#streams-tbody").append('<tr><td></td><td>' + channelName +
                  '</td><td>Channel does not exist!</td></tr>'); }
    );
  });


}
