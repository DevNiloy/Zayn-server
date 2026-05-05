const Order = require("../models/Order");
const { addOrderToSheet } = require("../config/googleSheetService");
const { sendAdminEmail } = require("../config/email");

exports.createOrderService = async (orderData, userId) => {
  const order = new Order({
    user: userId || null,
    ...orderData,
  });

  const savedOrder = await order.save();

  // ❌ missing function fixed
  if (orderData.customer?.email) {
    // optional user email send logic (if you add later)
  }

  // ✅ ADMIN EMAIL
  await sendAdminEmail(savedOrder);

  // ✅ GOOGLE SHEET
  await addOrderToSheet(savedOrder);

  return savedOrder;
};