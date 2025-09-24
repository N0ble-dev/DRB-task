export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: "available" | "on-trip" | "off-duty";
  averageRate: number;
  typeOfCar: string;
}
export interface Route {
  id: string;
  driverId: string;
  title: string;
  from: string;
  to: string;
}
