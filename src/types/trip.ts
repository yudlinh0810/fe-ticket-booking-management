import { TypeBus } from "./bus";

export interface CoAndDriverType {
  id: number;
  fullName: string;
  phone: string;
}

export interface BusType {
  id: number;
  licensePlate: string;
  type: TypeBus;
}

export interface FormDataType {
  cars: BusType[];
  drivers: CoAndDriverType[];
  coDrivers: CoAndDriverType[];
}
