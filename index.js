var SlackBot = require('slackbots');
var token_data = require('./priv-data');
var sqsp_url = `https://1jkhm1drpysj.statuspage.io/api/v2/summary.json`

create a bot
See npmjs.com/package/slackbots
var bot = new SlackBot({
  token: token_data[0],
  name: 'Squarestatus'
});

console.log(token_data[0]);


// Save token "securely" (at least not push it to GitHub)

// Call status page end point at https://1jkhm1drpysj.statuspage.io/api/v2/summary.json
// Store response
// Parse response looking for statuses of V5 and V7

// Logic to check for status 
