import { BusType } from "../types/bus";
import { bookTicketAPI } from "./customize.service";

export const getBusList = async ({ offset, limit }: { offset: number; limit: number }) => {
  return await bookTicketAPI
    .get<{ data: BusType[]; total: number; totalPage: number }>(
      `/bus/get-all?offset=${offset}&limit=${limit}`
    )
    .then((res) => res.data);
};

export const addBus = async (data: FormData) => {
  return await bookTicketAPI
    .post(`/bus/add`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const getDetailBus = async (licensePlate: string) => {
  return await bookTicketAPI
    .get<BusType>(`/bus/detail/${licensePlate}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .then((res) => res[0]);
};

export const updateBus = async (data: FormData) => {
  return await bookTicketAPI.put(`/bus/update`, data).then((res) => res.data);
};

export const deleteBus = async (licensePlate: number) => {
  return await bookTicketAPI.delete(`/bus/delete/${licensePlate}`).then((res) => res.data);
};

export const addImgsBus = async (data: FormData) => {
  return await bookTicketAPI.post(`/bus/img-Bus/add`, data);
};
// success
export const updateImgBus = async (data: FormData): Promise<object> => {
  return await bookTicketAPI.put(`/bus/image/update`, data).then((res) => res.data);
};

export const deleteImgBus = async (data: object) => {
  return await bookTicketAPI.delete(`/bus/image/delete`, { data }).then((res) => res.data);
};
