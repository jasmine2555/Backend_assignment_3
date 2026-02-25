import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { eventService } from "../services/eventService";

type EventParams = {
  id: string;
};

export const eventController = {
  // Health check
  health(req: Request, res: Response) {
    return res.status(HTTP_STATUS.OK).json({
      message: "Server is running",
    });
  },

  // Create
  async create(req: Request, res: Response) {
    const created = await eventService.createEvent(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Event created",
      data: created,
    });
  },

  // Get All
  async getAll(req: Request, res: Response) {
    const events = await eventService.getAllEvents();

    return res.status(HTTP_STATUS.OK).json({
      message: "Events fetched",
      data: events,
    });
  },

  // Get By ID
  async getById(req: Request<EventParams>, res: Response) {
    const event = await eventService.getEventById(req.params.id);

    if (!event) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Event not found" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "Event fetched",
      data: event,
    });
  },

  // Update
  async update(req: Request<EventParams>, res: Response) {
    const updated = await eventService.updateEvent(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Event not found" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "Event updated",
      data: updated,
    });
  },

  // Delete
  async remove(req: Request<EventParams>, res: Response) {
    const deleted = await eventService.deleteEvent(req.params.id);

    if (!deleted) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Event not found" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "Event deleted",
    });
  },
};