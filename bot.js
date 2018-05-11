var Twit = require('twit');
var Bot = new Twit({
	consumer_key: 'xxxxxxxx',
	consumer_secret: 'xxxxx',
	access_token: 'xxxxx',
	access_token_secret: 'xxxxx'
});
console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	var stream = Bot.stream('statuses/filter', { follow : ['2253635809', '2512683048'] });
	stream.on('tweet', function (tweet, err) {
    retweet(tweet.id_str);
	})
}
// Retweet
function retweet(id) {
	Bot.post(`statuses/retweet/:id`, {id : id}, BotRetweeted);

	function BotRetweeted(error, response) {
		if (error) {
			console.log('Bot could not retweet, : ' + error);
		}
		else {
			console.log('Bot retweeted : ' + id);
		}
	}

	Bot.post('favorites/create', {id: id}, function(err, response){
		// if there was an error while 'favorite'
		if(err){
		console.log('CANNOT BE FAVORITE... Error');
		}
		else{
		console.log('FAVORITED... Success!!!');
		}
	});
}
BotInit();
