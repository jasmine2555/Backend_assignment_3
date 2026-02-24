export type EventStatus = "active" | "cancelled" | "completed";

export interface Event {
  id: string;
  name: string;
  date: string; // ISO string
  capacity: number;
  registrationCount: number;
  status: EventStatus;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  name: string;
  date: string;
  capacity: number;
  category: string;
  registrationCount?: number;
  status?: EventStatus;
}