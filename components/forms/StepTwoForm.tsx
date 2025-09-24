import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  driverStepTwoSchema,
  DriverStepTwoData,
  DriverStepOneData,
} from "@/schemas/driver";
import { Driver } from "@/interfaces/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Car, MapPin } from "lucide-react";
import { useAddDriver } from "@/hooks/useAddDriver";

interface StepTwoFormProps {
  initialData?: DriverStepTwoData;
  stepOneData: DriverStepOneData;
}

export default function StepTwoForm({
  initialData,
  stepOneData,
}: StepTwoFormProps) {
  const router = useRouter();
  const { addDriver, isLoading } = useAddDriver();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DriverStepTwoData>({
    resolver: zodResolver(driverStepTwoSchema),
    defaultValues: initialData || {
      typeOfCar: "",
      city: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: DriverStepTwoData) => {
    try {
      const randomId = "d" + Math.random().toString(36).substr(2, 9);

      const fullDriverData: Driver = {
        id: randomId,
        name: stepOneData.name,
        phone: stepOneData.phone,
        typeOfCar: data.typeOfCar,
        city: data.city,
        status: "available" as const,
        averageRate: 0,
      };

      await addDriver(fullDriverData);
      sessionStorage.removeItem("driverStepOne");
    } catch (error) {
      console.error("Error creating driver:", error);
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
            Step 2 of 2: Vehicle & Location
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <div className="w-12 h-1 bg-primary rounded"></div>
              <div className="w-8 h-8 bg-muted text-accent-foreground rounded-full flex items-center justify-center text-sm font-medium ring-2 ring-primary ring-offset-2 ring-offset-background">
                2
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Type of Car Field */}
          <div className="space-y-2">
            <Label
              htmlFor="typeOfCar"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4" />
                <span>Car Type</span>
              </div>
            </Label>
            <Input
              id="typeOfCar"
              type="text"
              placeholder="e.g., Toyota Corolla"
              {...register("typeOfCar")}
              className={`w-full ${
                errors.typeOfCar
                  ? "border-destructive focus:border-destructive"
                  : ""
              }`}
            />
            {errors.typeOfCar && (
              <p className="text-sm text-destructive">
                {errors.typeOfCar.message}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-sm font-medium text-foreground"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>City</span>
              </div>
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="e.g., Cairo"
              {...register("city")}
              className={`w-full ${
                errors.city ? "border-destructive focus:border-destructive" : ""
              }`}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/add-driver/step-one")}
              className="px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-6 gradients text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  Complete
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
