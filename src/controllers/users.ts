import { User, IUserModel } from "../models";
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "UserQuery",
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUsers: {
      type: UserType,
      resolve(parent, args) {
        return User.find().then(data => data);
      }
    },
    getUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.findById(args.userId).then(data => data);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
