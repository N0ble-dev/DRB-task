"use client";

import { Route } from "@/interfaces/index";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModalCustom from "@/components/ModalCustom";

import { RouteDetailsModal } from "./RouteDetailsModal";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "title",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          Route Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize font-medium text-foreground text-sm sm:text-base">
        {row.getValue("title")}
      </div>
    ),
  },

  {
    accessorKey: "from",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          From
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="md:w-[60%] p-2  rounded-lg text-xs sm:text-sm font-medium capitalize bg-secondary-foreground/70 flex items-center space-x-1">
        <span className="font-semibold text-secondary-black text-sm sm:text-base lg:text-lg">
          {row.getValue("from")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "to",
    header: () => {
      return (
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
          To
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="md:w-[60%] p-2  rounded-lg text-xs sm:text-sm font-medium capitalize bg-muted/90 flex items-center space-x-1">
        <span className="font-semibold text-secondary-black text-sm sm:text-base lg:text-lg">
          {row.getValue("to")}
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
      const route = row.original;

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
                content={<RouteDetailsModal route={route} />}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
