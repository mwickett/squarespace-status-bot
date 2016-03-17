const https = require('https');

var SlackBot = require('slackbots');
var token_data = require('./priv-data');
var sqsp_url = "https://1jkhm1drpysj.statuspage.io/api/v2/summary.json";
var bad_url = "https://1jkhm1rpysj.statuspage.io/api/v2/summary.json";

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
function check(url) {
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
          var status = statusResponse.status.description;
          var message = "Squarespace says: " + status;
          console.log(message);
          bot.postMessageToUser('mike', message);
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

check(sqsp_url);
