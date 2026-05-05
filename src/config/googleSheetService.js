require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const sheetId = process.env.GOOGLE_SHEET_ID;

// 🔥 create auth client (ONE TIME)
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

exports.addOrderToSheet = async (order) => {
  try {
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

    await doc.loadInfo(); // load spreadsheet

    const sheet = doc.sheetsByIndex[0]; // first sheet

    await sheet.addRow({
      Date: new Date().toISOString(),
      OrderId: order._id.toString(),
      Name: order.shippingAddress?.name || "",
      Phone: order.shippingAddress?.phone || "",
      Address: order.shippingAddress?.address || "",
      City: order.shippingAddress?.city || "",
      Products: order.orderItems
        .map((i) => `${i.name} x${i.qty}`)
        .join(", "),
      Total: order.totalPrice,
      Status: order.status || "Pending",
    });

    console.log("✅ Sheet updated successfully");
  } catch (err) {
    console.log("❌ SHEET ERROR:", err.message);
  }
};