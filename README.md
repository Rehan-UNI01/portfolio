# Mohammad Rehan - Personal Portfolio Website

Modern, responsive personal developer portfolio website built with **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Live Info & Links
- **Name:** Mohammad Rehan
- **Role:** B.Tech CSE Student (1st Semester)
- **College:** JECRC University, Jaipur, Rajasthan, INDIA
- **Email:** rehanbcon0974@jecrcu.edu.in
- **LinkedIn:** [Mohammad Rehan](https://www.linkedin.com/in/mohammad-rehan-83aa21302/)
- **GitHub:** [@Rehan-UNI01](https://github.com/Rehan-UNI01)

---

## 🛠️ Tech Stack
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS (with glassmorphism, responsive utilities, custom animations)
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti, smooth scrolling, ambient glow backgrounds
- **Deployment:** Vercel ready (`vercel.json` included)

---

## 📂 Project Structure
```
portfolio/
├── public/
│   └── favicon.svg           # Custom SVG monogram favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky glass header + mobile drawer + active spy
│   │   ├── Hero.jsx          # Intro, CTAs, interactive terminal badge, socials
│   │   ├── About.jsx         # Professional story, metrics, and core focus areas
│   │   ├── Education.jsx     # B.Tech at JECRC University & coursework
│   │   ├── Skills.jsx        # Attractive categorized cards with proficiency levels
│   │   ├── Projects.jsx      # Project cards with details modal & links
│   │   ├── Achievements.jsx  # Extensible milestones, certs, hackathons & awards
│   │   ├── Contact.jsx       # 1-click email copy, interactive message form
│   │   └── Footer.jsx        # Brand info, quick navigation, back-to-top button
│   ├── data/
│   │   └── portfolioData.js  # Central data file to easily edit all content!
│   ├── App.jsx               # Main application component
│   ├── index.css             # Tailwind imports & custom utilities
│   └── main.jsx              # App entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## 🏃 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## ✏️ How to Customize Your Content
All personal information, education, skills, projects, and achievements are centralized in:
👉 `src/data/portfolioData.js`

Simply edit that file to add new projects, update achievements, or modify contact information!
