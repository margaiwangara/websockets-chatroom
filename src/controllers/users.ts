import { User, IUserModel } from "../models";
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLScalarType,
  Kind
} from "graphql";

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "UserQuery",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    createdAt: {
      type: new GraphQLScalarType({
        name: "Date",
        description: "Date when the user was created",
        parseValue(value) {
          return new Date(value);
        },
        serialize(value) {
          return value;
        },
        parseLiteral(ast) {
          if (ast.kind == Kind.INT) {
            return parseInt(ast.kind, 10);
          }
          return null;
        }
      })
    }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find().then(result => result);
      }
    },
    user: {
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

const MutationQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "MutationQuery",
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.create(args).then(result => result);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.userId,
          { username: args.username },
          {
            new: true
          }
        ).then(result => result);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.userId).then(() => ({
          success: true
        }));
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery
});
