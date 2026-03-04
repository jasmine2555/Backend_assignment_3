import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  capacity: Joi.number().integer().min(1).required(),
  registrationCount: Joi.number().integer().min(0).optional(),
  status: Joi.string().valid("active", "cancelled", "completed").required(),
  category: Joi.string().valid("conference", "workshop").required(),
});
