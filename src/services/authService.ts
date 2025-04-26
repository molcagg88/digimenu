import jwt from "jsonwebtoken";
import { User } from "../models";

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

/**
 * Service for user authentication
 */
export default {
  /**
   * Login a user with username/email and password
   * @param usernameOrEmail - Username or email of the user
   * @param password - Password of the user
   * @returns Object containing user data and JWT token
   */
  async login(usernameOrEmail: string, password: string) {
    // Find user by username or email
    const user = await User.findOne({
      where: {
        [usernameOrEmail.includes("@") ? "email" : "username"]: usernameOrEmail,
        active: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    // Return user data (excluding password) and token
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },

  /**
   * Register a new user
   * @param userData - User data for registration
   * @returns Created user object
   */
  async register(userData: any) {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [userData.email.includes("@") ? "email" : "username"]:
          userData.email.includes("@") ? userData.email : userData.username,
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    // Create new user
    const user = await User.create(userData);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  },

  /**
   * Verify JWT token
   * @param token - JWT token to verify
   * @returns Decoded token payload
   */
  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  },
};
