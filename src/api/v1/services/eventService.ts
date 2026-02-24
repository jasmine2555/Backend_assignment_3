import { eventRepository } from "../repositories/eventRepository";
import { CreateEventInput, Event } from "../models/eventModel";

const nowISO = () => new Date().toISOString();

const makeId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `evt_${num}`;
};

export const eventService = {
  async createEvent(input: CreateEventInput): Promise<Event> {
    const event: Event = {
      id: makeId(),
      name: input.name,
      date: input.date,
      capacity: input.capacity,
      category: input.category,
      registrationCount: input.registrationCount ?? 0,
      status: input.status ?? "active",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };

    return eventRepository.create(event);
  },

  async getAllEvents(): Promise<Event[]> {
    return eventRepository.getAll();
  },

  async getEventById(id: string): Promise<Event | null> {
    return eventRepository.getById(id);
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    return eventRepository.update(id, { ...updates, updatedAt: nowISO() });
  },

  async deleteEvent(id: string): Promise<boolean> {
    return eventRepository.remove(id);
  },
};