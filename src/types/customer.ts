type RoleType = "customer";
export interface Customer {
  id: number;
  providerId?: string;
  email: string;
  fullName: string;
  urlImg?: string;
  publicUrlImg?: string;
  phone?: string;
  dateBirth?: string;
  address?: string;
  provider?: string;
  role: RoleType;
}
