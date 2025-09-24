"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { DriverStepOneData } from "@/schemas/driver";

interface AddDriverContextType {
  stepOneData: DriverStepOneData | null;
  setStepOneData: (data: DriverStepOneData) => void;
  clearData: () => void;
}

const AddDriverContext = createContext<AddDriverContextType | undefined>(
  undefined
);

export function AddDriverProvider({ children }: { children: ReactNode }) {
  const [stepOneData, setStepOneDataState] = useState<DriverStepOneData | null>(
    null
  );

  const setStepOneData = (data: DriverStepOneData) => {
    setStepOneDataState(data);
    sessionStorage.setItem("driverStepOne", JSON.stringify(data));
  };

  const clearData = () => {
    setStepOneDataState(null);
    sessionStorage.removeItem("driverStepOne");
  };

  return (
    <AddDriverContext.Provider
      value={{ stepOneData, setStepOneData, clearData }}
    >
      {children}
    </AddDriverContext.Provider>
  );
}

export function useAddDriver() {
  const context = useContext(AddDriverContext);
  if (!context) {
    throw new Error("useAddDriver must be used within an AddDriverProvider");
  }
  return context;
}
