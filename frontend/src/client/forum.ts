import redaxios from "redaxios";
import * as constants from "./constants";
import { Post } from "./types";

const FORUM_ENDPOINT = `${constants.BASE_URL}/forum`;

export const getPosts = async (jwtToken: string): Promise<Post> => {
  const response = await redaxios.get(`${FORUM_ENDPOINT}/list`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const postMessage = async (content: string, jwtToken: string): Promise<Post> => {
  const response = await redaxios.post(
    `${FORUM_ENDPOINT}/post`,
    { content: content },
    {
      headers: { "Content-Type": `application/json`, Authorization: `Bearer ${jwtToken}` },
    }
  );
  return response.data;
};

export const postReply = async (content: string, replyId: number, jwtToken: string): Promise<Post> => {
  const response = await redaxios.post(
    `${FORUM_ENDPOINT}/reply`,
    {
      content: content,
      replyId: replyId,
    },
    {
      headers: { "Content-Type": `application/json`, Authorization: `Bearer ${jwtToken}` },
    }
  );
  return response.data;
};
