# Project Architecture

## Overview

This portfolio application is built with React 19, Vite, Firebase, and Tailwind CSS. It follows a component-based architecture with clear separation of concerns.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, JSX |
| **Build Tool** | Vite (with Rolldown) |
| **Styling** | Tailwind CSS, PostCSS |
| **Routing** | React Router v7 |
| **State Management** | React Context API |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Cloud Functions** | Firebase Cloud Functions (Node.js) |
| **Rich Text Editor** | TipTap (with highlighting support) |
| **Animations** | Framer Motion |
| **Email** | EmailJS |
| **Icons** | Lucide React, React Icons |

## Data Flow Architecture

```
┌─────────────────────────────────────────┐
│         React Components                 │
│  (UI Layer - Navbar, Home, Blog, etc)   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Context API (Global State)          │
│  ├─ AuthContext (User, Authentication)  │
│  └─ ThemeContext (Dark/Light Mode)      │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│        Services Layer (API Layer)        │
│  ├─ authService (Firebase Auth)         │
│  ├─ blogService (Firestore CRUD)        │
│  ├─ emailService (EmailJS)              │
│  ├─ subscribeService                    │
│  ├─ notifyService (Toast notifications) │
│  └─ firebaseConfig (Firebase setup)     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      External Services                   │
│  ├─ Firebase (Auth, Firestore, Storage) │
│  ├─ EmailJS (Email delivery)            │
│  └─ Cloud Functions (Backend logic)     │
└─────────────────────────────────────────┘
```

## Component Hierarchy

```
App.jsx
├── Navbar
│   ├── Navigation Links
│   └── Theme Toggle
├── Routes
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── About
│   │   ├── Experience
│   │   ├── Projects
│   │   ├── Skills
│   │   ├── Toolkit
│   │   └── Contact/SubscribeForm
│   ├── Blog Routes
│   │   ├── AllBlogs
│   │   ├── BlogPage
│   │   └── BlogDetails
│   └── Admin Routes (Protected)
│       ├── Login
│       ├── BlogManager
│       └── BlogAdmin
└── Footer
```

## State Management

### AuthContext
**Location:** `src/context/AuthContext.jsx`

Manages user authentication and session state.

```javascript
{
  user: FirebaseUser | null,     // Current authenticated user
  loading: boolean               // Firebase initialization state
}
```

**Usage:**
```javascript
const { user, loading } = useAuth();
```

### ThemeContext
**Location:** `src/context/ThemeContext.jsx`

Manages dark/light theme preference.

```javascript
{
  isDark: boolean,
  toggleTheme: () => void
}
```

**Usage:**
```javascript
const { isDark, toggleTheme } = useTheme();
```

**Persistence:** Theme preference is saved to `localStorage` as `"theme"`.

## Services Architecture

### 1. Firebase Configuration
**File:** `src/services/firebaseConfig.js`

Initializes Firebase with environment variables and exports:
- `db` — Firestore database
- `auth` — Firebase Authentication
- `storage` — Firebase Storage

### 2. Authentication Service
**File:** `src/services/authService.js`

Handles user login, signup, logout, and authentication-related operations using Firebase Auth.

### 3. Blog Service
**File:** `src/services/blogService.js`

Manages blog CRUD operations:
- Create blog posts
- Read/Fetch posts
- Update posts
- Delete posts

Uses Firestore collections.

### 4. Email Service
**File:** `src/services/emailService.js`

Sends emails using EmailJS for contact forms and notifications.

### 5. Subscribe Service
**File:** `src/services/subscribeService.js`

Manages newsletter subscriptions.

### 6. Notification Service
**File:** `src/services/notifyService.js`

Provides toast/notification utilities for user feedback.

## File Organization

### Components (`src/components/`)
Reusable UI components:
- **Navbar** — Navigation header
- **Home** — Landing page
- **About** — About section
- **Experience** — Work experience
- **Projects** — Portfolio projects
- **Skills** — Technical skills
- **Toolkit** — Tools and technologies
- **Blog** — Blog listing
- **BlogCard** — Individual blog card
- **BlogDisplay** — Blog content display
- **Contact** — Contact form
- **SubscribeForm** — Newsletter signup
- **TiptapEditor** — Rich text editor for blogs
- **Footer** — Footer component

### Admin (`src/admin/`)
Protected admin dashboard:
- **Login** — Authentication page
- **BlogManager** — Blog CRUD interface
- **BlogAdmin** — Admin dashboard
- **ProtectedRoute** — Route protection wrapper

### Pages (`src/pages/`)
Full-page components (routed):
- **AllBlogs** — All blog posts
- **BlogPage** — Blog listing page
- **BlogDetails** — Individual blog post view

### Context (`src/context/`)
Global state management providers.

### Services (`src/services/`)
API integration and business logic.

### Utils (`src/utils/`)
Helper functions:
- `formatDate()` — Date formatting
- `gradient()` — Gradient utilities
- `scrollToSection()` — Smooth scroll navigation

### Data (`src/data/`)
Static data:
- `projects.js` — Project listings
- `skills.js` — Skills data
- `categories.js` — Blog categories

### Styles
- `styles/globals.css` — Global styles
- `App.css` — App-specific styles
- `index.css` — Entry styles
- Tailwind CSS configuration in `tailwind.config.js`

## Authentication Flow

```
User Visits App
    ↓
AuthProvider (Root)
    ↓
onAuthStateChanged() Listener Initialized
    ↓
Firebase Auth State Checked
    ├─ User Authenticated → Set user context
    └─ No User → Set user as null
    ↓
Loading: false → Render Children
    ↓
Routes Check User for Access
    ├─ Public Routes → Always accessible
    └─ Protected Routes → ProtectedRoute checks user
        ├─ User exists → Show component
        └─ No user → Redirect to Login
```

## Build & Deployment Pipeline

```
Development
    ↓
npm run build (Vite bundles)
    ↓
dist/ folder (optimized assets)
    ↓
Firebase Hosting (deployment)
    ↓
Cloud Functions (if used)
    ↓
Production Live
```

## Performance Considerations

1. **Code Splitting** — Vite automatically chunks code
2. **Lazy Loading** — Use React.lazy() for route-based components
3. **Caching** — Service Workers with Tailwind's PurgeCSS
4. **Image Optimization** — Store images in Firebase Storage
5. **Database Indexes** — Set up Firestore indexes for queries

## Security Considerations

1. **Firebase Security Rules** — Protect Firestore and Storage
2. **Environment Variables** — Never expose API keys in code
3. **Protected Routes** — Use ProtectedRoute for admin areas
4. **Authentication** — Firebase Auth handles password security
5. **CORS** — Use Firebase CORS configuration in `cors.json`

## Scalability Notes

- **Firestore Limitations** — Monitor write/read operations costs
- **Cloud Functions** — Use for backend logic not exposed to client
- **Storage** — Organize images with folder structure
- **Authentication** — Consider federated identity for multi-provider auth
