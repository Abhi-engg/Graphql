const express = require('express')
const {} = require("apollo-server")
const {expressMiddleware} = require("@aspollo/server/express4")
const bodyParser = require("body-parser");
const cors = require("cors");

async function startserver() {
    const app = express();
    const server = ne ApolloServer({});

    app.use(bodyParser.json());
    app.use(cors())

    await server.start()

    app.use("/graphql", expressMiddleware(server))
}