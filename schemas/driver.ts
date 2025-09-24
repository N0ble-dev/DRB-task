import { z } from "zod";

// Schema for step one: Basic driver information
export const driverStepOneSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
});

// Schema for step two: Vehicle and location information
export const driverStepTwoSchema = z.object({
  typeOfCar: z
    .string()
    .min(2, "Car type must be at least 2 characters")
    .max(50, "Car type must be less than 50 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(30, "City must be less than 30 characters"),
});

// Complete driver schema (combining both steps)
export const completeDriverSchema =
  driverStepOneSchema.merge(driverStepTwoSchema);

// Type definitions
export type DriverStepOneData = z.infer<typeof driverStepOneSchema>;
export type DriverStepTwoData = z.infer<typeof driverStepTwoSchema>;
export type CompleteDriverData = z.infer<typeof completeDriverSchema>;

// Function to generate a new driver with defaults
export const createNewDriver = (data: CompleteDriverData) => {
  return {
    id: `d${Date.now()}${Math.random().toString(36).substr(2, 4)}`, // Generate unique ID
    name: data.name.trim(),
    phone: data.phone.trim(),
    status: "available" as const,
    averageRate: 0,
    typeOfCar: data.typeOfCar.trim(),
    city: data.city.trim(),
  };
};
