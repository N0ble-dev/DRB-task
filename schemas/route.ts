import { z } from "zod";

export const addRouteSchema = z.object({
  title: z.string().min(1, "Route title is required"),
  from: z.string().min(1, "Starting location is required"),
  to: z.string().min(1, "Destination is required"),
  driverId: z.string().min(1, "Please select a driver"),
});

export type AddRouteData = z.infer<typeof addRouteSchema>;
