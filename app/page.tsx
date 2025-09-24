"use client";
import RenderDriversTable from "@/components/tables/drivers/page";
import { Driver } from "@/interfaces/index";
import driversData from "@/data/drivers.json";
import RenderRoutesTable from "@/components/tables/routes/page";

export default function Home() {
  return (
    <>
      <RenderDriversTable data={driversData as Driver[]} />
      <RenderRoutesTable />
    </>
  );
}
