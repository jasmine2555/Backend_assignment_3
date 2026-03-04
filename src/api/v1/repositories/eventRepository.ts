import { db } from "../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const COLLECTION = "events";

export const eventRepository = {
  async create(event: Event): Promise<Event> {
    // Use the id coming from eventService (1,2,3...)
    await db.collection(COLLECTION).doc(event.id).set(event);
    return event;
  },

  async getAll(): Promise<Event[]> {
    const snap = await db.collection(COLLECTION).orderBy("id").get();
    return snap.docs.map((d) => d.data() as Event);
  },

  async getById(id: string): Promise<Event | null> {
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as Event) : null;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event | null> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.set(updates, { merge: true });
    const updated = await ref.get();
    return updated.data() as Event;
  },

  async remove(id: string): Promise<boolean> {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) return false;

    await ref.delete();
    return true;
  },
};