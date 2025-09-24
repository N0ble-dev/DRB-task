"use client";
import RenderDriversTable from "@/components/tables/drivers/page";
import { Driver, Route } from "@/interfaces/index";
import driversData from "@/data/drivers.json";
import routesData from "@/data/routes.json";
import RenderRoutesTable from "@/components/tables/routes/page";

export default function Home() {
  return (
    <>
      <RenderDriversTable data={driversData as Driver[]} />
      <RenderRoutesTable data={routesData as Route[]} />
    </>
  );
}
