# CREPDOG CREW - Investor Dataroom

A premium, "Million Dollar" investor dataroom built with **React**, **Vite**, **Tailwind CSS v4**, and **Supabase**.

![Dashboard Preview](./images/preview.png)
*(Note: Add a screenshot here after deployment)*

## 🚀 Features

-   **Glassmorphism UI**: High-end aesthetic with frosted glass effects.
-   **3D Product Visualization**: Interactive 3D rotating product showcase using React Three Fiber.
-   **Real-time Analytics**: Interactive charts for GMV, Revenue, and Store Performance.
-   **Dual Login**: Separate views for Investors (Read-only) and Admins (Edit access).
-   **Supabase Backend**: Authentication and Data storage (optional, falls back to Demo Mode).

## 🛠️ Tech Stack

-   **Framework**: React 19 + TypeScript + Vite
-   **Styling**: Tailwind CSS v4
-   **Animations**: Framer Motion
-   **3D Engine**: React Three Fiber (@react-three/fiber)
-   **Charts**: Recharts
-   **Icons**: Lucide React

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cdc-investor-dataroom.git
    cd cdc-investor-dataroom
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    -   Copy `.env.example` to `.env`
    -   Add your Supabase URL and Anon Key (optional for Demo Mode)

4.  Run Development Server:
    ```bash
    npm run dev
    ```

## 🚀 Deployment (Vercel)

1.  Push this repository to GitHub.
2.  Import the project into [Vercel](https://vercel.com).
3.  Vercel will detect Vite.
4.  Add the Environment Variables in Vercel settings:
    -   `VITE_SUPABASE_URL`
    -   `VITE_SUPABASE_ANON_KEY`
5.  Deploy!

## 🔑 Demo Credentials

If no backend is connected, use these:

-   **Investor**: `investor2026`
-   **Admin**: `admin2026`

---

© 2026 House of CDC Pvt Ltd.
