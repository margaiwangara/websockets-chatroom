import { graphql } from 'graphql';
import schema from '../graphql/queries';

export const sendMessage = ({ message, user }: string | any) => {
  const query = `
  mutation {
    createChat(message: "${message}", user: "${user}"){
      id
      message
      user{
        id
        username
      }
    }
  }
  `;
  return graphql(schema, query).then(({ data }) => data);
};
