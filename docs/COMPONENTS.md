# Components Documentation

## Layout Components

### Navbar
**File:** `src/components/Navbar.jsx`

Navigation header with menu links and theme toggle.

**Props:** None

**Features:**
- Responsive navigation menu
- Theme toggle (dark/light mode)
- Active link highlighting
- Mobile menu support

**Usage:**
```jsx
import Navbar from '@/components/Navbar';

<Navbar />
```

---

### Footer
**File:** `src/components/Footer.jsx`

Footer component with links and information.

**Props:** None

**Features:**
- Social media links
- Quick navigation
- Copyright information
- Contact info

**Usage:**
```jsx
import Footer from '@/components/Footer';

<Footer />
```

---

## Page Components

### Home
**File:** `src/components/Home.jsx`

Landing/hero section of the portfolio.

**Props:** None

**Features:**
- Hero animation
- Call-to-action buttons
- Introduction text
- Profile image

**Usage:**
```jsx
import Home from '@/components/Home';

<Home />
```

---

### About
**File:** `src/components/About.jsx`

About me section with background information.

**Props:** None

**Features:**
- Personal bio
- Background story
- Skills highlight
- Download resume button

**Usage:**
```jsx
import About from '@/components/About';

<About />
```

---

### Experience
**File:** `src/components/Experience.jsx`

Work experience timeline section.

**Props:** None

**Features:**
- Timeline layout
- Job positions
- Descriptions
- Date ranges

**Usage:**
```jsx
import Experience from '@/components/Experience';

<Experience />
```

---

### Projects
**File:** `src/components/Projects.jsx`

Portfolio projects showcase.

**Props:** None

**Features:**
- Project grid layout
- Project cards
- Filter by category
- Links to live projects

**Usage:**
```jsx
import Projects from '@/components/Projects';

<Projects />
```

---

### Skills
**File:** `src/components/Skills.jsx`

Technical skills section.

**Props:** None

**Features:**
- Skill categories
- Skill bars/ratings
- Technology logos
- Proficiency levels

**Usage:**
```jsx
import Skills from '@/components/Skills';

<Skills />
```

---

### Toolkit
**File:** `src/components/Toolkit.jsx`

Tools and technologies used.

**Props:** None

**Features:**
- Tool categories
- Tool icons
- Descriptions
- Version info

**Usage:**
```jsx
import Toolkit from '@/components/Toolkit';

<Toolkit />
```

---

### Contact
**File:** `src/components/Contact.jsx`

Contact form section.

**Props:** None

**Features:**
- Contact form fields
- Form validation
- Error messages
- Submit handler

**Usage:**
```jsx
import Contact from '@/components/Contact';

<Contact />
```

---

## Feature Components

### Blog
**File:** `src/components/Blog.jsx`

Blog section showing latest posts.

**Props:** None

**Features:**
- Blog post list
- Preview cards
- Read more links
- Search/filter

**Usage:**
```jsx
import Blog from '@/components/Blog';

<Blog />
```

---

### BlogCard
**File:** `src/components/BlogCard.jsx`

Individual blog post card component.

**Props:**
```javascript
{
  id: string,              // Post ID
  title: string,           // Post title
  excerpt: string,         // Post excerpt
  image: string,           // Post image URL
  category: string,        // Post category
  date: string|Date,       // Publication date
  author: string,          // Author name
  readTime: number,        // Estimated read time (minutes)
  tags: string[]          // Post tags
}
```

**Features:**
- Card layout
- Image thumbnail
- Category badge
- Click to view full post

**Usage:**
```jsx
import BlogCard from '@/components/BlogCard';

<BlogCard 
  id="blog1"
  title="React Tips"
  excerpt="Learn best practices..."
  image="url"
  category="React"
  date={new Date()}
  author="John"
  readTime={5}
  tags={['react', 'web']}
/>
```

---

### BlogDisplay
**File:** `src/components/BlogDisplay.jsx`

Displays full blog post content.

**Props:**
```javascript
{
  blog: {
    title: string,
    content: string,       // HTML content
    author: string,
    date: Date,
    category: string,
    tags: string[]
  }
}
```

**Features:**
- Full content rendering
- HTML support
- Formatted date
- Category tag
- Share buttons

