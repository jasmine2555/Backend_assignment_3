export type EventStatus = "active" | "cancelled";
export type EventCategory = "conference" | "workshop" | "music" | "career" | "general";

export interface CreateEventInput {
  name: string;
  date: string;
  capacity: number;
  category: EventCategory;
  registrationCount?: number;
  status?: EventStatus;
}

export interface Event extends Required<CreateEventInput> {
  id: string;
  createdAt: string;
  updatedAt: string;
}