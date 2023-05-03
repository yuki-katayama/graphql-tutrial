const { ApolloServer, gql } = require("apollo-server");

const books = [
	{
		title: "タイトル1",
		author: "著者1"
	},
	{
		title: "タイトル2",
		author: "著者2"
	},
	{
		title: "タイトル3",
		author: "著者3"
	},
]

const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		test: [Book]
	}
`;

const resolvers = {
	Query: {
		test: () => books,
	}
};

const server = new ApolloServer({
	typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});