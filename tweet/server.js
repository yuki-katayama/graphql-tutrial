const {ApolloServer} = require("apollo-server")
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/twitter", {
	useNewUrlParser: true,
})

const PORT = 8080;
const server = new ApolloServer({
	typeDefs: require("fs").readFileSync("./schema.gql").toString(),
	resolvers,

});

server.listen(PORT).then(() => {
	console.log(PORT + " listening")
});