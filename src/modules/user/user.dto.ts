import { role } from "@prisma/client";

export interface Userbody {
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}


export interface UpdateBody {
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  role: role
}
