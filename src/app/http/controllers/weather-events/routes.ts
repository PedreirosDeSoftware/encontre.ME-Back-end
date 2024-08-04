import { Router } from "express";
import { createController } from "./create-weather-controller";

export function weatherEventsRoutes(route: Router) {
    route.post("/weather-event", createController);
}