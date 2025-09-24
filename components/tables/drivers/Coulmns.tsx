"use client";

import { Driver } from "@/interfaces/index";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModalCustom from "@/components/ModalCustom";

import { DriverDetailsModal } from "@/components/tables/drivers/DriverDetailsModal";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-muted/50"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 sm:w-48">
              <ModalCustom
                btn={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer text-accent-foreground"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Show All Data
                  </DropdownMenuItem>
                }
                content={<DriverDetailsModal driver={driver} />}
              />
              <DropdownMenuItem className="cursor-pointer text-accent-foreground">
                <Edit className="mr-2 h-4 w-4 " />
                Update
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
