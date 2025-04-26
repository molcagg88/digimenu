import express from "express";
import authRoutes from "./authRoutes";
import categoryRoutes from "./categoryRoutes";

const router = express.Router();

// API routes
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

// Add other routes here as they are implemented
// router.use('/menu-items', menuItemRoutes);
// router.use('/orders', orderRoutes);
// router.use('/settings', settingsRoutes);

export default router;
