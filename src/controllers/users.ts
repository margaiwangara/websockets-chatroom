const db = require("../models");
import { GraphQLString, GraphQLObjectType } from "graphql";

const User: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUsers: {
      type: User,
      resolve() {
        return db.User.find().then;
      }
    }
  }
});
