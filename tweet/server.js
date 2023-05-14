const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const context = require("./context");
const express = require("express");

// import { createServer } from 'http';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
const { WebSocketServer } = require('ws');

const { ApolloServer } = require("@apollo/server");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { useServer } = require("graphql-ws/lib/use/ws")
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();


mongoose.connect("mongodb://localhost:27017/twitter", {
  useNewUrlParser: true,
});

const app = express();
const httpServer = createServer(app);
const typeDefs = require("fs").readFileSync("./schema.gql").toString();


const PORT = 8080;
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
	// This is the `httpServer` we created in a previous step.
	server: httpServer,
	// Pass a different path here if app.use
	// serves expressMiddleware at a different path
	path: '/graphql',
  });
  
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
	schema,
	plugins: [
	  // Proper shutdown for the HTTP server.
	  ApolloServerPluginDrainHttpServer({ httpServer }),
  
	  // Proper shutdown for the WebSocket server.
	  {
		async serverWillStart() {
		  return {
			async drainServer() {
			  await serverCleanup.dispose();
			},
		  };
		},
	  },
	],
  });

  httpServer.listen(() => {
	console.log(`Server listening on port ${PORT}`);
	console.log(`GraphQL endpoint: http://localhost:${PORT}/${server.graphqlPath}`);
  });

//   const resolvers = {
// 	Subscription: {
// 	  hello: {
// 		// Example using an async generator
// 		subscribe: async function* () {
// 		  for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
// 			yield { hello: word };
// 		  }
// 		},
// 	  },
// 	  postCreated: {
// 		// More on pubsub below
// 		subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
// 	  },
// 	},
// 	// ...other resolvers...
//   };



// server.listen(PORT).then(() => {
//   console.log(PORT + " listening");
// });
