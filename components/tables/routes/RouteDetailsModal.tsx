import { Route } from "@/interfaces/index";

export const RouteDetailsModal = ({ route }: { route: Route }) => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Route Details
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Complete information about the route
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Route ID
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground break-all">
            {route.id}
          </p>
        </div>

        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Title
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground capitalize break-words">
            {route.title}
          </p>
        </div>
        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            Driver
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground capitalize break-words">
            {route.driver}
          </p>
        </div>
        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            From
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground break-all">
            {route.from}
          </p>
        </div>
        <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground block mb-1">
            To
          </label>
          <p className="text-base sm:text-lg font-semibold text-foreground break-all">
            {route.to}
          </p>
        </div>
      </div>
    </div>
  );
};
