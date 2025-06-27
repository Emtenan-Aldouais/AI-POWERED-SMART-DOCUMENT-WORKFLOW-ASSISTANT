# 🧠 IBM Granite PDF Summarizer – Proof of Concept

A simulated AI-powered PDF summarizer built with Node.js and vanilla HTML/CSS.  
This project demonstrates how IBM Granite models **could be used** to extract insights from documents.

---

## 💡 Project Idea

This tool mimics how you can upload a PDF and receive a summary and actionable recommendations using IBM Granite's capabilities — designed as a **Proof of Concept** for the IBM AI & Automation Unpacked Hackathon.

---

## ⚙️ How It Works

1. 📄 Upload a PDF file through the web interface
2. 🔍 Extracts text using `pdf-parse`
3. 🤖 Simulates a call to the **IBM Granite model**
4. 📊 Displays a summary and suggested actions in the browser

> **Note**: This app does not make real API calls to Granite — it returns a simulated response for demonstration purposes.

---

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/granite-pdf-summarizer.git
cd granite-pdf-summarizer

# 2. Install dependencies
npm install

# 3. Start the server
node index.js
