import { Car } from "../types/car.type";
import bookTicketAPI from "./location.service";

export const getCarList = async () => {
  return await bookTicketAPI.get<Car[]>("/car/get-all").then((res) => res.data);
};
