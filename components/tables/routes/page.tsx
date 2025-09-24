"use client";

import { useRoutes } from "@/context/RoutesContext";
import { columns } from "./Coulmns";
import { DataTable } from "./DataTable";

const RenderRoutesTable = () => {
  const { routes, isLoading } = useRoutes();

  if (isLoading) {
    return (
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Routes Management
          </h1>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-muted-foreground">Loading routes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Routes Management
        </h1>
        <p className="text-muted-foreground">
          {routes.length} route{routes.length !== 1 ? "s" : ""} found
        </p>
      </div>
      <DataTable columns={columns} data={routes} />
    </div>
  );
};

export default RenderRoutesTable;
