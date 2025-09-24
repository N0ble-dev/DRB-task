import { Driver } from "@/interfaces/index";
import fs from "fs";
import path from "path";

// For client-side, we'll use a different approach since we can't directly write to files
export async function addDriverToFile(newDriver: Driver): Promise<boolean> {
  try {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll simulate the process
    const response = await fetch("/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDriver),
    });

    return response.ok;
  } catch (error) {
    console.error("Error adding driver:", error);
    return false;
  }
}

// Server-side function (would be used in API routes)
export function addDriverToJsonFile(newDriver: Driver): boolean {
  try {
    const driversPath = path.join(process.cwd(), "data", "drivers.json");
    const driversData = JSON.parse(fs.readFileSync(driversPath, "utf8"));

    driversData.push(newDriver);

    fs.writeFileSync(driversPath, JSON.stringify(driversData, null, 4));
    return true;
  } catch (error) {
    console.error("Error writing to drivers.json:", error);
    return false;
  }
}
