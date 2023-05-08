const { ApolloServer, gql } = require("apollo-server");

/**
 * @typedef BookModel
 * @property {string} title
 * @property {string} author
 */
const books = [
	{
		__typename: "BookModel",
		title: "タイトル1",
		author: "著者1"
	},
	{
		__typename: "BookModel",
		title: "タイトル2",
		author: "著者2"
	},
	{
		__typename: "BookModel",
		title: "タイトル3",
		author: "著者3"
	},
]

/**
 * @typedef MovieModel
 * @property {string} title
 * @property {string} director
 */
const movies = [
	{
		__typename: "MovieModel",
		title: "動画1",
		author: "著者1(動画)"
	},
	{
		__typename: "MovieModel",
		title: "動画2",
		author: "著者2(動画)"
	},
	{
		__typename: "MovieModel",
		title: "動画3",
		author: "著者3(動画)"
	},
]

const typeDefs = gql`
	type BookModel {
		title: String
		author: String
	}

	type MovieModel {
		title: String
		author: String
	}

  	# Union型を定義することで、複数の型をまとめて扱える
	union SearchResult = BookModel | MovieModel

	type Query {
		results(title: String): [SearchResult]
	}

	# 追加部分
	input CreateBookInput {
		title: String!
		author: String!
  	}

	input CreateMovieInput {
		title: String!
		author: String!
	}

	type Mutation {
		# createBook ミューテーションは、新しいBookオブジェクトを作成し、books 配列に追加します。
		createBook(input: CreateBookInput!): BookModel

		# createMovie ミューテーションは、新しいMovieオブジェクトを作成し、movies 配列に追加します。
		createMovie(input: CreateMovieInput!): MovieModel
	}
`;

const resolvers = {
	Query: {
		results: (parent, args) => {
		  const { title } = args;
		  // タイトルが指定されていない場合、すべての結果を返す
		  if (!title) {
			return [...books, ...movies];
		  }
		  // タイトルが指定されている場合、タイトルでフィルタリングする
		  const filteredBooks = books.filter(book => book.title.includes(title));
		  const filteredMovies = movies.filter(movie => movie.title.includes(title));
		  return [...filteredBooks, ...filteredMovies];
		},
	},
	Mutation: {
		// createBook ミューテーションのリゾルバーは、新しいBookオブジェクトを作成し、books 配列に追加します。
		createBook: (parent, args) => {
		  const { input } = args;
		  const newBook = {
			__typename: "BookModel",
			title: input.title,
			author: input.author,
		  };
		  books.push(newBook);
		  return newBook;
		},
		// createMovie ミューテーションのリゾルバーは、新しいMovieオブジェクトを作成し、movies 配列に追加します。
		createMovie: (parent, args) => {
		  const { input } = args;
		  const newMovie = {
			__typename: "MovieModel",
			title: input.title,
			author: input.author,
		  };
		  movies.push(newMovie);
		  return newMovie;
		},
	},
};


const server = new ApolloServer({
	typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});