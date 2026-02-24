import { db } from "../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

export const eventRepository = {
  async create(event: Event): Promise<Event> {
    await db.collection(COLLECTION).doc(event.id).set(event);
    return event;
  },

  async getAll(): Promise<Event[]> {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((d: any) => d.data() as Event);
  },

  async getById(id: string): Promise<Event | null> {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as Event;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event | null> {
    const ref = db.collection(COLLECTION).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return null;

    await ref.update(updates);
    const updated = await ref.get();
    return updated.data() as Event;
  },

  async remove(id: string): Promise<boolean> {
    const ref = db.collection(COLLECTION).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return false;

    await ref.delete();
    return true;
  },
};