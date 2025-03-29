import { Car } from "../types/car.type";
import { bookTicketAPI } from "./customize.service";

export const getCarList = async ({ offset, limit }: { offset: number; limit: number }) => {
  return await bookTicketAPI
    .get<{ data: Car[]; total: number }>(`/car/get-all?offset=${offset}&limit${limit}`)
    .then((res) => res.data);
};

export const addCar = async (data: FormData) => {
  return await bookTicketAPI
    .post(`/car/add`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const updateCar = async (data: FormData) => {
  return await bookTicketAPI.put(`/car/update`, data).then((res) => res.data);
};

export const deleteCar = async (id: number) => {
  return await bookTicketAPI.delete(`/car/delete/${id}`).then((res) => res.data);
};

export const addImgsCar = async (data: FormData) => {
  return await bookTicketAPI.post(`/car/img-car/add`, data);
};
