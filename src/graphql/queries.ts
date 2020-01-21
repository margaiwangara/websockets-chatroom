import { User, IUserModel, Chat } from "../models";
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

const ChatType: GraphQLObjectType = new GraphQLObjectType({
  name: "ChatType",
  fields: () => ({
    id: { type: GraphQLString },
    message: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent);
        return User.findById({ _id: parent.user }).then(result => result);
      }
    },
    createdAt: {
      type: new GraphQLScalarType({
        name: "ChatDate",
        description: "Date when the chat was added",
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
        return User.findById(args.userId).then(result => result);
      }
    },
    chats: {
      type: new GraphQLList(ChatType),
      resolve(parent, args) {
        return Chat.find().then(result => result);
      }
    },
    chat: {
      type: ChatType,
      args: {
        chatId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Chat.findById(args.chatId).then(result => result);
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
    },
    createChat: {
      type: ChatType,
      args: {
        message: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Chat.create(args).then(result => result);
      }
    },
    updateChat: {
      type: ChatType,
      args: {
        chatId: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Chat.findByIdAndUpdate(
          args.chatId,
          { message: args.message },
          { new: true }
        ).then(result => result);
      }
    },
    deleteChat: {
      type: ChatType,
      args: {
        chatId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Chat.findByIdAndDelete(args.chatId).then(() => ({
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
