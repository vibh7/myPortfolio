# Setup & Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** for version control
- **Firebase Account** for backend services
- **EmailJS Account** for email functionality

## Installation Steps

### 1. Clone or Download the Project

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory (`portfolio/`) and add your environment variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable these services:
   - **Authentication** (Email/Password, Google Sign-in)
   - **Firestore Database** (for blog posts)
   - **Storage** (for images)
4. Copy your Firebase config values to `.env.local`

### 5. EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com)
2. Create a service (Gmail, Outlook, etc.)
3. Create email templates
4. Get your Service ID, Template ID, and Public Key
5. Add them to `.env.local`

### 6. Tailwind CSS & PostCSS

The project is pre-configured with:
- **tailwind.config.js** — Tailwind CSS configuration
- **postcss.config.js** — PostCSS with Tailwind and Autoprefixer
- **tailwind.config.js** — Uses `@tailwindcss/typography` for blog content

No additional setup needed!

## Running the Project

### Development Mode

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

Checks code style with ESLint.

## Project Structure

See [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md) for detailed directory layout.

## Common Issues

### Issue: `Cannot use 'import.meta' outside a module`

**Solution:** Ensure `"type": "module"` is in `package.json` and use ES import syntax in all files.

### Issue: Firebase Connection Failed

**Solution:** 
- Verify `.env.local` has correct Firebase credentials
- Check Firebase project security rules
- Ensure Firebase project is active

### Issue: EmailJS Not Sending Emails

**Solution:**
- Verify EmailJS credentials in `.env.local`
- Check email template format
- Ensure email service is activated in EmailJS dashboard

### Issue: Tailwind Styles Not Appearing

**Solution:**
- Verify `content` paths in `tailwind.config.js`
- Rebuild with `npm run build`
- Clear browser cache

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand project structure
2. Check [API_DOCS.md](./API_DOCS.md) for service documentation
3. Review [COMPONENTS.md](./COMPONENTS.md) for component usage
4. See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
