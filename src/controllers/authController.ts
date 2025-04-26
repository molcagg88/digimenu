import { Request, Response } from "express";
import { validationResult } from "express-validator";
import authService from "../services/authService";

/**
 * Controller for authentication endpoints
 */
export default {
  /**
   * Login endpoint
   * @route POST /api/auth/login
   */
  async login(req: Request, res: Response) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { usernameOrEmail, password } = req.body;

      // Call auth service to login
      const result = await authService.login(usernameOrEmail, password);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(401)
        .json({ message: error.message || "Authentication failed" });
    }
  },

  /**
   * Register endpoint (admin only)
   * @route POST /api/auth/register
   */
  async register(req: Request, res: Response) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || "staff",
        active: req.body.active !== undefined ? req.body.active : true,
      };

      // Call auth service to register
      const user = await authService.register(userData);

      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Registration failed" });
    }
  },

  /**
   * Get current user profile
   * @route GET /api/auth/me
   */
  async getProfile(req: Request, res: Response) {
    try {
      // User is already attached to request by auth middleware
      const user = req.user;

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: error.message || "Failed to get profile" });
    }
  },
};
