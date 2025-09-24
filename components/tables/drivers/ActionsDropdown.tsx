"use client";

import React from "react";
import { Driver } from "@/interfaces/index";
import { Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModalCustom from "@/components/ModalCustom";
import { DriverDetailsModal } from "@/components/tables/drivers/DriverDetailsModal";
import { useDeleteDriver } from "@/hooks/useDeleteDriver";

type Props = {
  driver: Driver;
};

export default function ActionsDropdown({ driver }: Props) {
  const { deleteDriver, isDeleting } = useDeleteDriver();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete driver "${driver.name}"?`
    );
    if (!confirmed) return;

    try {
      await deleteDriver(driver.id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-muted/50"
        >
          <span className="sr-only">Open menu</span>
          <span className="h-3 w-3 sm:h-4 sm:w-4">⋯</span>
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

        <DropdownMenuItem
          className="cursor-pointer text-destructive flex items-center gap-2"
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
