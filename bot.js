var Twit = require('twit');
var Bot = new Twit({
	consumer_key: 'z1Psa3Jot23hxjhk2kXKskj5e',
	consumer_secret: '56XSi5os3lnVGMuM6B0qcA2sk7i0bGleK5OtOqdoQ59mYaU2DP',
	access_token: '4578654927-DzZTse7J5NiPLVHGXo9vhIsULwMwxsKAABioP0H',
	access_token_secret: 'WxPPU7oEAhJ5x8RacDkylygfc7WGlszw1fTghPapvs2VC'
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