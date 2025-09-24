"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { driverStepOneSchema, DriverStepOneData } from "@/schemas/driver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, User, Phone } from "lucide-react";

interface StepOneFormProps {
  initialData?: DriverStepOneData;
  onNext: (data: DriverStepOneData) => void;
}

export default function StepOneForm({ initialData, onNext }: StepOneFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DriverStepOneData>({
    resolver: zodResolver(driverStepOneSchema),
    defaultValues: initialData || {
      name: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: DriverStepOneData) => {
    setIsLoading(true);
    try {
      // Store temporarily in sessionStorage for the next step
      sessionStorage.setItem("driverStepOne", JSON.stringify(data));
      onNext(data);
      router.push("/add-driver/step-two");
    } catch (error) {
      console.error("Error saving step one data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-md">
      <Card className="p-6 bg-card border border-border shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Add New Driver
          </h1>
          <p className="text-muted-foreground">
            Step 1 of 2: Basic Information
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium ring-2 ring-primary ring-offset-2 ring-offset-background">
                1
              </div>
              <div className="w-12 h-1 bg-muted rounded"></div>
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </div>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter driver's full name"
              {...register("name")}
              className={`w-full ${
                errors.name ? "border-destructive focus:border-destructive" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </div>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01000000000"
              {...register("phone")}
              className={`w-full ${
                errors.phone
                  ? "border-destructive focus:border-destructive"
                  : ""
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="px-6"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-6 gradients text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
