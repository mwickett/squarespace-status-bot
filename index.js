var SlackBot = require('slackbots');
var token_data = require('priv-data');

//create a bot
// See npmjs.com/package/slackbots
var bot = new SlackBot({
  token: token_data,
  name: 'Squarestatus'
});
