import { Driver } from "@/interfaces";

export const DriverDetailsModal = ({ driver }: { driver: Driver }) => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Driver Details
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Complete information about the driver
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Driver ID
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground break-all">
            {driver.id}
          </p>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Full Name
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground capitalize break-words">
            {driver.name}
          </p>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Phone Number
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground break-all">
            {driver.phone}
          </p>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Current Status
          </label>
          <div className="mt-1 sm:mt-2">
            <span
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium capitalize inline-block ${
                driver.status === "available"
                  ? "bg-green-100 text-green-800"
                  : driver.status === "on-trip"
                  ? "gradients text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {driver.status}
            </span>
          </div>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Average Rating
          </label>
          <div className="flex items-center space-x-1 mt-1 sm:mt-2">
            <span className="text-base sm:text-lg font-semibold text-foreground">
              {driver.averageRate}
            </span>
            <span className="text-yellow-500 text-base sm:text-lg">★</span>
          </div>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Car Type
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground capitalize break-words">
            {driver.typeOfCar}
          </p>
        </div>
      </div>
    </div>
  );
};
