const {ApolloServer} = require("apollo-server")
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const context = require("./context");

mongoose.connect("mongodb://localhost:27017/twitter", {
	useNewUrlParser: true,
})

const PORT = 8080;
const server = new ApolloServer({
	typeDefs: require("fs").readFileSync("./schema.gql").toString(),
	resolvers,
	context,
	subscriptions: {
		'graphql-ws': true,
		'subscriptions-transport-ws': true,
	},
});

server.listen(PORT).then(() => {
	console.log(PORT + " listening")
});