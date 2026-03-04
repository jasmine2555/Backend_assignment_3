import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";

 import { validateRequest } from "../middleware/validateRequest";
import { createEventSchema } from "../validation/eventCreateSchema";

const router = Router();

router.post("/", validateRequest({ body: createEventSchema }), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;