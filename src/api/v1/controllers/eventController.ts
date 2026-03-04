import { Request, Response } from "express";
import { eventService } from "../services/eventService";

export const createEvent = async (req: Request, res: Response) => {
  const event = await eventService.createEvent(req.body);
  return res.status(201).json({ message: "Event created", data: event });
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await eventService.getAllEvents();
  return res.status(200).json({ message: "Events fetched", data: events });
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  return res.status(200).json({ message: "Event fetched", data: event });
};

export const updateEvent = async (req: Request, res: Response) => {
  const updated = await eventService.updateEvent(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Event not found" });
  return res.status(200).json({ message: "Event updated", data: updated });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const ok = await eventService.deleteEvent(req.params.id);
  if (!ok) return res.status(404).json({ message: "Event not found" });
  return res.status(204).send();
};