const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolver")

const MONGODB = "mongodb://localhost:27017";

(async function () {
	const app = express();
	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	})

	const subscriptionServer = SubscriptionServer.create(
		{schema, execute, subscribe },
		{ server: httpServer, path: "/graphql" }
	)

	const server = new ApolloServer({
		schema,
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						}
					}
				}
			}
		]
	})
	await server.start();
	server.applyMiddleware({app})

	mongoose.connect(MONGODB, {useNewUrlParser: true});
	const PORT = 4000;
	httpServer.listen(PORT, () =>
	console.log("server is now running on " + PORT)
	)
	console.log("hello")
})();