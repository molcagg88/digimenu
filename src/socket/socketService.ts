import { Server as SocketIOServer } from "socket.io";

/**
 * Socket.io service for real-time notifications
 */
class SocketService {
  private io: SocketIOServer | null = null;

  /**
   * Initialize the Socket.io server
   * @param io - Socket.io server instance
   */
  initialize(io: SocketIOServer) {
    this.io = io;
    console.log("Socket.io service initialized");
  }

  /**
   * Send a notification to all connected clients
   * @param event - Event name
   * @param data - Data to send
   */
  emit(event: string, data: any) {
    if (!this.io) {
      console.error("Socket.io not initialized");
      return;
    }

    this.io.emit(event, data);
  }

  /**
   * Send a notification to a specific room
   * @param room - Room name
   * @param event - Event name
   * @param data - Data to send
   */
  emitToRoom(room: string, event: string, data: any) {
    if (!this.io) {
      console.error("Socket.io not initialized");
      return;
    }

    this.io.to(room).emit(event, data);
  }

  /**
   * Notify about a new order
   * @param order - Order data
   */
  notifyNewOrder(order: any) {
    this.emit("order:new", order);
  }

  /**
   * Notify about an order status update
   * @param order - Updated order data
   */
  notifyOrderStatusUpdate(order: any) {
    this.emit("order:status-update", order);
  }

  /**
   * Notify about a menu update
   * @param menuItem - Updated menu item
   */
  notifyMenuUpdate(menuItem: any) {
    this.emit("menu:update", menuItem);
  }

  /**
   * Notify about a category update
   * @param category - Updated category
   */
  notifyCategoryUpdate(category: any) {
    this.emit("category:update", category);
  }
}

export default new SocketService();
