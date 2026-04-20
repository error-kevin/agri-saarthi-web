# 🌱 AgriSaarthi: Cultivating a Sustainable Future

[![Live Site](https://img.shields.io/badge/Live-AgriSaarthi-2e7d32?style=for-the-badge&logo=firebase)](https://agrisaarthi.web.app/)
[![Hackathon](https://img.shields.io/badge/Track_2-Sustainability_&_Impact-orange?style=for-the-badge)](https://agrisaarthi.web.app/)

**AgriSaarthi** is an AI-powered ecosystem designed to bridge the digital divide for small and marginal farmers. By combining cutting-edge AI diagnostics with a physical-digital hybrid model (Agri-Tech Hubs), we empower farmers to combat climate change, improve soil health, and achieve economic stability.

## 🚀 Live Demo & Video
- **Web App:** [agrisaarthi.web.app](https://agrisaarthi.web.app/)
- **Functional Demo:** [Watch the Video on YouTube](https://drive.google.com/file/d/11jJzVJlVK2kLapSwBeAZQorNb5njEspV/view)

---

## 🌍 The Problem & Our Impact (Track 2)
Small farmers face "The Information Gap"—climate unpredictability, soil degradation, and lack of technical skilling. AgriSaarthi addresses these by:
- **Sustainability:** Reducing chemical waste through precise AI Pest Detection.
- **Climate Action:** Real-time weather/soil data to prevent crop loss from extreme patterns.
- **Social Impact:** Democratizing modern tools (Drones, IoT) via localized **Agri-Tech Hubs**.

## ✨ Key Features

### 1. AI-Powered Diagnostics 🧠
* **Pest & Disease Detection:** Upload crop photos for instant Machine Learning identification and organic treatment advice.
* **Yield Prediction:** Deep learning analysis of historical and environmental data to estimate outputs.
* **Soil Health Analysis:** Remote sensing integration to suggest sustainable amendments.

### 2. The Agri-Tech Hub (Unique Social Solution) 🏢
A unique "Phygital" (Physical + Digital) approach where farmers can:
* Receive hands-on training on AI apps and smart irrigation.
* Rent expensive tech like drones or smart sensors.
* Access multi-lingual digital literacy modules.

### 3. Market & Climate Intelligence 📊
* **Real-time Mandi Rates:** Direct market linkage to ensure fair pricing.
* **Hyper-local Weather:** Precision alerts to help plan activities and avoid daily "gambles."

---

## 🛠️ Technical Architecture

### **Frontend**
- **React.js & CSS3:** Responsive, high-performance web interface.
- **React Router:** For seamless single-page navigation and 404 handling.

### **Backend & AI**
- **Python (Flask):** Powering the AI processing engine and API logic.
- **TensorFlow/PyTorch:** Used for pest recognition and yield prediction models.

### **Cloud & DevOps**
- **Firebase Hosting:** Global CDN for lightning-fast frontend delivery.
- **Firestore:** NoSQL database for real-time user and farm data.
- **Firebase Authentication:** Secure login for personalized farmer dashboards.

---

## 📁 Project Structure
```bash
AGRI-SAARTHI-WEB
├── build/             # Production-ready build deployed to Firebase
├── public/            # Static assets and 404.html
├── src/
│   ├── assets/        # Project images and icons
│   ├── components/    # Reusable UI components (Navbar, Footer, Hero)
│   ├── styles/        # Global and modular CSS
│   ├── App.js         # Main Application Logic & Routing
│   ├── NotFound.js    # Custom 404 "Lost in the Fields" component
│   └── firebase.js    # Firebase configuration
├── Backend/           # Flask-based AI engine
└── firebase.json      # Hosting & deployment configurations