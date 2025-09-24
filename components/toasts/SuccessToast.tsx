"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function useSuccessToast() {
  const router = useRouter();

  const showToast = (message: string, path?: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: message,
    }).then(() => {
      if (path) {
        router.push(path);
      }
    });
  };

  return { showToast };
}
