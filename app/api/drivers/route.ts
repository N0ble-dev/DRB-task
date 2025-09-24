import { NextRequest, NextResponse } from "next/server";
import { Driver } from "@/interfaces/index";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const newDriver: Driver = await request.json();

    if (
      !newDriver.name ||
      !newDriver.phone ||
      !newDriver.typeOfCar ||
      !newDriver.city
    ) {
      return NextResponse.json(
        { error: "Missing required driver information" },
        { status: 400 }
      );
    }

    // Read current drivers data
    const driversPath = path.join(process.cwd(), "data", "drivers.json");
    const driversData = JSON.parse(fs.readFileSync(driversPath, "utf8"));

    // Add new driver
    driversData.push(newDriver);

    // Write back to file
    fs.writeFileSync(driversPath, JSON.stringify(driversData, null, 4));

    return NextResponse.json(
      { message: "Driver added successfully", driver: newDriver },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding driver:", error);
    return NextResponse.json(
      { error: "Failed to add driver" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const driversPath = path.join(process.cwd(), "data", "drivers.json");
    const driversData = JSON.parse(fs.readFileSync(driversPath, "utf8"));

    return NextResponse.json(driversData);
  } catch (error) {
    console.error("Error reading drivers:", error);
    return NextResponse.json(
      { error: "Failed to read drivers" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing driver ID" }, { status: 400 });
    }

    const driversPath = path.join(process.cwd(), "data", "drivers.json");
    const driversData = JSON.parse(fs.readFileSync(driversPath, "utf8"));

    const updatedDrivers = driversData.filter(
      (driver: Driver) => driver.id !== id
    );

    fs.writeFileSync(driversPath, JSON.stringify(updatedDrivers, null, 4));

    return NextResponse.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error reading drivers:", error);
    return NextResponse.json(
      { error: "Failed to read drivers" },
      { status: 500 }
    );
  }
}
