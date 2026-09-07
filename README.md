# 🧪 Fabiansyah Putra's Persona 3 Cyber-Laboratory UI

<p align="left">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=00F2FF&width=435&lines=Persona+3+Themed+Website" alt="Typing SVG" />
</p>

---

## 📡 System Overview

An interactive, responsive portfolio website inspired by the iconic **Persona 3 UI (Atlus)**. This project transforms the original game's visual identity into a sleek **Cyber-Industrial** and **Cyber-Laboratory** environment, utilizing customized layouts, glassmorphism panel styles, and a bento-grid layout for clean content display.

The interface mimics retro game HUD aesthetics with stylized diagonal cuts, dynamic video backdrops, and active layout components.

---

## 🛠️ Architecture & Tech Stack

This project is built using a modern JavaScript/React stack focused on high-performance rendering and smooth state transitions:

*   **Client Framework:** [React 19](https://react.dev/) with [Vite 8](https://vite.dev/) as the build tool and bundler.
*   **Routing:** [React Router DOM v7](https://reactrouter.com/) for single-page application (SPA) routing.
*   **Styling & Design System:** Custom **Vanilla CSS3** using CSS Custom Properties (Variables) for themed colors, gradients, panel shadows, and glassmorphic layouts.
*   **Motion & Animations:** [Framer Motion v12](https://www.framer.com/motion/) for fluid page transitions, slide animations, and active state highlights.
*   **Server / Production Deployment:** Simple [Express.js](https://expressjs.com/) backend wrapper to serve the compiled client-side code (`dist`) and handle client-side SPA routing fallback.

---

## 🔬 Core Customizations & Augmentations

This project is an advanced, personalized fork that customizes and extends the original template:

1.  **Aesthetic Shifts:** Transitioned the general theme to a "Cyber-Laboratory" using custom dark glass layouts and vibrant blue/teal colors.
2.  **Navigation Re-engineering:** Moved the Persona 3 navigation menu to the **lower-left** area of the screen to match classic user interface guidelines and improve visual balance.
3.  **Enhanced Side Projects:**
    *   Dynamically fetches the user's top repositories from the [GitHub API](https://docs.github.com/en/rest).
    *   Displays repo statistics (stars, forks, size) as custom styled data panels.
    *   Implements **full keyboard navigation** support (Arrow Up/Down to navigate, Escape/Backspace to go back, Enter to open the repository).
4.  **Social Links & Integrations:** Replaced placeholder channels with active professional and social networks (LinkedIn, Instagram) using custom hover-trigger cards.
5.  **Optimized UX Flow:** Replaced scroll-on-hover logic with deterministic clicks and key controls for cleaner, more intuitive interaction.

---

## 🚀 Getting Started

### 📋 Prerequisites

*   [Node.js 20+](https://nodejs.org/) (npm 10+)

### ⚙️ Quick Start (Windows Launcher)

For Windows users, you can use the pre-packaged batch script `run_app.bat` to verify your environment, install dependencies, and spin up the development environment automatically:

```bash
run_app.bat
```

---

### 🛠️ Manual Installation & Running

#### 1. Clone & Install Dependencies
Navigate to the directory and install npm packages:
```bash
npm install
```

#### 2. Run the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

#### 3. Build for Production
Compile the client-side files:
```bash
npm run build
```

#### 4. Run the Production Server
Launch the Express application to serve the production build:
```bash
npm start
```
The application will run on port `3000` (or `PORT` defined in your environment variable).

---

## ⚖️ Credits & Attribution

This project is a customized, personal evolution of the **Persona 3 UI** web experience.

*   **Original Framework / UI Base:** Deep gratitude to [blairxu13](https://github.com/blairxu13) for the [persona3-website](https://github.com/blairxu13/persona3-website) repository which served as the structural foundation of the UI.
*   **Custom Enhancements & Customization:** Heavily refactored by **Fabiansyah Putra** (`Kaze-coder` / `Kaze-coder`) to incorporate:
    *   Re-engineering name and profile data models to **Fabian**.
    *   Expanding the Resume page layout with structured professional details.
    *   Replacing Twitch/TikTok sections with custom LinkedIn/Instagram components.
    *   Designing the **Bento-grid** visual elements and glassmorphic card overlays.

> [!NOTE]  
> This project is designed for personal showcase and portfolio presentation. For licensing terms and the upstream codebase, please consult the [original repository](https://github.com/blairxu13/persona3-website).

---

## 🤝 Contributors

| Developer | Core Contributions | Profile |
| :--- | :--- | :--- |
| **blairxu13** | Original UI design, base styling, and structure template | [@blairxu13](https://github.com/blairxu13) |
| **Fabiansyah Putra** | Custom Cyber-Lab aesthetics, Bento-grid layouts, GitHub integration, and key controls | [@Kaze-coder](https://github.com/Kaze-coder) |
