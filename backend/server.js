const { ApolloServer, gql } = require("apollo-server");

/**
 * @typedef Book
 * @property {string} title
 * @property {string} author
 */
const books = [
	{
		__typename: "Book",
		title: "タイトル1",
		author: "著者1"
	},
	{
		__typename: "Book",
		title: "タイトル2",
		author: "著者2"
	},
	{
		__typename: "Book",
		title: "タイトル3",
		author: "著者3"
	},
]

/**
 * @typedef Movie
 * @property {string} title
 * @property {string} director
 */
const movies = [
	{
		__typename: "Movie",
		title: "動画1",
		author: "著者1(動画)"
	},
	{
		__typename: "Movie",
		title: "動画2",
		author: "著者2(動画)"
	},
	{
		__typename: "Movie",
		title: "動画3",
		author: "著者3(動画)"
	},
]

const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Movie {
		title: String
		author: String
	}

  # Union型を定義することで、複数の型をまとめて扱えるようになります
	union SearchResult = Book | Movie

	type Query {
		search: [SearchResult]
	}
`;

const resolvers = {
	Query: {
		search: () => [...books, ...movies],
	},
};


const server = new ApolloServer({
	typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});