import { Request, Response } from "express";
import { validationResult } from "express-validator";
import categoryService from "../services/categoryService";
import { ApiError } from "../middleware/errorMiddleware";

/**
 * Controller for category endpoints
 */
export default {
  /**
   * Get all categories
   * @route GET /api/categories
   */
  async getAllCategories(req: Request, res: Response) {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const categories =
        await categoryService.getAllCategories(includeInactive);

      return res.status(200).json(categories);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to fetch categories",
      });
    }
  },

  /**
   * Get category by ID
   * @route GET /api/categories/:id
   */
  async getCategoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const includeMenuItems = req.query.includeMenuItems === "true";

      if (isNaN(id)) {
        throw ApiError.badRequest("Invalid category ID");
      }

      const category = await categoryService.getCategoryById(
        id,
        includeMenuItems,
      );

      return res.status(200).json(category);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to fetch category",
      });
    }
  },

  /**
   * Create a new category
   * @route POST /api/categories
   */
  async createCategory(req: Request, res: Response) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const categoryData = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        active: req.body.active !== undefined ? req.body.active : true,
        display_order: req.body.display_order || 0,
      };

      const category = await categoryService.createCategory(categoryData);

      return res.status(201).json({
        message: "Category created successfully",
        category,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to create category",
      });
    }
  },

  /**
   * Update a category
   * @route PUT /api/categories/:id
   */
  async updateCategory(req: Request, res: Response) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("Invalid category ID");
      }

      const categoryData = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        active: req.body.active,
        display_order: req.body.display_order,
      };

      // Remove undefined fields
      Object.keys(categoryData).forEach((key) => {
        if (categoryData[key as keyof typeof categoryData] === undefined) {
          delete categoryData[key as keyof typeof categoryData];
        }
      });

      const category = await categoryService.updateCategory(id, categoryData);

      return res.status(200).json({
        message: "Category updated successfully",
        category,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to update category",
      });
    }
  },

  /**
   * Delete a category
   * @route DELETE /api/categories/:id
   */
  async deleteCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("Invalid category ID");
      }

      const result = await categoryService.deleteCategory(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to delete category",
      });
    }
  },

  /**
   * Toggle category active status
   * @route PATCH /api/categories/:id/toggle-status
   */
  async toggleCategoryStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("Invalid category ID");
      }

      const category = await categoryService.toggleCategoryStatus(id);

      return res.status(200).json({
        message: `Category '${category.name}' is now ${category.active ? "active" : "inactive"}`,
        category,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to toggle category status",
      });
    }
  },

  /**
   * Update category display order
   * @route PATCH /api/categories/:id/display-order
   */
  async updateCategoryOrder(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw ApiError.badRequest("Invalid category ID");
      }

      const { display_order } = req.body;

      if (display_order === undefined || isNaN(parseInt(display_order))) {
        throw ApiError.badRequest("Valid display_order is required");
      }

      const category = await categoryService.updateCategoryOrder(
        id,
        parseInt(display_order),
      );

      return res.status(200).json({
        message: `Category '${category.name}' display order updated`,
        category,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Failed to update category order",
      });
    }
  },
};
