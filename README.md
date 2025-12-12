# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── images/            # Image assets
├── src/                   # Source code
│   ├── admin/            # Admin dashboard pages
│   │   ├── BlogAdmin.jsx
│   │   ├── BlogManager.jsx
│   │   ├── Login.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── index.js
│   ├── assets/           # Icons and images
│   │   ├── icons/
│   │   └── images/
│   ├── components/       # Reusable React components
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogCard.jsx
│   │   ├── BlogDisplay.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── SubscribeForm.jsx
│   │   ├── TiptapEditor.jsx
│   │   └── Toolkit.jsx
│   ├── context/          # React Context for global state
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/             # Static data files
│   │   ├── categories.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── hooks/            # Custom React hooks
│   │   └── useTheme.js
│   ├── pages/            # Full page components
│   │   ├── AllBlogs.jsx
│   │   ├── BlogDetails.jsx
│   │   └── BlogPage.jsx
│   ├── services/         # API & external service integrations
│   │   ├── authService.js
│   │   ├── blogService.js
│   │   ├── emailService.js
│   │   ├── firebaseConfig.js
│   │   ├── notifyService.js
│   │   ├── subscribeService.js
│   │   └── index.js
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── utils/            # Utility functions
│   │   ├── formatDate.js
│   │   ├── gradient.js
│   │   ├── scrollToSection.js
│   │   └── index.js
│   ├── App.jsx           # Root component
│   ├── App.css           # App styles
│   ├── index.css         # Global CSS
│   └── main.jsx          # Entry point
├── functions/            # Firebase Cloud Functions
│   ├── index.js
│   └── package.json
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
├── firebase.json         # Firebase configuration
├── cors.json             # CORS configuration
├── package.json          # Project dependencies
├── PROJECT_STRUCTURE.md  # Detailed structure documentation
└── README.md             # This file
```

## Key Features

- **React + Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **Firebase** — Backend services and authentication
- **Context API** — Global state management
- **Admin Dashboard** — Blog management with protected routes
- **Dark Mode** — Theme switching capability
- **Responsive Design** — Mobile-first approach

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
