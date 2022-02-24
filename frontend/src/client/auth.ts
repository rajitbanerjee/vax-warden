import redaxios from "redaxios";
import * as constants from "./constants";
import { User, LoginCredentials } from "./types";

const AUTH_ENDPOINT = `${constants.BASE_URL}/auth`;

export const register = async (user: User): Promise<User> => {
  const response = await redaxios.post(`${AUTH_ENDPOINT}/register`, user);
  return response.data;
};

export const login = async (loginCredentials: LoginCredentials): Promise<User> => {
  const response = await redaxios.post(`${AUTH_ENDPOINT}/login`, loginCredentials);
  return response.data;
};
