import { FormDataType } from "../types/trip";
import { bookTicketAPI } from "./customize.service";

export const getFormData = () => {
  return bookTicketAPI.get<FormDataType>("/trip/form-data").then((res) => res.data);
};

export const addTrip = async (data: object) => {
  return bookTicketAPI.post("/trip/add", data).then((res) => res.data);
};
