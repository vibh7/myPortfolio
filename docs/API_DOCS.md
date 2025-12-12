# API Documentation

## Firebase Configuration

**File:** `src/services/firebaseConfig.js`

Initializes Firebase services and exports instances for use throughout the app.

```javascript
import { db, auth, storage } from '@/services/firebaseConfig';
```

### Exports

| Export | Type | Description |
|--------|------|-------------|
| `db` | Firestore | Database instance |
| `auth` | Auth | Authentication instance |
| `storage` | Storage | File storage instance |

---

## Authentication Service

**File:** `src/services/authService.js`

Handles user authentication with Firebase Auth.

### Methods

#### `loginUser(email, password)`
Logs in a user with email and password.

```javascript
import { loginUser } from '@/services/authService';

try {
  const user = await loginUser('user@example.com', 'password123');
  console.log('Logged in:', user.uid);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

**Parameters:**
- `email` (string) — User email
- `password` (string) — User password

**Returns:** `Promise<User>` — Firebase User object

---

#### `signupUser(email, password)`
Creates a new user account.

```javascript
import { signupUser } from '@/services/authService';

try {
  const user = await signupUser('newuser@example.com', 'password123');
  console.log('Account created:', user.uid);
} catch (error) {
  console.error('Signup failed:', error.message);
}
```

**Parameters:**
- `email` (string) — New user email
- `password` (string) — New user password

**Returns:** `Promise<User>` — Firebase User object

---

#### `logoutUser()`
Logs out the current user.

```javascript
import { logoutUser } from '@/services/authService';

try {
  await logoutUser();
  console.log('User logged out');
} catch (error) {
  console.error('Logout failed:', error.message);
}
```

**Returns:** `Promise<void>`

---

## Blog Service

**File:** `src/services/blogService.js`

Manages blog post operations in Firestore.

### Collections
- **blogs** — Stores blog post documents

### Methods

#### `createBlog(blogData)`
Creates a new blog post.

```javascript
import { createBlog } from '@/services/blogService';

const newBlog = {
  title: 'My First Post',
  content: '<p>Hello World</p>',
  category: 'Technology',
  author: 'John Doe',
  tags: ['react', 'web'],
  image: 'image-url',
  excerpt: 'A great post about...',
  published: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

try {
  const docId = await createBlog(newBlog);
  console.log('Blog created with ID:', docId);
} catch (error) {
  console.error('Create failed:', error);
}
```

**Parameters:**
- `blogData` (object) — Blog post data

**Returns:** `Promise<string>` — Document ID

---

#### `getAllBlogs()`
Fetches all published blog posts.

```javascript
import { getAllBlogs } from '@/services/blogService';

try {
  const blogs = await getAllBlogs();
  console.log('All blogs:', blogs);
} catch (error) {
  console.error('Fetch failed:', error);
}
```

**Returns:** `Promise<Array>` — Array of blog documents

---

#### `getBlogById(id)`
Fetches a single blog post by ID.

```javascript
import { getBlogById } from '@/services/blogService';

try {
  const blog = await getBlogById('blog123');
  console.log('Blog:', blog);
} catch (error) {
  console.error('Fetch failed:', error);
}
```

**Parameters:**
- `id` (string) — Document ID

**Returns:** `Promise<object>` — Blog document data

---

#### `updateBlog(id, updates)`
Updates an existing blog post.

```javascript
import { updateBlog } from '@/services/blogService';

try {
  await updateBlog('blog123', {
    title: 'Updated Title',
    updatedAt: new Date()
  });
  console.log('Blog updated');
} catch (error) {
  console.error('Update failed:', error);
}
```

**Parameters:**
- `id` (string) — Document ID
- `updates` (object) — Fields to update

**Returns:** `Promise<void>`

---

#### `deleteBlog(id)`
Deletes a blog post.

```javascript
import { deleteBlog } from '@/services/blogService';

try {
  await deleteBlog('blog123');
  console.log('Blog deleted');
} catch (error) {
  console.error('Delete failed:', error);
}
```

**Parameters:**
- `id` (string) — Document ID

**Returns:** `Promise<void>`

---

#### `searchBlogs(query)`
Searches blog posts by title or content.

```javascript
import { searchBlogs } from '@/services/blogService';

try {
  const results = await searchBlogs('react');
  console.log('Search results:', results);
} catch (error) {
  console.error('Search failed:', error);
}
```

**Parameters:**
- `query` (string) — Search term

**Returns:** `Promise<Array>` — Matching blog documents

---

#### `getBlogsByCategory(category)`
Filters blogs by category.

```javascript
import { getBlogsByCategory } from '@/services/blogService';

try {
  const blogs = await getBlogsByCategory('Technology');
  console.log('Technology blogs:', blogs);
} catch (error) {
  console.error('Fetch failed:', error);
}
```

**Parameters:**
- `category` (string) — Blog category

**Returns:** `Promise<Array>` — Blog documents in category

---

## Email Service

**File:** `src/services/emailService.js`

Sends emails using EmailJS.

### Methods

#### `sendContactEmail(formData)`
Sends a contact form email.

```javascript
import { sendContactEmail } from '@/services/emailService';

const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I would like to discuss...',
  subject: 'Project Inquiry'
};

