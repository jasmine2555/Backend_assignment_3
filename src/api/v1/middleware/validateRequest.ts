import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatePart = (schema: ObjectSchema, data: any) => {
      return schema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });
    };

    // Validate body
    if (schemas.body) {
      const result = validatePart(schemas.body, req.body);
      if (result.error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Validation error",
          details: result.error.details[0].message,
        });
      }
      req.body = result.value;
    }

    // Validate params
    if (schemas.params) {
      const result = validatePart(schemas.params, req.params);
      if (result.error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Validation error",
          details: result.error.details[0].message,
        });
      }
      req.params = result.value;
    }

    // Validate query
    if (schemas.query) {
      const result = validatePart(schemas.query, req.query);
      if (result.error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Validation error",
          details: result.error.details[0].message,
        });
      }
      req.query = result.value as any;
    }

    next();
  };
};