**Usage:**
```jsx
import BlogDisplay from '@/components/BlogDisplay';

<BlogDisplay blog={blogData} />
```

---

### SubscribeForm
**File:** `src/components/SubscribeForm.jsx`

Newsletter subscription form.

**Props:** None

**Features:**
- Email input
- Subscribe button
- Validation
- Success/error messages
- Loading state

**Usage:**
```jsx
import SubscribeForm from '@/components/SubscribeForm';

<SubscribeForm />
```

---

## Editor Components

### TiptapEditor
**File:** `src/components/TiptapEditor.jsx`

Rich text editor for blog content creation.

**Props:**
```javascript
{
  value: string,                    // Initial content (HTML)
  onChange: (content: string) => void,  // Content change callback
  placeholder: string,              // Editor placeholder
  readOnly: boolean,               // Read-only mode
  maxCharacters: number            // Character limit
}
```

**Features:**
- Rich text formatting (bold, italic, underline)
- Code block support with syntax highlighting
- Link insertion
- Image upload
- Character counter
- Toolbar
- Markdown support

**Usage:**
```jsx
import TiptapEditor from '@/components/TiptapEditor';

const [content, setContent] = useState('');

<TiptapEditor 
  value={content}
  onChange={setContent}
  placeholder="Write your blog post..."
  maxCharacters={10000}
/>
```

---

## Admin Components

### Login
**File:** `src/admin/Login.jsx`

Admin login page.

**Props:** None

**Features:**
- Email input
- Password input
- Login button
- Error handling
- Redirect on success

**Usage:**
```jsx
import Login from '@/admin/Login';

<Login />
```

---

### BlogManager
**File:** `src/admin/BlogManager.jsx`

Blog post management interface.

**Props:** None

**Features:**
- List all blog posts
- Create new post
- Edit existing posts
- Delete posts
- Bulk actions
- Search/filter

**Usage:**
```jsx
import BlogManager from '@/admin/BlogManager';

<BlogManager />
```

---

### BlogAdmin
**File:** `src/admin/BlogAdmin.jsx`

Main admin dashboard.

**Props:** None

**Features:**
- Admin overview
- Quick stats
- Recent activity
- Navigation to management pages

**Usage:**
```jsx
import BlogAdmin from '@/admin/BlogAdmin';

<BlogAdmin />
```

---

### ProtectedRoute
**File:** `src/admin/ProtectedRoute.jsx`

Route protection wrapper for admin pages.

**Props:**
```javascript
{
  children: ReactNode,    // Component to protect
  redirectTo: string     // Redirect path if not authenticated
}
```

**Features:**
- Check authentication
- Show loading state
- Redirect if not authenticated
- Pass user to component

**Usage:**
```jsx
import ProtectedRoute from '@/admin/ProtectedRoute';

<ProtectedRoute redirectTo="/admin/login">
  <BlogAdmin />
</ProtectedRoute>
```

---

## Using Components

### Import Paths

Use alias imports (configured in vite.config.js):

```jsx
// ✅ Good
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

// ❌ Avoid
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
```

---

## Component Best Practices

1. **Props Validation**
   ```jsx
   BlogCard.propTypes = {
     title: PropTypes.string.isRequired,
     excerpt: PropTypes.string,
   };
   ```

2. **Default Props**
   ```jsx
   BlogCard.defaultProps = {
     readTime: 5,
     tags: []
   };
   ```

3. **Memo for Performance**
   ```jsx
   export default memo(BlogCard);
   ```

4. **Error Boundary**
   ```jsx
   <ErrorBoundary>
     <BlogDisplay />
   </ErrorBoundary>
   ```

5. **Loading States**
   ```jsx
   if (loading) return <Skeleton />;
   if (error) return <ErrorMessage error={error} />;
   return <Content />;
   ```

---

## Styling Components

All components use **Tailwind CSS** classes for styling:

```jsx
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Title</h1>
</div>
```

### Dark Mode Support

Components support dark mode using Tailwind's `dark:` prefix:

```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

---

## Animation Components

Components use **Framer Motion** for animations:

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

---

## Icon Usage

Components use **Lucide React** and **React Icons**:

```jsx
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

<Menu size={24} />
<FaGithub />
```
