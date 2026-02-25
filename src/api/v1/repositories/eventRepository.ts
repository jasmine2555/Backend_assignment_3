import { db } from "../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events"; // or your studentId collection na

export const eventRepository = {
  async create(event: Event): Promise<Event> {
    await db.collection(COLLECTION).doc(event.id).set(event); // 
    return event;
  },

  async getAll(): Promise<Event[]> {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((d) => d.data() as Event);
  },

  async getById(id: string): Promise<Event | null> {
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as Event) : null;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event | null> {
    const ref = db.collection(COLLECTION).doc(id);
    const before = await ref.get();
    if (!before.exists) return null;

    await ref.update(updates);
    const after = await ref.get();
    return after.data() as Event;
  },

  async remove(id: string): Promise<boolean> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  },
};