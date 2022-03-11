import redaxios from "redaxios";
import * as constants from "./constants";
import { User, Vaccination, VaccinationUpdate } from "./types";

const ADMIN_ENDPOINT = `${constants.BASE_URL}/admin/user`;

export const listUsers = async (jwtToken: string): Promise<User[]> => {
  const response = await redaxios.get(`${ADMIN_ENDPOINT}/list`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};

export const updateVaccination = async (
  userId: number,
  vaccinationUpdate: VaccinationUpdate,
  jwtToken: string
): Promise<Vaccination> => {
  const response = await redaxios.post(`${ADMIN_ENDPOINT}/vaccination/${userId}`, vaccinationUpdate, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwtToken}` },
  });
  return response.data;
};
