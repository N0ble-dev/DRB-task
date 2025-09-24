"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import initialRoutes from "@/data/routes.json";
import { Route } from "@/interfaces/index";
import { useSuccessToast } from "@/components/toasts/SuccessToast";

interface RoutesContextType {
  routes: Route[];
  addRoute: (routeData: Omit<Route, "id">) => void;
  isLoading: boolean;
}

const STORAGE_KEY = "app_routes_v1";
const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

export function RoutesProvider({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useSuccessToast();

  useEffect(() => {
    setIsLoading(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setRoutes(JSON.parse(raw) as Route[]);
      } else {
        setRoutes((initialRoutes as Route[]) || []);
      }
    } catch (err) {
      setRoutes((initialRoutes as Route[]) || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = (next: Route[]) => {
    setRoutes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const addRoute = (routeData: Omit<Route, "id">) => {
    const newRoute: Route = {
      id: `r_${Date.now().toString(36)}`,
      ...routeData,
    };
    const next = [...routes, newRoute];
    persist(next);
    showToast?.("Route added successfully", "/");
  };

  return (
    <RoutesContext.Provider value={{ routes, addRoute, isLoading }}>
      {children}
    </RoutesContext.Provider>
  );
}

export function useRoutes() {
  const ctx = useContext(RoutesContext);
  if (!ctx) throw new Error("useRoutes must be used within RoutesProvider");
  return ctx;
}
