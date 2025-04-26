import express from "express";
import { body } from "express-validator";
import categoryController from "../controllers/categoryController";
import { authenticate, isStaff } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route GET /api/categories
 * @desc Get all categories
 * @access Public
 */
router.get("/", categoryController.getAllCategories);

/**
 * @route GET /api/categories/:id
 * @desc Get category by ID
 * @access Public
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @route POST /api/categories
 * @desc Create a new category
 * @access Private/Staff
 */
router.post(
  "/",
  [
    authenticate,
    isStaff,
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
    body("image_url").optional(),
    body("active")
      .optional()
      .isBoolean()
      .withMessage("Active must be a boolean"),
    body("display_order")
      .optional()
      .isInt()
      .withMessage("Display order must be an integer"),
  ],
  categoryController.createCategory,
);

/**
 * @route PUT /api/categories/:id
 * @desc Update a category
 * @access Private/Staff
 */
router.put(
  "/:id",
  [
    authenticate,
    isStaff,
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("description").optional(),
    body("image_url").optional(),
    body("active")
      .optional()
      .isBoolean()
      .withMessage("Active must be a boolean"),
    body("display_order")
      .optional()
      .isInt()
      .withMessage("Display order must be an integer"),
  ],
  categoryController.updateCategory,
);

/**
 * @route DELETE /api/categories/:id
 * @desc Delete a category
 * @access Private/Staff
 */
router.delete("/:id", authenticate, isStaff, categoryController.deleteCategory);

/**
 * @route PATCH /api/categories/:id/toggle-status
 * @desc Toggle category active status
 * @access Private/Staff
 */
router.patch(
  "/:id/toggle-status",
  authenticate,
  isStaff,
  categoryController.toggleCategoryStatus,
);

/**
 * @route PATCH /api/categories/:id/display-order
 * @desc Update category display order
 * @access Private/Staff
 */
router.patch(
  "/:id/display-order",
  [
    authenticate,
    isStaff,
    body("display_order")
      .isInt()
      .withMessage("Display order must be an integer"),
  ],
  categoryController.updateCategoryOrder,
);

export default router;
