"use client";
import StepOneForm from "@/components/forms/StepOneForm";
import { DriverStepOneData } from "@/schemas/driver";

export default function AddDriverStepOne() {
  const handleNext = (data: DriverStepOneData) => {
    console.log("Step One Data:", data);
  };

  return <StepOneForm onNext={handleNext} />;
}
