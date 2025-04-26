import { Category, MenuItem } from "../models";
import { ApiError } from "../middleware/errorMiddleware";

/**
 * Service for category operations
 */
export default {
  /**
   * Get all categories
   * @param includeInactive - Whether to include inactive categories
   * @returns Array of categories
   */
  async getAllCategories(includeInactive = false) {
    const where = includeInactive ? {} : { active: true };

    return await Category.findAll({
      where,
      order: [
        ["display_order", "ASC"],
        ["name", "ASC"],
      ],
    });
  },

  /**
   * Get category by ID
   * @param id - Category ID
   * @param includeMenuItems - Whether to include menu items
   * @returns Category object
   */
  async getCategoryById(id: number, includeMenuItems = false) {
    const options: any = {
      where: { id },
    };

    if (includeMenuItems) {
      options.include = [
        {
          model: MenuItem,
          as: "menuItems",
          where: { active: true },
          required: false,
          order: [
            ["display_order", "ASC"],
            ["name", "ASC"],
          ],
        },
      ];
    }

    const category = await Category.findOne(options);

    if (!category) {
      throw ApiError.notFound(`Category with ID ${id} not found`);
    }

    return category;
  },

  /**
   * Create a new category
   * @param categoryData - Category data
   * @returns Created category
   */
  async createCategory(categoryData: any) {
    // Check if category with same name already exists
    const existingCategory = await Category.findOne({
      where: { name: categoryData.name },
    });

    if (existingCategory) {
      throw ApiError.badRequest(
        `Category with name '${categoryData.name}' already exists`,
      );
    }

    return await Category.create(categoryData);
  },

  /**
   * Update a category
   * @param id - Category ID
   * @param categoryData - Updated category data
   * @returns Updated category
   */
  async updateCategory(id: number, categoryData: any) {
    const category = await this.getCategoryById(id);

    // Check if name is being changed and if it conflicts
    if (categoryData.name && categoryData.name !== category.name) {
      const existingCategory = await Category.findOne({
        where: { name: categoryData.name },
      });

      if (existingCategory) {
        throw ApiError.badRequest(
          `Category with name '${categoryData.name}' already exists`,
        );
      }
    }

    await category.update(categoryData);
    return category;
  },

  /**
   * Delete a category
   * @param id - Category ID
   * @returns Success message
   */
  async deleteCategory(id: number) {
    const category = await this.getCategoryById(id);

    // Check if category has menu items
    const menuItemCount = await MenuItem.count({
      where: { category_id: id },
    });

    if (menuItemCount > 0) {
      throw ApiError.badRequest(
        `Cannot delete category with ${menuItemCount} menu items. Remove or reassign menu items first.`,
      );
    }

    await category.destroy();
    return { message: `Category '${category.name}' deleted successfully` };
  },

  /**
   * Toggle category active status
   * @param id - Category ID
   * @returns Updated category
   */
  async toggleCategoryStatus(id: number) {
    const category = await this.getCategoryById(id);

    await category.update({ active: !category.active });
    return category;
  },

  /**
   * Update category display order
   * @param id - Category ID
   * @param displayOrder - New display order
   * @returns Updated category
   */
  async updateCategoryOrder(id: number, displayOrder: number) {
    const category = await this.getCategoryById(id);

    await category.update({ display_order: displayOrder });
    return category;
  },
};
