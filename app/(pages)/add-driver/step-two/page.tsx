"use client";
import { useEffect, useState } from "react";
import StepTwoForm from "@/components/forms/StepTwoForm";
import { DriverStepOneData } from "@/schemas/driver";
import { useRouter } from "next/navigation";

export default function AddDriverStepTwo() {
  const router = useRouter();
  const [stepOneData, setStepOneData] = useState<DriverStepOneData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stepOneDataString = sessionStorage.getItem("driverStepOne");
    if (!stepOneDataString) {
      router.push("/add-driver/step-one");
      return;
    }

    try {
      const data: DriverStepOneData = JSON.parse(stepOneDataString);
      setStepOneData(data);
    } catch (error) {
      console.error("Error parsing step one data:", error);
      router.push("/add-driver/step-one");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stepOneData) {
    return null;
  }

  return <StepTwoForm stepOneData={stepOneData} />;
}
