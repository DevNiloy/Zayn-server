const Order = require("../../src/models/Order");
const { sendUserConfirmationEmail, sendAdminNotificationEmail } = require("../services/notificationService");

exports.createOrderService = async (orderData, userId) => {
  // 1. Database-e save kora
  const order = new Order({
    user: userId,
    ...orderData,
  });
  const savedOrder = await order.save();

  // 2. ⚡ Notification trigger (Background-e)
  // userEmail body theke ashte hobe
  if (orderData.userEmail) {
    sendUserConfirmationEmail(orderData.userEmail, savedOrder);
  }
  sendAdminNotificationEmail(savedOrder);

  return savedOrder;
};