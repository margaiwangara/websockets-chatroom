import { graphql } from 'graphql';
import schema from '../graphql/queries';
import asyncHandler from '../utils/asyncHandler';

export const sendMessage = async ({ message, user }: string | any) => {
  const query = `
  mutation{
    createChat(message: "${message}", user: "${user}"){
      id
      message
      createdAt
      user{
        id
        username
      }
    }
  }
  `;
  try {
    const response = graphql(schema, query);

    return response;
  } catch (error) {
    console.log(error);
  }
};
