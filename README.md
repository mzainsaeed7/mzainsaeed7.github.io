# Muhammad Zain - Interactive Developer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

A high-performance, immersive 3D developer portfolio built with the modern React stack. Designed to showcase technical expertise through interactive visualizations, physics-based animations, and a cohesive "expert" aesthetic.

## 🚀 Key Features

- **Global Dependency Graph**: A persistent, force-directed 3D background visualization representing "codebase architecture" that reacts to mouse interaction across all pages.
- **Architect's Cursor**: A custom, precision-based magnetic cursor that snaps to interactive elements and provides visual feedback.
- **Physics-Based Hero**: Interactive 3D floating code symbols with real-time collision physics using `@react-three/cannon` concepts.
- **Premium UI/UX**:
  - **Horizontal Scroll Projects**: Unique horizontal scrolling gallery for project showcases.
  - **Experience Timeline**: Connected vertical timeline with scroll-triggered path animations.
  - **Magnetic Buttons**: Interactive buttons that magnetically pull towards the cursor.
- **Performance Optimized**: Built for speed with static generation (`output: 'export'`), optimized assets, and efficient React rendering cycles.

## 🛠️ Tech Stack & Versions

- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/) (RC)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **3D & WebGL**: [Three.js 0.182](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building & Deployment

This project is configured for **Static Export** to ensure compatibility with virtually any hosting provider (GitHub Pages, Netlify, Vercel Static).

### Build for Production
```bash
npm run build
```
This command generates a static `out/` directory containing the optimized HTML, CSS, and JS assets.

### Deploy to GitHub Pages
1.  Push your code to a GitHub repository.
2.  Go to **Settings > Pages**.
3.  Choose **GitHub Actions** as the source (recommended) or deploy from the `gh-pages` branch if you have a workflow set up.

## 📁 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages and layouts
├── components/
│   ├── layout/           # Global layout components (Navbar, Background)
│   ├── sections/         # Page sections (Hero, About, Projects, etc.)
│   ├── three/            # 3D Canvas components (HeroCanvas, Scene)
│   ├── ui/               # Reusable UI components (Buttons, Cards, Cursor)
│   └── providers/        # Context providers (Theme, Scroll)
└── lib/                  # Utilities, constants, and hooks
```

---

© 2026 Muhammad Zain. All Rights Reserved.
