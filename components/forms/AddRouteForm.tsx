"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { addRouteSchema, AddRouteData } from "@/schemas/route";
import { useRoutes } from "@/context/RoutesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Route as RouteIcon, User } from "lucide-react";
import driversJson from "@/data/drivers.json";
import type { Driver } from "@/interfaces";

export default function AddRouteForm() {
  const drivers = useMemo(() => (driversJson as Driver[]) || [], []);
  const { addRoute, isLoading } = useRoutes();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AddRouteData>({
    resolver: zodResolver(addRouteSchema),
    defaultValues: { title: "", from: "", to: "", driverId: "" },
    mode: "onChange",
  });

  const selectedDriverId = watch("driverId");

  const onSubmit = (data: AddRouteData) => {
    const selected = drivers.find((d) => d.id === data.driverId);
    const routeData = {
      title: data.title.trim(),
      from: data.from.trim(),
      to: data.to.trim(),
      driver: selected ? selected.name : "",
    };

    try {
      addRoute(routeData);
    } catch (err) {
      console.error("Add route error:", err);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-md">
      <Card className="p-6 bg-card border border-border shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Add New Route
          </h1>
          <p className="text-muted-foreground">Create a new route assignment</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Route Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <RouteIcon className="w-4 h-4" />
                <span>Route Title</span>
              </div>
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter route title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* From */}
          <div className="space-y-2">
            <Label
              htmlFor="from"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>From</span>
              </div>
            </Label>
            <Input
              id="from"
              {...register("from")}
              placeholder="Starting location"
              className={errors.from ? "border-destructive" : ""}
            />
            {errors.from && (
              <p className="text-sm text-destructive">{errors.from.message}</p>
            )}
          </div>

          {/* To */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm font-medium text-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>To</span>
              </div>
            </Label>
            <Input
              id="to"
              {...register("to")}
              placeholder="Destination"
              className={errors.to ? "border-destructive" : ""}
            />
            {errors.to && (
              <p className="text-sm text-destructive">{errors.to.message}</p>
            )}
          </div>

          {/* Driver Select (local JSON, no fetch) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Select Driver</span>
              </div>
            </Label>

            <Select
              onValueChange={(value) => setValue("driverId", value)}
              value={selectedDriverId}
            >
              <SelectTrigger
                className={errors.driverId ? "border-destructive" : ""}
              >
                <SelectValue
                  placeholder={
                    drivers.length ? "Choose a driver" : "No drivers available"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {drivers.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-secondary truncate">{d.name}</span>
                      <span className="text-xs text-secondary ml-2">
                        {d.typeOfCar}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <input type="hidden" {...register("driverId")} />
            {errors.driverId && (
              <p className="text-sm text-destructive">
                {errors.driverId.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="gradients text-white"
            >
              {isLoading ? "Adding..." : "Add Route"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
