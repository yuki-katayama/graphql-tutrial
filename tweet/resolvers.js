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
		async addTweet(person, argument, { pubsub }) {
			const tweet = new Tweet(argument);
			tweet.person = argument.person;
			await tweet.save();
			pubsub.publish("TWEET_ADDED", {
				tweetAdded: tweet
			});
			return tweet;
		},
		async deleteTweet(parent, argument) {
			const tweet = await Tweet.findById(argument.tweet);
			if (!tweet) throw new Error("Tweets not found");
			await Tweet.deleteOne({ _id: argument.tweet });
			return tweet;
		}
	},
	Subscription: {
		tweetAdded: {
			async subscribe(parent, argument, { pubsub }) {
				return pubsub.asyncIterator("TWEET_ADDED");
			}
		}
	},
	Tweet: {
		likes(parent){
			if (parent._id == "645e79b0adbc47177e2c0e1d") {
				return 10;
			}
			return 0;
		},
		async person(tweet) {
			const person = await Person.findById(tweet.person);
			return person;
		}
	},
	Person: {
		async tweets(parent) {
			const tweets = await Tweet.find({person: parent._id});
			return tweets;
		}
	}
}