const Order = require("../models/Order");
const { addOrderToSheet } = require("../config/googleSheetService");
const { sendAdminEmail } = require("../config/email");

exports.createOrderService = async (orderData, userId) => {
  // const order = new Order({
  //   user: userId || null,
  //   name: orderData.customer?.name,
  //   ...orderData,
  // }); console.log("🔥 FULL ORDER DATA:", orderData);
  console.log("🔥 CUSTOMER:", orderData?.customer);
  console.log("🔥 NAME:", orderData?.customer?.name);

  const order = new Order({
    user: userId || null,
    name: orderData.customer?.name,
    orderItems: orderData.orderItems,
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod,
    totalPrice: orderData.totalPrice,
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
