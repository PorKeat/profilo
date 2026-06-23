# Profilo

Profilo is a modern GitHub profile README builder for developers who want a polished profile without manually writing and maintaining complex Markdown.

It provides a visual builder, role-based templates, live preview, theme support, and clean Markdown export. The app is designed to run client-side first, with no account requirement and no backend storage for generated profiles.

## Features

- Drag-and-drop README builder with reusable profile blocks
- Live Markdown preview while editing
- Role-based templates for different developer profiles
- GitHub-focused blocks such as stats, activity, skills, projects, socials, and banners
- Multiple visual themes for README output
- Markdown export ready to paste into a GitHub profile repository
- Client-side profile generation with no required login
- Responsive marketing pages and builder interface

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Framer Motion
- DnD Kit
- React Markdown
- Lucide React

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

If port `3000` is already in use, Next.js will automatically select another available port.

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  app/
    (marketing)/        Marketing pages
    api/                API routes
    builder/            README builder page
  components/
    blocks/             Editable README block controls
    builder/            Builder UI components
    icons/              Custom icons
    layout/             Shared layout components
    ui/                 Reusable UI primitives
  lib/
    constants/          Shared constants
    markdown/           Markdown generation logic
    templates.ts        Profile template definitions
  store/                Redux state management
  types/                Shared TypeScript types
public/
  images/               Public image assets
```

## Core Workflow

1. Choose a starting template or begin from a blank profile.
2. Add, remove, reorder, and customize README blocks.
3. Preview the generated README in real time.
4. Export the final Markdown.
5. Paste the Markdown into your GitHub profile repository README.

## Available Blocks

Profilo includes editable blocks for common developer profile sections, including:

- Hero
- About
- Skills
- Projects
- Experience
- GitHub stats
- Activity graph
- Trophies
- Social links
- Contact
- Blog posts
- Terminal-style sections
- Typing text
- Support links
- Spotify
- Snake and Pacman-style contribution visuals

## Privacy

Profilo is built with a privacy-conscious approach. Profile content is generated in the browser, and the app does not require user authentication to build and export a README.

If an API integration is added or enabled, document the data flow clearly before shipping it.

## Development Notes

- Keep generated Markdown logic in `src/lib/markdown`.
- Keep shared domain types in `src/types`.
- Add new profile blocks through the block type definitions, default block factory, editor component, and markdown generator.
- Prefer existing UI primitives and layout patterns before adding new abstractions.
- Run TypeScript and lint checks before committing changes.

## Deployment

The app can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or a Node.js server.

For Vercel, connect the repository and use the default Next.js build settings:

```bash
npm run build
```

## License

This project is currently private. Add a license before publishing or accepting external contributions.
