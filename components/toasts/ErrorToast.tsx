"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function useErrorToast() {
  const router = useRouter();

  const showError = (message: string, path?: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "error",
      title: message,
    }).then(() => {
      if (path) {
        router.push(path);
      }
    });
  };

  return { showError };
}
