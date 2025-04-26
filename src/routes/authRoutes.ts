import express from "express";
import { body } from "express-validator";
import authController from "../controllers/authController";
import { authenticate, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Login user and get token
 * @access Public
 */
router.post(
  "/login",
  [
    body("usernameOrEmail")
      .notEmpty()
      .withMessage("Username or email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login,
);

/**
 * @route POST /api/auth/register
 * @desc Register a new user (admin only)
 * @access Private/Admin
 */
router.post(
  "/register",
  [
    authenticate,
    isAdmin,
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["admin", "staff"])
      .withMessage("Role must be admin or staff"),
  ],
  authController.register,
);

/**
 * @route GET /api/auth/me
 * @desc Get current user profile
 * @access Private
 */
router.get("/me", authenticate, authController.getProfile);

export default router;