try {
  await sendContactEmail(formData);
  console.log('Email sent');
} catch (error) {
  console.error('Email failed:', error);
}
```

**Parameters:**
- `formData` (object) — Contact form data
  - `name` (string) — Sender name
  - `email` (string) — Sender email
  - `message` (string) — Message content
  - `subject` (string) — Email subject

**Returns:** `Promise<void>`

---

#### `sendWelcomeEmail(email, name)`
Sends a welcome email to new subscribers.

```javascript
import { sendWelcomeEmail } from '@/services/emailService';

try {
  await sendWelcomeEmail('user@example.com', 'John');
  console.log('Welcome email sent');
} catch (error) {
  console.error('Email failed:', error);
}
```

**Parameters:**
- `email` (string) — Recipient email
- `name` (string) — Recipient name

**Returns:** `Promise<void>`

---

## Subscribe Service

**File:** `src/services/subscribeService.js`

Manages newsletter subscriptions.

### Methods

#### `addSubscriber(email)`
Adds a new email subscriber.

```javascript
import { addSubscriber } from '@/services/subscribeService';

try {
  await addSubscriber('user@example.com');
  console.log('Subscribed successfully');
} catch (error) {
  console.error('Subscription failed:', error);
}
```

**Parameters:**
- `email` (string) — Subscriber email

**Returns:** `Promise<void>`

---

#### `removeSubscriber(email)`
Removes an email subscriber.

```javascript
import { removeSubscriber } from '@/services/subscribeService';

try {
  await removeSubscriber('user@example.com');
  console.log('Unsubscribed');
} catch (error) {
  console.error('Unsubscribe failed:', error);
}
```

**Parameters:**
- `email` (string) — Subscriber email

**Returns:** `Promise<void>`

---

#### `getAllSubscribers()`
Fetches all subscribers (admin only).

```javascript
import { getAllSubscribers } from '@/services/subscribeService';

try {
  const subscribers = await getAllSubscribers();
  console.log('Total subscribers:', subscribers.length);
} catch (error) {
  console.error('Fetch failed:', error);
}
```

**Returns:** `Promise<Array>` — Subscriber email list

---

## Notification Service

**File:** `src/services/notifyService.js`

Provides toast notification utilities.

### Methods

#### `showSuccess(message)`
Shows a success notification.

```javascript
import { showSuccess } from '@/services/notifyService';

showSuccess('Operation completed successfully!');
```

**Parameters:**
- `message` (string) — Success message

---

#### `showError(message)`
Shows an error notification.

```javascript
import { showError } from '@/services/notifyService';

showError('Something went wrong!');
```

**Parameters:**
- `message` (string) — Error message

---

#### `showInfo(message)`
Shows an info notification.

```javascript
import { showInfo } from '@/services/notifyService';

showInfo('Please check your email.');
```

**Parameters:**
- `message` (string) — Info message

---

#### `showWarning(message)`
Shows a warning notification.

```javascript
import { showWarning } from '@/services/notifyService';

showWarning('This action cannot be undone.');
```

**Parameters:**
- `message` (string) — Warning message

---

## Context Hooks

### useAuth()

**File:** `src/context/AuthContext.jsx`

```javascript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;
  
  return <p>Welcome, {user.email}</p>;
}
```

**Returns:**
```javascript
{
  user: FirebaseUser | null,
  loading: boolean
}
```

---

### useTheme()

**File:** `src/hooks/useTheme.js`

```javascript
import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

**Returns:**
```javascript
{
  isDark: boolean,
  toggleTheme: () => void
}
```

---

## Utility Functions

### formatDate(date)
**File:** `src/utils/formatDate.js`

Formats a date object to readable string.

```javascript
import { formatDate } from '@/utils/formatDate';

const formatted = formatDate(new Date());
// Output: "Dec 12, 2025"
```

---

### scrollToSection(id)
**File:** `src/utils/scrollToSection.js`

Smoothly scrolls to a DOM element by ID.

```javascript
import { scrollToSection } from '@/utils/scrollToSection';

scrollToSection('about');
```

---

### gradient()
**File:** `src/utils/gradient.js`

Returns a gradient style object.

```javascript
import { gradient } from '@/utils/gradient';

const style = gradient('purple', 'pink');
// Use in style prop
```

---

## Environment Variables

Required `.env.local` variables:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# EmailJS
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Error Handling

Most services return promises that may reject with Firebase or EmailJS errors.

```javascript
try {
  await someService();
} catch (error) {
  if (error.code === 'auth/user-not-found') {
    console.error('User not found');
  } else if (error.code === 'auth/wrong-password') {
    console.error('Wrong password');
  } else {
    console.error('Unknown error:', error.message);
  }
}
```
