import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'

const users = [
   { id:"1", name: " Abhi Yadav", age: 20, isMarried: false },
   { id:"2", name:"John Doe", age:30, isMarried: true },
   { id:"3", name:"Johnny Papa", age:22, isMarried: true },
   { id:"4", name:"Jane Simth", age:34, isMarried: false },    
]

const typeDefs = `
    type Query {
      getUsers: [User]
      getUserById(id: ID!): User
    }

    type Mutation {
      createUser(name: String!, age: Int!, isMarried: Boolean!): User 
    }

    type User {
      id: ID
      name:String
      age: Int
      isMarried: Boolean   
    }

`;

const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        },
        getUserById: (parent, args) => {
          const id = args.id
          return users.find((user) => user.id === id);
        }
    },
    Mutation: {
      createUser: (parent, args) => {
        const { name, age, isMarried } = args;
        const newUser = {
          id: (user.length + 1).toString(),
          name,
          age,
          isMarried
        };
        users.push(newUser)
      },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 }
})

console.log(` Server Running at: ${url} `)

//Query, Mutation
//typeDefs, resolvers