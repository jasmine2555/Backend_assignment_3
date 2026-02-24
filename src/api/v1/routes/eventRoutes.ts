import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import { eventCreateSchema } from "../validation/eventCreateSchema";

const router = Router();

// Health
router.get("/health", eventController.health);

// Create (demo validation rules go here)
router.post(
  "/events",
  validateRequest({ body: eventCreateSchema }),
  eventController.create
);

// CRUD
router.get("/events", eventController.getAll);
router.get("/events/:id", eventController.getById);
router.put("/events/:id", eventController.update);
router.delete("/events/:id", eventController.remove);

export default router;