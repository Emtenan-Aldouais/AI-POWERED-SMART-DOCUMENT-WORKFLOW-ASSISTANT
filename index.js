const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 3000;

// إعداد مجلد مؤقت لتخزين ملفات الرفع
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

// متغير لتخزين نتيجة التلخيص المؤقتة
let cachedResult = null;
let currentPdfPath = path.join(__dirname, "AI-and-Automation-Unpacked-Hackathon-June-2025.pdf");

// قراءة ملف PDF من المسار المحدد
const readPdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
};

// محاكاة استدعاء Granite API
const summarizeWithGranite = async (text) => {
  return {
    summary: "This is a simulated summary based on the uploaded PDF content.",
    actions: [
      "Analyze key themes using AI",
      "Extract structured insights from documents",
      "Apply IBM Granite to enterprise use cases",
    ],
  };
};

// API للحصول على نتيجة التلخيص الحالية
app.get("/result", async (req, res) => {
  try {
    if (cachedResult) {
      return res.json(cachedResult);
    }
    const pdfText = await readPdf(currentPdfPath);
    const result = await summarizeWithGranite(pdfText);
    cachedResult = result;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

// API لاستقبال رفع ملف PDF جديد
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // حدف الملف القديم مؤقتًا (اختياري)
    if (fs.existsSync(currentPdfPath)) {
      fs.unlinkSync(currentPdfPath);
    }

    // إعادة تسمية الملف المرفوع ليصبح الملف المستخدم الحالي
    const newPath = path.join(__dirname, "uploads", req.file.filename + ".pdf");
    fs.renameSync(req.file.path, newPath);
    currentPdfPath = newPath;

    // قراءة وتحليل الملف الجديد
    const pdfText = await readPdf(currentPdfPath);
    cachedResult = await summarizeWithGranite(pdfText);

    res.json({ message: "File uploaded and processed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload or process PDF" });
  }
});

// بدء السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
