import redaxios from "redaxios";
import * as constants from "./constants";
import { Statistics } from "./types";

const STATISTICS_ENDPOINT = `${constants.BASE_URL}/statistics`;

export const getForUser = async (jwtToken: string): Promise<Statistics> => {
  const response = await redaxios.get(`${STATISTICS_ENDPOINT}/user`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  console.log(response);
  return response.data;
};
