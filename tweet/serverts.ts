import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';


// This `app` is the returned value from `express()`.
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
// ...
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

  const resolvers = {
	Subscription: {
	  hello: {
		// Example using an async generator
		subscribe: async function* () {
		  for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
			yield { hello: word };
		  }
		},
	  },
	  postCreated: {
		// More on pubsub below
		subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
	  },
	},
	// ...other resolvers...
  };


const pubsub = new PubSub();