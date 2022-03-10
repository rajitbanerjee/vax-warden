import redaxios from "redaxios";
import * as constants from "./constants";
import { Post } from "./types";

const FORUM_ENDPOINT = `${constants.BASE_URL}/forum`;

export const listPosts = async (jwtToken: string): Promise<Post[]> => {
  const response = await redaxios.get(`${FORUM_ENDPOINT}/list`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const createPost = async (content: string, jwtToken: string): Promise<Post> => {
  const response = await redaxios.post(
    `${FORUM_ENDPOINT}/post`,
    { content },
    {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwtToken}` },
    }
  );
  return response.data;
};

export const createReply = async (content: string, replyToPostId: number, jwtToken: string): Promise<Post> => {
  const response = await redaxios.post(
    `${FORUM_ENDPOINT}/reply`,
    { content, replyToPostId },
    {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwtToken}` },
    }
  );
  return response.data;
};
