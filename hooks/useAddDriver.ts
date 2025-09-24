"use client";

import { useState } from "react";
import { Driver } from "@/interfaces";
import { useSuccessToast } from "@/components/toasts/SuccessToast";
import { useErrorToast } from "@/components/toasts/ErrorToast";

export function useAddDriver() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useSuccessToast();
  const { showError } = useErrorToast();

  const addDriver = async (driver: Driver): Promise<Driver> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driver),
      });
      const createdDriver: Driver = await res.json();

      showToast("Driver added successfully", "/");

      return createdDriver;
    } catch (err) {
      const message = "An error occurred";
      setError(message);
      showError?.(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addDriver, isLoading, error };
}
