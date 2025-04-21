export interface BusType {
  id: number;
  // name?: string;
  licensePlate: string;
  capacity: number;
  type: "Xe thường" | "Xe giường nằm";
  // status?: "Sắp khởi hành" | "Đang chạy" | "Bảo trì";
  image?: ImgBus;
  images?: ImgBus[];
  createAt?: string; // timestamp
  updateAt?: string;
}

export interface ImgBus {
  id?: number;
  carId: number;
  urlImg: string;
  urlPublicImg: string;
  isMain: 0 | 1;
}
