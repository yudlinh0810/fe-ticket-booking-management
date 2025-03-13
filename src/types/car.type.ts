export interface Car {
  id: number;
  name: string;
  license_plate: string;
  url_img: string;
  url_public_img: string;
  type: "Xe thường" | "Xe giường nằm";
  status: "Sắp khởi hành" | "Đang chạy" | "Bảo trì";
  create_at: string; // timestamp
  update_at: string;
}
