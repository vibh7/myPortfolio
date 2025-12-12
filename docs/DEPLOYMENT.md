# Deployment Guide

## Prerequisites

Before deploying, ensure:
- Project builds successfully: `npm run build`
- All environment variables are set
- Firebase project is configured
- All tests pass (if applicable)

## Deployment Platforms

### Option 1: Firebase Hosting (Recommended)

Firebase Hosting is the easiest option as it integrates with your existing Firebase backend.

#### Setup Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

#### Configure firebase.json

Ensure your `firebase.json` is configured:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": [
    {
      "codebase": "default",
      "source": "functions"
    }
  ]
}
```

#### Build and Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

#### Verify Deployment

- Check Firebase Console → Hosting
- Visit your live URL from deployment output
- Verify all features work (blog, auth, forms)

---

### Option 2: Vercel

Vercel offers excellent React/Vite support with automatic deployments.

#### Install Vercel CLI

```bash
npm install -g vercel
```

#### Deploy

```bash
# First deployment
vercel

# Subsequent deployments
vercel --prod
```

#### Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all `.env.local` variables
3. Redeploy to apply changes

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
...
```

#### Enable Preview Deployments

- Each Git push creates a preview
- Merge to main for production deployment

---

### Option 3: Netlify

Netlify provides easy deployment with GitHub integration.

#### Connect GitHub Repository

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select main branch

#### Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### Set Environment Variables

1. Site settings → Build & deploy → Environment
2. Add all `.env.local` variables:

```
VITE_FIREBASE_API_KEY=value
VITE_FIREBASE_AUTH_DOMAIN=value
...
```

#### Deploy

- Automatic on Git push to main branch
- Preview deployments for pull requests

---

### Option 4: GitHub Pages

For static sites, GitHub Pages is free.

#### Configuration

1. Update `vite.config.js`:

```javascript
export default {
  base: '/myPortfolio/',  // Your repo name
  // ... rest of config
}
```

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Deploy

Push to main branch, workflow runs automatically.

---

## Pre-Deployment Checklist

### Code Quality
- [ ] ESLint passes: `npm run lint`
- [ ] No console errors or warnings
- [ ] No hardcoded credentials
- [ ] Environment variables are correct

### Features
- [ ] Navigation works
- [ ] Blog posts display
- [ ] Forms submit successfully
- [ ] Authentication works
- [ ] Dark mode toggles correctly
- [ ] Mobile responsive

### Performance
- [ ] Build size is reasonable
- [ ] No unused dependencies
- [ ] Images are optimized
- [ ] Lazy loading is working

### Security
- [ ] No sensitive keys in code
- [ ] All env vars are in `.env.local`
- [ ] Firebase security rules are configured
- [ ] CORS is properly configured

---

## Production Optimization

### 1. Minimize Bundle Size

```bash
# Analyze bundle
npm install -D vite-plugin-visualizer

# In vite.config.js
import { visualizer } from 'vite-plugin-visualizer';

export default {
  plugins: [visualizer()]
}
```

### 2. Environment-Specific Config

Create separate environment files:

```
.env                 # Shared
.env.local          # Local development
.env.production      # Production
```

Access in code:

```javascript
if (import.meta.env.PROD) {
  // Production-only code
}
```

### 3. Image Optimization

- Use WebP format
- Compress images
- Use responsive images
- Lazy load images

```jsx
<img 
  src="image.webp" 
  alt="description"
  loading="lazy"
/>
```

### 4. Database Optimization

For Firestore:
- Create indexes for frequently queried fields
- Use pagination for large result sets
- Archive old data

```javascript
// Good query with index
db.collection('blogs')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(10)
```

### 5. Enable Caching

Configure in `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css|png|jpg|gif|svg|webp|woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## Firebase Cloud Functions Deployment

Deploy backend functions:

```bash
# Deploy only functions
firebase deploy --only functions

# Deploy with specs
firebase deploy --only functions:myFunction
```

### Function Example

**functions/index.js:**

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendWelcomeEmail = functions.firestore
  .document('subscribers/{docId}')
  .onCreate(async (snap, context) => {
    const subscriber = snap.data();
    // Send welcome email
    return await admin.firestore()
      .collection('emails')
      .add({
        to: subscriber.email,
        message: { text: 'Welcome!' }
      });
  });
```

---

## Domain Setup

### Firebase Hosting

1. Go to Firebase Console → Hosting
2. Click "Connect domain"
3. Verify domain ownership
4. Update DNS records
5. Wait for SSL certificate

### Custom Domain Steps

1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Update DNS:
   - Point to Firebase nameservers
   - Or use CNAME records
3. Verify in Firebase Console
4. SSL auto-provisions

---

## Monitoring & Analytics

### Firebase Console

- View traffic and performance
- Monitor errors and crashes
- Check Cloud Functions logs
- Review Firestore metrics

### Google Analytics

Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Rollback Procedure

### Firebase Hosting

```bash
# View deployment history
firebase hosting:sites:list

# Rollback to previous version
firebase hosting:clone <source-site> <destination-site>
```

### Vercel

- Click deployment in dashboard
- Select previous version
- Click "Promote to Production"

### Netlify

- Deploy history visible in dashboard
- Click "Publish" on previous deploy

---

## Troubleshooting

### Issue: Environment variables not loaded

**Solution:**
```bash
# Rebuild with env vars
npm run build

# For Vercel, redeploy:
vercel --prod
```

### Issue: Routes returning 404

**Solution:** Ensure SPA routing in deployment config:

**Firebase:**
```json
{
  "rewrites": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

### Issue: CORS errors

**Solution:** Update `cors.json`:

```json
{
  "origin": ["https://yourdomain.com"],
  "method": ["GET", "HEAD", "DELETE"],
  "responseHeader": ["Content-Type"],
  "maxAgeSeconds": 3600
}
```

### Issue: Firestore costs high

**Solution:**
- Set up Firestore billing alerts
- Use pagination and limits
- Archive old data
- Optimize queries
- Implement caching

---

## Post-Deployment

1. **Test Everything**
   - All pages load
   - Forms work
   - Auth flows
   - Blog management

2. **Monitor Performance**
   - Check Firebase metrics
   - Monitor error logs
   - Track analytics

3. **Backup Strategy**
   - Enable Firestore backups
   - Version control important code
   - Keep environment configs safe

4. **Update Documentation**
   - Document live URL
   - Update contact info
   - Add deployment notes
