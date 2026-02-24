import { Router } from "express";
import eventRoutes from "./eventRoutes";

const router = Router();
router.use("/", eventRoutes);

export default router;