const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ADMIN EMAIL
exports.sendAdminEmail = async (order) => {
  const products = order.orderItems
    .map((p) => `${p.name} x${p.qty}`)
    .join(", ");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🛒 New Order: ${order._id}`,
    html: `
      <h2>New Order Received</h2>
      <p><b>Name:</b> ${order.shippingAddress.name}</p>
      <p><b>Phone:</b> ${order.shippingAddress.phone}</p>
      <p><b>Address:</b> ${order.shippingAddress.address}</p>
      <p><b>Products:</b> ${products}</p>
      <p><b>Total:</b> ৳${order.totalPrice}</p>
      <p><b>Total:</b> ৳${order.totalPrice}</p>
    `,
  });
};