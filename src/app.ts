import express from "express";
import routes from "./api/v1/routes";
import { HTTP_STATUS } from "./constants/httpConstants";

export const app = express();

app.use(express.json());

app.use("/api/v1", routes);

// basic error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(HTTP_STATUS.SERVER_ERROR).json({ message: "Server error" });
});