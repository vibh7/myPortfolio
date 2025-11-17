# Portfolio Project Structure

This document outlines the folder structure and purpose of each directory in the portfolio project.

## Directory Overview

```
portfolio/
├── public/                 # Static assets served directly
│   ├── images/            # Static images
│   ├── manifest.json      # PWA manifest
│   ├── favicon.ico        # Favicon
│   └── vicon.svg          # Icon files
│
├── src/
│   ├── admin/             # Admin-only UI with layout system
│   │   ├── AdminLayout.jsx      # Main layout wrapper for admin
│   │   ├── AdminSidebar.jsx     # Navigation sidebar with menu
│   │   ├── AdminTopbar.jsx      # Top navigation bar with user menu
│   │   ├── AdminDashboard.jsx   # Dashboard homepage with stats
│   │   ├── BlogManager.jsx      # Blog CRUD interface
│   │   ├── Settings.jsx         # Admin settings configuration
│   │   ├── BlogAdmin.jsx        # Legacy blog admin
│   │   ├── Login.jsx            # Admin login (Firebase Auth)
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   └── index.js
│   │
│   ├── assets/            # Imported assets (images, icons used in components)
│   │   ├── images/        # Image files for components
│   │   └── icons/         # Icon files and SVGs
│   │
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Skills.jsx
│   │   ├── Toolkit.jsx
│   │   ├── Footer.jsx
│   │   ├── Blog.jsx       # Blog listing for users
│   │   └── BlogCard.jsx   # Individual blog card
│   │
│   ├── pages/             # Page-level components
│   │   ├── BlogPage.jsx   # Full blog view
│   │   └── BlogDetails.jsx # Individual blog post details
│   │
│   ├── data/              # Static data and constants
│   │   ├── projects.js    # Projects portfolio data
│   │   ├── skills.js      # Skills data
│   │   └── categories.js  # Blog categories
│   │
│   ├── hooks/             # Custom React hooks
│   │   └── useTheme.js    # Theme management hook
│   │
│   ├── context/           # React Context for state management
│   │   └── ThemeContext.jsx
│   │
│   ├── services/          # API calls and external service integration
│   │   ├── emailService.js
│   │   ├── blogService.js    # Firebase blog CRUD
│   │   ├── authService.js    # Firebase Auth
│   │   ├── notifyService.js  # Subscribe + notify users
│   │   └── index.js
│   │
│   ├── utils/             # Utility functions and helpers
│   │   ├── scrollToSection.js
│   │   ├── formatDate.js
│   │   └── index.js
│   │
│   ├── constants/         # Application constants
│   │   ├── navigation.js
│   │   └── index.js
│   │
│   ├── styles/            # Global and shared stylesheets
│   │   └── globals.css
│   │
│   ├── App.jsx            # Root component
│   ├── App.css            # App-level styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
│
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
└── README.md              # Project documentation
```

## Folder Purposes

### `/public`
Contains static files that are served as-is without processing. Perfect for images that are referenced directly in HTML, favicon, and manifest files.

### `/src/assets`
Contains images and icons that are imported in JavaScript/React components. These are processed by Vite.

### `/src/components`
Reusable React components that make up the UI. Each component is self-contained.

### `/src/pages`
Page-level components for routing and different page views:
- `BlogPage.jsx` - Main blog listing page
- `BlogDetails.jsx` - Individual blog post detailed view

### `/src/admin`
Comprehensive admin panel with layout system:
- `AdminLayout.jsx` - Main wrapper with sidebar and topbar
- `AdminSidebar.jsx` - Collapsible navigation sidebar with menu items
- `AdminTopbar.jsx` - Top navigation with user menu and notifications
- `AdminDashboard.jsx` - Dashboard homepage with stats and quick actions
- `BlogManager.jsx` - Full CRUD interface for blog posts
- `Settings.jsx` - Admin settings and configuration page
- `BlogAdmin.jsx` - Legacy blog admin component
- `Login.jsx` - Admin authentication (Firebase Auth)
- `ProtectedRoute.jsx` - Route protection wrapper

### `/src/data`
Static data files (JSON/JS) that contain portfolio information like projects and skills.

### `/src/hooks`
Custom React hooks for shared logic, like theme management.

### `/src/context`
React Context API implementations for global state management (themes, user preferences, etc.).

### `/src/services`
Integration with external services like:
- **Email sending** (EmailJS)
- **Blog management** (Firebase Firestore CRUD)
- **User authentication** (Firebase Auth)
- **Email notifications** (Subscriber management)
- API calls
- Third-party services

### `/src/utils`
Reusable utility functions such as:
- Scroll helpers
- **Date formatting** (formatDate, formatDateRelative)
- String formatters
- Validation functions

### `/src/constants`
Application-wide constants like navigation items, social links, API endpoints, etc.

### `/src/styles`
Global CSS and reusable style definitions, complementing Tailwind CSS.

## Best Practices

1. **Component Organization**: Keep components focused and single-responsibility
2. **Data Management**: Use `data/` folder for static portfolio data
3. **Reusability**: Extract common logic into `utils/` and `hooks/`
4. **Configuration**: Use environment variables for sensitive data (`.env` file)
5. **Naming**: Use clear, descriptive names for files and functions
6. **Imports**: Use index.js files to export from folders for cleaner imports

## Blog System

### Components
- **Blog.jsx** - Main blog listing with category filtering
- **BlogCard.jsx** - Reusable card component for blog post preview
- **BlogPage.jsx** - Full-page blog view (for routing)
- **BlogDetails.jsx** - Individual post detail view (for routing)

### Admin Panel
- **BlogAdmin.jsx** - Create, read, update, delete (CRUD) blog posts
- **Login.jsx** - Admin authentication interface

### Services
- **blogService.js** - Firebase Firestore CRUD operations for blog posts
- **authService.js** - Firebase authentication (sign up, sign in, sign out)
- **notifyService.js** - Email subscription and notification system

### Data & Utils
- **categories.js** - Blog categories and default posts
- **formatDate.js** - Date formatting utilities (short, long, relative formats)

### Workflow
1. Admin logs in via `Login.jsx`
2. Admin manages posts via `BlogAdmin.jsx`
3. Posts stored in Firebase Firestore (via `blogService.js`)
4. Users view blog posts on `Blog.jsx` or `BlogPage.jsx`
5. Users can subscribe for email notifications (`notifyService.js`)

## Environment Variables

Create a `.env` file based on `.env.example` with your actual values:

### Email Configuration
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID

### Firebase Configuration (for blog & auth)
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

### Application Configuration
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## Future Enhancements

- Add routing with React Router
- Implement state management with Redux or Zustand if needed
- Add API integration layer for dynamic content
- Add tests folder (`src/__tests__`) for unit tests
- Add type definitions (`src/types`) if migrating to TypeScript
