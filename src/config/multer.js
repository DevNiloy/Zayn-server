const multer = require("multer");
const path = require("path");
const fs = require("fs");

// --- Storage Logic ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = "others"; 
    const url = req.originalUrl.toLowerCase();

    // File type check (Video naki Image)
    const isVideo = file.mimetype.startsWith("video/");

    // Folder selection logic
    if (url.includes("subcategory")) {
      folderName = "subcategories";
    } else if (url.includes("product")) {
      folderName = "products";
    } else if (url.includes("categor")) {
      folderName = "categories";
    } else if (url.includes("banner")) {
      folderName = "banners";
    } else if (url.includes("offer")) {
      folderName = "offers";
    } else if (url.includes("auth") || url.includes("profile") || url.includes("user")) {
      folderName = "users";
    } else if (isVideo) {
      folderName = "videos"; // Default video folder jodi onno kothao match na kore
    }

    const folderPath = path.join(process.cwd(), "public/uploads", folderName);

    // Folder na thakle auto create korbe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Original extension shoho save hobe (jfif, mp4 shob support korbe)
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname).toLowerCase()
    );
  },
});

// --- File Filter (Update: JFIF & Videos Added) ---
const fileFilter = (req, file, cb) => {
  // Regex updated with jfif, mp4, webm, mov
  const allowedExtensions = /jpeg|jpg|png|webp|jfif|mp4|webm|mov|quicktime/;
  
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  
  // Mimetype check for both images and videos
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");

  if (extname && (isImage || isVideo)) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpg, png, webp, jfif) and videos (mp4, webm) are allowed!"), false);
  }
};

// --- Multer Instance ---
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 100 * 1024 * 1024 // Limit bariye 100MB kora hoyeche video-r jonno
  }, 
  fileFilter: fileFilter,
});

module.exports = upload;