import redaxios from "redaxios";
import * as constants from "./constants";
import { Vaccination } from "./types";

const VAX_ENDPOINT = `${constants.BASE_URL}/vaccination`;

export const get = async (id: number, jwtToken: string): Promise<Vaccination> => {
  const response = await redaxios.get(`${VAX_ENDPOINT}/${id}`, { headers: { Authorization: `Bearer ${jwtToken}` } });
  return response.data;
};
