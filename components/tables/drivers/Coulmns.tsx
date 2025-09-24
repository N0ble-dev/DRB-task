"use client";

import { Driver } from "@/interfaces/index";
import { ColumnDef } from "@tanstack/react-table";
import ActionsDropdown from "./ActionsDropdown";

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          Driver Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize font-medium text-foreground text-sm sm:text-base">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          Status
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "available":
            return "bg-green-100 text-green-800 border-green-200";
          case "on-trip":
            return "gradients text-white border-transparent";
          case "off-duty":
            return "bg-muted text-muted-foreground border-border";
          default:
            return "bg-muted text-muted-foreground border-border";
        }
      };
      return (
        <div
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium capitalize border transition-all duration-200 inline-block ${getStatusColor(
            status
          )}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "averageRate",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          Rating
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">
          {row.getValue("averageRate")}
        </span>
        <span className="text-yellow-500 text-sm sm:text-base lg:text-lg">
          ★
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground text-center">
          Actions
        </div>
      );
    },
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <div className="flex justify-center">
          <ActionsDropdown driver={driver} />
        </div>
      );
    },
  },
];
