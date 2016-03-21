const https = require('https');

var SlackBot = require('slackbots');
var token_data = require('./priv-data');
var sqsp_url = "https://1jkhm1drpysj.statuspage.io/api/v2/summary.json";
var token = ""; // Passte your token here
var target = "tech_notifications"; // Put the name of the channel that you want notifications to go to (ie. general)

//create a bot
//See npmjs.com/package/slackbots
var bot = new SlackBot({
  // Save token "securely" (at least not push it to GitHub)
  token: token_data[0],
  name: 'Squarestatus'
});

//Print out error messages
function printError(error){
    console.error(error.message);
}


// Call status page end point at jkhm1drpysj.statuspage.io/api/v2/summary.json
function check(target, url) {
var request = https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });
  // Store response
    res.on('end', function(){
      if(res.statusCode === 200) {
        try {
          //parse the data
          var statusResponse = JSON.parse(body);
          console.log(statusResponse);
          var label1 = statusResponse.components[0].name;
          var label2 = statusResponse.components[1].name;
          var status1 = statusResponse.components[0].status;
          var status2 = statusResponse.components[1].status;

          if (status1 === "operational" && status2 === "operational") {
            console.log("Good to go");
          } else {
            var message = "Hey Mike & Erin! " + label1 + ": " + status1 + " -- " + label2 + ": " + status2;
            console.log(message);
            bot.postMessageToChannel(target, message);
          }

        } catch(error) {
          //parse error
          printError(error);
        }
      } else {
        //Status code error
        printError({message: "There was an error getting the status "  + https.STATUS_CODES[res.statusCode] });
      }
    });
  }).on('error', printError);
}

check(target, sqsp_url);
