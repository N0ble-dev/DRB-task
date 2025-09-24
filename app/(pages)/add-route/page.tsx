"use client";

import AddRouteForm from "@/components/forms/AddRouteForm";
import { RoutesProvider } from "@/context/RoutesContext";

export default function AddRoutePage() {
  return (
    <RoutesProvider>
      <AddRouteForm />
    </RoutesProvider>
  );
}
