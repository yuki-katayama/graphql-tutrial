const Message = require("../models/Message");
const { PubSub, withFilter } = require("graphql-subscriptions")

const pubsub = new PubSub();

module.exports = {
	Mutation: {
		async createMessage(_, {messageInput: {text, username}}) {
			const newMessage = new Message({
				text: text,
				createdBy: username
			})

			const res = await newMessage.save();
			console.log('New message saved:', res);  // 追加
			pubsub.publish("MESSAGE_CREATED", {
				messageCreated: {
					text: text,
					createdBy: username,
				}
			})
			console.log('MESSAGE_CREATED event published');  // 追加

			return {
				id: res.id,
				...res._doc
			}
		}
	},
	Subscription: {
		messageCreated: {
		  subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED")
		}
	},
	Query: {
		message: (_, {ID}) => {
			console.log(ID);
			const message = Message.findById("6461108aee2f37b608a0cd14").exec()
			console.log(message);
			return message
		}
	}
}