# Contributing Guide

## Code Standards

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase with `.jsx` | `BlogCard.jsx`, `Navbar.jsx` |
| Regular JavaScript | camelCase with `.js` | `blogService.js`, `useTheme.js` |
| Folders | lowercase with hyphen | `src/components`, `src/services` |
| Constants | UPPER_SNAKE_CASE | `MAX_BLOG_LENGTH`, `DEFAULT_THEME` |

---

### Code Style

#### JavaScript/React

Use arrow functions and modern syntax:

```javascript
// ✅ Good
const BlogCard = ({ title, excerpt }) => {
  return <div className="...">Content</div>;
};

// ❌ Avoid
function BlogCard(props) {
  return <div className="...">Content</div>;
}
```

#### Imports

Keep imports organized:

```javascript
// 1. External libraries
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Internal imports
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

// 3. Styles
import '@/styles/globals.css';
```

#### Naming Conventions

```javascript
// ✅ Good
const isUserLoggedIn = true;
const handleButtonClick = () => {};
const fetchBlogPosts = async () => {};

// ❌ Avoid
const bool = true;
const onClick = () => {};
const get = async () => {};
```

#### Comments

```javascript
// ✅ Good - explains WHY, not WHAT
// Delay auth check to ensure Firebase initializes
const [loading, setLoading] = useState(true);

// ❌ Avoid - obvious from code
// Set loading to true
const [loading, setLoading] = useState(true);
```

---

## Project Structure Conventions

### Adding New Components

1. Create file in appropriate folder
2. Use PascalCase naming
3. Export as default
4. Include PropTypes or TypeScript (optional)

**Example: `src/components/NewFeature.jsx`**

```jsx
import { memo } from 'react';
import PropTypes from 'prop-types';

const NewFeature = ({ title, children }) => {
  return (
    <div className="...">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

NewFeature.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

NewFeature.defaultProps = {
  children: null
};

export default memo(NewFeature);
```

### Adding New Services

1. Create file in `src/services/`
2. Use camelCase naming
3. Export functions as named exports
4. Include error handling

**Example: `src/services/newService.js`**

```javascript
export const getData = async (id) => {
  try {
    // Implementation
    return data;
  } catch (error) {
    console.error('Failed to get data:', error);
    throw error;
  }
};

export const updateData = async (id, updates) => {
  try {
    // Implementation
    return result;
  } catch (error) {
    console.error('Failed to update data:', error);
    throw error;
  }
};
```

### Adding New Utilities

1. Create file in `src/utils/`
2. Export pure functions
3. Include documentation

**Example: `src/utils/helpers.js`**

```javascript
/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};
```

---

## Styling Guidelines

### Tailwind CSS

- Use Tailwind classes for styling
- Avoid inline styles
- Use `dark:` for dark mode support

```jsx
// ✅ Good
<div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4">
  Content
</div>

// ❌ Avoid
<div style={{ backgroundColor: '#fff', padding: '16px' }}>
  Content
</div>
```

### Custom CSS

For custom styles, add to component CSS file:

```css
/* src/components/Home.css */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.hero:hover {
  transform: scale(1.05);
}
```

---

## Git Workflow

### Branch Naming

```
feature/blog-editor        - New feature
bugfix/auth-issue         - Bug fix
hotfix/critical-error     - Critical fix
docs/update-readme        - Documentation
refactor/cleanup-code     - Code refactoring
```

### Commit Messages

Follow conventional commits format:

```
feat: add blog search functionality
fix: resolve authentication timeout issue
docs: update setup instructions
style: format code with prettier
refactor: simplify blog service logic
test: add blog service tests

# More detailed explanation (optional)
This updates the blog service to include
a new search method that queries Firestore
for matching blog titles.
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push to remote: `git push origin feature/my-feature`
4. Create Pull Request with description
5. Request review from team
6. Address review comments
7. Merge after approval

---

## Testing Guidelines

### Component Testing

```javascript
import { render, screen } from '@testing-library/react';
import BlogCard from '@/components/BlogCard';

