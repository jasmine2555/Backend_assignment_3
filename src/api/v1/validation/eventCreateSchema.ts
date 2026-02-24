import Joi from "joi";

/**
 * IMPORTANT: Update these rules to match your demo video exactly.
 */
export const eventCreateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  date: Joi.string().isoDate().required(),
  capacity: Joi.number().integer().min(1).required(),
  category: Joi.string().min(2).max(30).required(),

  registrationCount: Joi.number().integer().min(0).default(0),
  status: Joi.string().valid("active", "cancelled", "completed").default("active"),
});