const Person = require("./models/person")
const Tweet = require("./models/tweet")

module.exports = {
	Query: {
		async people() {
			const people = await Person.find();
			return people;
		},
		async latestTweets() {
			const tweets = await Tweet.find();
			return tweets;
		}
	},
	Mutation: {
		async addPerson(parent, argument) {
			const person = new Person(argument);
			await person.save();
			return person;
		},
		async addTweets(person, argument) {
			const tweet = new Tweet(argument);
			tweet.person = argument.person;
			await tweet.save();
			return tweet;
		},
		async deleteTweet(parent, argument) {
			const tweet = await Tweet.findById(argument.tweet);
			if (!tweet) throw new Error("Tweets not found");
			await tweet.delete();
			return tweet;
		}
	}
}