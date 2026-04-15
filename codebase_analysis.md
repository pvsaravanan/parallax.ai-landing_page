# Parallax.ai Codebase Analysis

## Overview
Parallax.ai is a high-fidelity landing page for an AI-powered platform. The project is designed with a premium, editorial aesthetic, utilizing modern web technologies and advanced animation libraries to create a visually stunning user experience.

## Tech Stack
- **Framework**: Next.js 16.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Alpha/Experimental release)
- **Components**: Radix UI Primitives, Lucide React Icons
- **Animations**: Framer Motion, GSAP, Lenis (Smooth Scroll)
- **Fonts**: IBM Plex Sans, IBM Plex Mono, Bebas Neue
- **Backend Services**: Firebase (Auth and potential data handling)

## Project Structure
The project follows a monorepo structure managed by **Turborepo**, containing multiple applications and shared packages.

### Workspace Directory Structure
- `/landing_page`: The primary landing page (Next.js), focused on branding and high-fidelity animations.
- `/apps/frontend`: The main dashboard/application interface (Next.js).
- `/apps/backend`: The core API service, utilizing **Prisma** for database management and likely Node.js/Express.
- `/packages/ui`: A shared UI component library used across the various frontend applications.

### Landing Page Breakdown (Current Focus)
- `/landing_page/app`: Contains the Next.js App Router routes, global styles, and layout.
  - `(landing_page)/page.tsx`: The main entry point assembling all sections.
  - `globals.css`: Core design system, custom variants, and animation keyframes.
- `/components`: Modular UI components and landing page sections.
  - **Sections**: `hero-section`, `signals-section`, `work-section`, `principles-section`, `colophon-section`.
  - **Specialized UI**: `split-flap-text`, `scramble-text`, `draw-text`, `animated-noise`, `app-cursor`.
  - `/ui`: Reusable atomic components (likely managed via shadcn/ui).
- `/hooks`: Custom React hooks for state and interaction.
  - `use-auth.ts`: Firebase authentication integration.
  - `use-mobile.ts`: Responsive design utilities.
  - `use-toast.ts`: Notification management.
- `/lib`: Utility functions and service initializations.
  - `firebase.ts`: Firebase configuration and initialization.
  - `utils.ts`: Standard Tailwind merging and class utilities.
- `/public`: Static assets (images, svg logos).
- `/styles`: Additional styling resources.

## Key Features & Design Patterns
- **OKLCH Color Space**: Uses modern color definition for consistent brightness and saturation across the monochrome theme.
- **Editorial Aesthetic**: High contrast, strict grid systems, and large display typography.
- **Micro-interactions**: Extensive use of animated text (split-flap, scramble) and custom cursors to enhance interactivity.
- **Performance-Oriented**: Leverages smooth scrolling (Lenis) and efficient animation engines (GSAP) to maintain high frame rates.
- **Modular Sections**: Each portion of the landing page is a self-contained component, making the main page clean and easy to manage.

## Summary
The Parallax.ai codebase represents a state-of-the-art frontend implementation. It effectively balances complex animations and custom design tokens with a clean, modular architecture. The use of Tailwind CSS v4 and Next.js 16 suggests a bleeding-edge development environment focused on upcoming web standards.

## Infrastructure Observations
- **Workspace Configuration**: The `landing_page` application is currently located in the root directory and contains its own `package-lock.json`. However, it is not explicitly listed in the root `package.json` workspaces. This leads to Turbo warning about multiple lockfiles and potential inconsistency in dependency management.
- **Turbo Integration**: While scripts like `dev:landing` are present in the root `package.json`, aligning the `landing_page` directory into the `apps/` folder or updating the `workspaces` array would improve monorepo cohesion.
