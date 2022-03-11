import redaxios from "redaxios";
import * as constants from "./constants";
import { Vaccination } from "./types";

const VACCINATION_ENDPOINT = `${constants.BASE_URL}/vaccination`;

export const bookFirstDose = async (vaccination: Vaccination, jwtToken: string): Promise<Vaccination> => {
  const response = await redaxios.post(`${VACCINATION_ENDPOINT}/book`, vaccination, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const cancel = async (jwtToken: string): Promise<void> => {
  const response = await redaxios.post(
    `${VACCINATION_ENDPOINT}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${jwtToken}` },
    }
  );
  return response.data;
};
