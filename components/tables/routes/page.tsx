import { Route } from "@/interfaces/index";
import { columns } from "./Coulmns";
import { DataTable } from "./DataTable";

const RenderRoutesTable = ({ data }: { data: Route[] }) => {
  console.log(data);

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Routes Management
        </h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default RenderRoutesTable;
