import express from "express";
import cors from "cors";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/v1/events", eventRoutes);

export default app;