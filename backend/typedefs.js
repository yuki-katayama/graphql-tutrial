const { ApolloServer, gql } = require("apollo-server");

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

	  # 追加: Subscription
	type Subscription {
		bookAdded: BookModel
		movieAdded: MovieModel
	}
`;

module.exports = {
		typeDefs,
}