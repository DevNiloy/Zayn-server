const nodemailer = require("nodemailer");

// 📧 Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- ১. User-er kache Confirmation Email ---
exports.sendUserConfirmationEmail = async (userEmail, orderDetails) => {
  const mailOptions = {
    from: `"Japan Halal Food" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Order Placed Successfully! ✅",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background: #1F5E3B; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
             <h2 style="color: #fff; margin: 0;">Assalamu Alaikum!</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #eee; border-radius: 0 0 10px 10px;">
          <p>Thank you for your order at <strong>Japan Halal Food</strong>.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderDetails._id}</p>
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> <span style="color: #1F5E3B; font-weight: bold;">¥${orderDetails.totalPrice.toLocaleString()}</span></p>
          </div>
          <p>We are currently processing your order. You will be notified once it is confirmed.</p>
          <br/>
          <p>Best Regards,<br/><strong>Japan Halal Food Team</strong></p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to User: ${userEmail}`);
  } catch (err) {
    console.error("❌ User Email Error:", err.message);
  }
};

// --- ২. Admin-er kache Notified Email ---
exports.sendAdminNotificationEmail = async (orderDetails) => {
  // .env theke admin email nichche, na thakle default ekti thakbe
  const adminEmail = process.env.ADMIN_EMAIL || "niloy2931@gmail.com";

  const itemsList = orderDetails.orderItems
    .map(
      (item) => `
        <li style="margin-bottom: 5px; list-style: none; padding: 5px; border-bottom: 1px solid #eee;">
            <strong>${item.name}</strong> — ${item.qty} pcs — ¥${item.price.toLocaleString()}
        </li>`,
    )
    .join("");

  const mailOptions = {
    from: `"Japan Halal Server" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: "🚀 New Order Received!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
        <div style="background: #1A2E1A; color: #fff; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">New Order Alert! 🚀</h2>
        </div>
        <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <p><strong>Order ID:</strong> ${orderDetails._id}</p>
            <p><strong>Customer Phone:</strong> ${orderDetails.shippingAddress.phone}</p>
            <p><strong>Shipping Address:</strong> ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}</p>
            
            <h4 style="color: #1A2E1A; border-bottom: 2px solid #1A2E1A; padding-bottom: 5px; margin-top: 25px;">Order Items:</h4>
            <ul style="padding: 0;">${itemsList}</ul>
            
            <div style="text-align: right; margin-top: 20px;">
                <h3 style="color: #1F5E3B; margin: 0;">Grand Total: ¥${orderDetails.totalPrice.toLocaleString()}</h3>
            </div>
            <br/>
            <p style="font-size: 12px; color: #999; text-align: center;">This is an automated message from your store server.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("🚀 Notification email sent to Admin.");
  } catch (err) {
    console.error("❌ Admin Email Error:", err.message);
  }
};