describe('BlogCard', () => {
  it('renders blog title', () => {
    render(<BlogCard title="Test Blog" />);
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
  });
});
```

### Service Testing

```javascript
import { getBlogById } from '@/services/blogService';

describe('blogService', () => {
  it('fetches blog by ID', async () => {
    const blog = await getBlogById('123');
    expect(blog).toBeDefined();
    expect(blog.id).toBe('123');
  });
});
```

---

## Performance Best Practices

### Code Splitting

```javascript
// ✅ Good - lazy load heavy components
import { lazy, Suspense } from 'react';

const BlogAdmin = lazy(() => import('@/admin/BlogAdmin'));

<Suspense fallback={<Loading />}>
  <BlogAdmin />
</Suspense>
```

### Memoization

```javascript
// ✅ Use memo for expensive components
export default memo(BlogCard);

// ✅ Use useMemo for expensive calculations
const filteredBlogs = useMemo(() => {
  return blogs.filter(blog => blog.category === selectedCategory);
}, [blogs, selectedCategory]);
```

### Avoid Props Drilling

```javascript
// ✅ Use Context instead of passing props through multiple levels
const { user } = useAuth();

// ❌ Avoid
<Component1 user={user}>
  <Component2 user={user}>
    <Component3 user={user} />
  </Component2>
</Component1>
```

---

## Error Handling

### Try-Catch Pattern

```javascript
// ✅ Good
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  showError('Failed to load data. Please try again.');
}
```

### Error Boundaries

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
```

---

## Documentation Standards

### Function Documentation

```javascript
/**
 * Fetches all published blog posts
 * 
 * @async
 * @function getAllBlogs
 * @returns {Promise<Array>} Array of blog documents
 * @throws {Error} If Firestore query fails
 * 
 * @example
 * const blogs = await getAllBlogs();
 * console.log(blogs.length);
 */
export const getAllBlogs = async () => {
  // Implementation
};
```

### Component Documentation

```jsx
/**
 * BlogCard - Displays a single blog post preview
 * 
 * @component
 * @param {Object} props
 * @param {string} props.id - Unique blog ID
 * @param {string} props.title - Blog title
 * @param {string} props.excerpt - Short description
 * @param {string} props.image - Image URL
 * @param {string} [props.category] - Blog category
 * @returns {JSX.Element} Blog card component
 * 
 * @example
 * <BlogCard 
 *   id="1"
 *   title="React Tips"
 *   excerpt="Best practices..."
 *   image="url"
 * />
 */
const BlogCard = ({ id, title, excerpt, image, category }) => {
  // Component code
};
```

---

## Before Submitting PR

- [ ] Code follows naming conventions
- [ ] No console errors or warnings
- [ ] Code is properly formatted
- [ ] Comments explain complex logic
- [ ] No hardcoded values (use constants)
- [ ] Error handling is implemented
- [ ] Performance optimizations applied
- [ ] Tests pass (if added)
- [ ] Commit messages follow conventions
- [ ] PR description is clear and detailed

---

## Code Review Checklist

Reviewers should check:

- [ ] Code quality and style
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Error handling is robust
- [ ] Tests cover changes
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Database/API changes are safe

---

## Common Pitfalls to Avoid

### 1. Not Handling Async/Await

```javascript
// ❌ Bad
const data = fetchData();
console.log(data); // undefined

// ✅ Good
const data = await fetchData();
console.log(data); // data loaded
```

### 2. Missing Dependency Arrays

```javascript
// ❌ Bad - infinite loops
useEffect(() => {
  setData(newData);
});

// ✅ Good
useEffect(() => {
  setData(newData);
}, []); // Only once on mount
```

### 3. Modifying State Directly

```javascript
// ❌ Bad
items.push(newItem);
setItems(items);

// ✅ Good
setItems([...items, newItem]);
```

### 4. Not Cleaning Up

```javascript
// ❌ Bad
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
});

// ✅ Good
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## Need Help?

- Check existing issues on GitHub
- Review similar code in the project
- Ask in project discussions
- Contact project maintainer

Thank you for contributing! 🎉
