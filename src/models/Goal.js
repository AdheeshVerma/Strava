import { v4 as uuidv4 } from 'uuid';

/**
 * Goal model represents a user's objective.
 * This implementation is storage‑agnostic; it provides the data
 * structure and basic validation. Persistence should be handled by
 * a repository layer that consumes this model.
 */
export default class Goal {
  /**
   * Create a new Goal instance.
   * @param {Object} params
   * @param {string} [params.id] - Unique identifier. Generated if omitted.
   * @param {string} params.title - Short title of the goal.
   * @param {string} [params.description] - Detailed description.
   * @param {Date|string} [params.targetDate] - Desired completion date.
   * @param {boolean} [params.completed] - Completion status.
   * @param {Date|string} [params.createdAt] - Creation timestamp.
   * @param {Date|string} [params.updatedAt] - Last update timestamp.
   */
  constructor({
    id = uuidv4(),
    title,
    description = '',
    targetDate = null,
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new Error('Goal title is required and must be a non‑empty string');
    }

    this.id = id;
    this.title = title.trim();
    this.description = description.trim();
    this.targetDate = targetDate ? new Date(targetDate) : null;
    this.completed = Boolean(completed);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  /**
   * Mark the goal as completed.
   * Updates the {@code completed} flag and {@code updatedAt} timestamp.
   */
  complete() {
    this.completed = true;
    this.updatedAt = new Date();
  }

  /**
   * Update mutable fields of the goal.
   * @param {Object} updates
   * @param {string} [updates.title]
   * @param {string} [updates.description]
   * @param {Date|string} [updates.targetDate]
   */
  update({ title, description, targetDate }) {
    let changed = false;
    if (title !== undefined) {
      if (!title || typeof title !== 'string' || !title.trim()) {
        throw new Error('Goal title must be a non‑empty string');
      }
      this.title = title.trim();
      changed = true;
    }
    if (description !== undefined) {
      this.description = String(description).trim();
      changed = true;
    }
    if (targetDate !== undefined) {
      this.targetDate = targetDate ? new Date(targetDate) : null;
      changed = true;
    }
    if (changed) {
      this.updatedAt = new Date();
    }
  }

  /**
   * Serialize the goal to a plain object suitable for JSON output.
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      targetDate: this.targetDate ? this.targetDate.toISOString() : null,
      completed: this.completed,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}
