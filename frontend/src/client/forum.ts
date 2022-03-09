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
