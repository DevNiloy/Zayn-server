// src/server.js
require("dotenv").config();
const connectDB = require("../src/config/db"); // আপনার MongoDB কানেকশন ফাংশন
const app = require("./app");
// .env ফাইল লোড করা

const PORT = process.env.PORT || 5001;

// ডেটাবেস কানেকশন শুরু করা (যদি কানেক্টDB ফাংশন async হয়)
connectDB();

// সার্ভার চালু করা
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
