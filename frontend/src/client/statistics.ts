import redaxios from "redaxios";
import * as constants from "./constants";
import { Stats } from "./types";

const STATISTICS_ENDPOINT = `${constants.BASE_URL}/statistics`;

export const getForUser = async (jwtToken: string): Promise<Stats> => {
  const response = await redaxios.get(`${STATISTICS_ENDPOINT}/user`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const getAll = async (): Promise<Stats> => {
  const response = await redaxios.get(`${STATISTICS_ENDPOINT}/all`);
  return response.data;
};
