import { Customer } from "../types/customer";
import { ArrangeType } from "../types/type";
import { bookTicketAPI } from "./customize.service";

export const getCustomerList = async ({
  offset,
  limit,
  arrangeType,
}: {
  offset: number;
  limit: number;
  arrangeType: ArrangeType;
}) => {
  return await bookTicketAPI
    .get<{ data: Customer[]; total: number }>(
      `/customer/get-all?offset=${offset}&limit=${limit}&arrangeType=${arrangeType}`
    )
    .then((res) => res.data);
};
