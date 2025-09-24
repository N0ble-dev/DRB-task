"use client";

import { useState } from "react";
import { Driver } from "@/interfaces/index";
import { useSuccessToast } from "@/components/toasts/SuccessToast";
import { useErrorToast } from "@/components/toasts/ErrorToast";

type UseDeleteDriverReturn = {
  isDeleting: boolean;
  error: string | null;
  deleteDriver: (id: string) => Promise<Driver | void>;
};

export function useDeleteDriver(): UseDeleteDriverReturn {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useSuccessToast();
  const { showError } = useErrorToast();

  const deleteDriver = async (id: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/drivers`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Failed to delete driver ${id}`);
      }
      const deleted: Driver = await res.json();

      showToast("Driver deleted successfully", "/");

      return deleted;
    } catch (err) {
      const msg = "An error occurred while deleting";
      setError(msg);
      showError?.(msg);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, error, deleteDriver };
}
