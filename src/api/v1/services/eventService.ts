import { eventRepository } from "../repositories/eventRepository";
import { CreateEventInput, Event } from "../models/eventModel";
import { db } from "../../../config/firebaseConfig";

const nowISO = () => new Date().toISOString();

// Firestore counter — WILL NOT RESET
const getNextId = async (): Promise<string> => {
  const counterRef = db.collection("counters").doc("events");

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);

    const current = snap.exists ? snap.data()?.value : 0;
    const next = current + 1;

    tx.set(counterRef, { value: next });

    return String(next);
  });
};

export const eventService = {
  async createEvent(input: CreateEventInput): Promise<Event> {
    const id = await getNextId();

    const event: Event = {
      id,
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