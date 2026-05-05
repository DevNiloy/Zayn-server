const adminOrderService = require("../../services/admin/adminOrderService");

// ১. Get All Orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await adminOrderService.getAllOrdersService();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// ২. Update Order Status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedOrder = await adminOrderService.updateStatusService(req.params.id, status);

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: `Order status changed to ${status}`,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// ৩. Delete Order
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await adminOrderService.deleteOrderService(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Order deleted successfully" 
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const order = await adminOrderService.getOrderDetailsService(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};