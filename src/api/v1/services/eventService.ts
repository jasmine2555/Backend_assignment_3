import { eventRepository } from "../repositories/eventRepository";
import { CreateEventInput, Event } from "../models/eventModel";
import { db } from "../../../config/firebaseConfig";

const nowISO = () => new Date().toISOString();

const getNextId = async (): Promise<string> => {
  const counterRef = db.collection("counters").doc("events");

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const current = snap.exists ? (snap.data()?.value as number) : 0;
    const next = current + 1;
    tx.set(counterRef, { value: next }, { merge: true });
    return String(next); // "1", "2", "3"
  });
};

export const eventService = {
  async createEvent(input: CreateEventInput): Promise<Event> {
    const id = await getNextId();
    const now = nowISO();

    const event: Event = {
      id,
      name: input.name,
      date: input.date,
      capacity: input.capacity,
      category: input.category,
      registrationCount: input.registrationCount ?? 0,
      status: input.status ?? "active",
      createdAt: now,
      updatedAt: now,
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