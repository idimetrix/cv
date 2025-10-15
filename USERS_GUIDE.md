# 👥 Multi-User CV System Guide

Complete guide for implementing and managing a multi-user CV system that scales to 1000+ users.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Adding New Users](#adding-new-users)
- [API Endpoints](#api-endpoints)
- [Performance & Scaling](#performance--scaling)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This CV maker supports multiple users with dynamic loading, ensuring excellent performance even with 1000+ users. Each user has their own profile accessible via a unique URL.

### Key Features

- ✅ **Dynamic Loading** - User data loads only when needed
- ✅ **Scalable** - Handles 1000+ users efficiently
- ✅ **SEO Optimized** - Each user gets unique meta tags and JSON-LD
- ✅ **API Endpoints** - Check user existence and get user lists
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Cached** - Smart caching for better performance

### URLs

- **Homepage** (default user): `http://yoursite.com/`
- **Specific user**: `http://yoursite.com/user/{username}`
- **User API**: `http://yoursite.com/api/users`
- **Check user**: `http://yoursite.com/api/users/{username}`

---

## 🏗️ Architecture

### File Structure

```
apps/web/
├── pages/
│   ├── index.tsx              # Homepage (default user)
│   ├── user/
│   │   └── [username].tsx     # Dynamic user pages
│   └── api/
│       └── users/
│           ├── index.ts       # List all users
│           └── [username].ts  # Get specific user info
├── users/
│   ├── index.ts               # Default user export
│   ├── README.md              # Users directory guide
│   └── {username}/            # Individual user folders
│       ├── index.ts           # Main resume data
│       ├── EXPERIENCES.ts     # Work experience
│       ├── EDUCATIONS.ts      # Education
│       ├── SKILLS.ts          # Skills
│       ├── PROJECTS.ts        # Projects
│       ├── CONTRIBUTIONS.ts   # Contributions
│       ├── LANGUAGES.ts       # Languages
│       ├── LOCATIONS.ts       # Locations
│       └── TECHNOLOGIES.ts    # Technologies
└── utils/
    └── users.ts               # User utility functions
```

### How It Works

1. **Request comes in** → `/user/johndoe`
2. **Next.js routes** to `pages/user/[username].tsx`
3. **getServerSideProps** → Calls `getUserResume('johndoe')`
4. **Dynamic import** → Loads only `users/johndoe/*` files
5. **Render** → CV component receives user data
6. **Cache** → Response cached for 1 hour

---

## 🚀 Adding New Users

### Quick Start (5 minutes)

```bash
# 1. Create user folder
mkdir apps/web/users/johndoe

# 2. Copy template from existing user
cp -r apps/web/users/idimetrix/* apps/web/users/johndoe/

# 3. Edit user data
# Edit all files in apps/web/users/johndoe/

# 4. Register user
# Add 'johndoe' to getAvailableUsers() in apps/web/utils/users.ts

# 5. Test locally
pnpm web:dev
# Visit: http://localhost:3000/user/johndoe
```

### Detailed Steps

#### Step 1: Create User Directory

```bash
cd apps/web/users
mkdir johndoe  # Use lowercase, no spaces
```

#### Step 2: Create Required Files

Create these files in the user folder:

**`index.ts`** (Main resume file)

```typescript
import { Resume } from "../../types";
import { CONTRIBUTIONS } from "./CONTRIBUTIONS";
import { EDUCATIONS } from "./EDUCATIONS";
import { EXPERIENCES } from "./EXPERIENCES";
import { LANGUAGES } from "./LANGUAGES";
import { LOCATIONS } from "./LOCATIONS";
import { PROJECTS } from "./PROJECTS";
import { SKILLS } from "./SKILLS";
import { TECHNOLOGIES } from "./TECHNOLOGIES";

export const RESUME: Resume = {
  firstName: "John",
  lastName: "Doe",
  name: "John Doe",
  nick: "JD",
  nameLink: "/user/johndoe",

  initials: "JD",
  initialsLink: "/user/johndoe",

  avatar: "/avatars/johndoe.jpg",
  avatarLink: "/user/johndoe",

  summary: "Senior Software Engineer",
  summaryLink: "/user/johndoe",

  website: "https://johndoe.com",

  contact: {
    email: "john@example.com",
    phone: "+1234567890",
    website: "https://johndoe.com",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },

  about: [
    {
      type: "text",
      content: "Passionate software engineer...",
    },
  ],
  aboutLink: "/user/johndoe#about",

  help: [],
  helpLink: "/user/johndoe#help",

  locations: LOCATIONS,
  languages: LANGUAGES,
  experiences: EXPERIENCES,
  educations: EDUCATIONS,
  skills: SKILLS,
  projects: PROJECTS,
  contributions: CONTRIBUTIONS,
  technologies: TECHNOLOGIES,
  characteristics: ["Problem Solver", "Team Player"],
  keywords: ["Software Engineer", "Full Stack", "React", "Node.js"],
};
```

**`EXPERIENCES.ts`**

```typescript
import { Experience } from "../../types";

export const EXPERIENCES: Experience[] = [
  {
    company: "Tech Company",
    title: "Senior Software Engineer",
    start: "2020-01-01",
    end: null, // null = current position
    location: "San Francisco, CA",
    description: "Led development of...",
    technologies: ["React", "Node.js", "TypeScript"],
  },
];
```

**`EDUCATIONS.ts`**

```typescript
import { Education } from "../../types";

export const EDUCATIONS: Education[] = [
  {
    institution: "University Name",
    degree: "Bachelor of Science",
    field: "Computer Science",
    start: "2012",
    end: "2016",
    location: "City, State",
  },
];
```

**`SKILLS.ts`**

```typescript
import { Skill } from "../../types";

export const SKILLS: Skill[] = [
  {
    name: "JavaScript",
    level: "Expert",
    years: 8,
  },
  {
    name: "React",
    level: "Expert",
    years: 5,
  },
];
```

**`PROJECTS.ts`**

```typescript
import { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    title: "Awesome Project",
    description: "A revolutionary...",
    start: "2023-01-01",
    end: "2023-12-31",
    image: "/projects/awesome-project.png",
    link: "https://github.com/johndoe/awesome-project",
    badges: ["React", "TypeScript", "Node.js"],
  },
];
```

**Other files:**

- `CONTRIBUTIONS.ts` - Open source contributions
- `LANGUAGES.ts` - Languages spoken
- `LOCATIONS.ts` - Locations
- `TECHNOLOGIES.ts` - Technologies used

#### Step 3: Register User

Edit `apps/web/utils/users.ts`:

```typescript
export const getAvailableUsers = (): string[] => {
  return [
    "idimetrix",
    "johndoe", // Add new user here
    "janedoe",
    // ... more users
  ];
};
```

#### Step 4: Add User Avatar (Optional)

```bash
# Add user avatar
cp your-photo.jpg apps/web/public/avatars/johndoe.jpg
```

#### Step 5: Test

```bash
# Start dev server
pnpm web:dev

# Visit user page
http://localhost:3000/user/johndoe
```

---

## 🌐 API Endpoints

### List All Users

```bash
GET /api/users
```

**Response:**

```json
{
  "users": ["idimetrix", "johndoe", "janedoe"],
  "count": 3
}
```

### Get User Info

```bash
GET /api/users/johndoe
```

**Response (User exists):**

```json
{
  "exists": true,
  "user": {
    "username": "johndoe",
    "name": "John Doe",
    "summary": "Senior Software Engineer",
    "avatar": "/avatars/johndoe.jpg",
    "location": "San Francisco, CA"
  }
}
```

**Response (User not found):**

```json
{
  "exists": false,
  "message": "User 'unknown' not found"
}
```

---

## ⚡ Performance & Scaling

### Optimization Strategies

#### 1. Dynamic Imports

```typescript
// Only loads when the user is accessed
const userModule = await import(`../users/${username}`);
```

#### 2. Server-Side Caching

```typescript
// Cache for 1 hour, stale-while-revalidate for 2 hours
res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
```

#### 3. Incremental Static Regeneration (ISR)

For even better performance, you can use ISR:

```typescript
export const getStaticPaths = async () => {
  const users = getAvailableUsers();

  return {
    paths: users.map((username) => ({
      params: { username },
    })),
    fallback: "blocking", // Generate on-demand for new users
  };
};

export const getStaticProps = async ({ params }) => {
  const resume = await getUserResume(params.username);

  return {
    props: { resume },
    revalidate: 3600, // Regenerate every hour
  };
};
```

### Scaling to 1000+ Users

| Users    | Method         | Load Time | Memory |
| -------- | -------------- | --------- | ------ |
| 1-100    | Dynamic SSR    | ~500ms    | Low    |
| 100-500  | SSR + Cache    | ~100ms    | Medium |
| 500-1000 | ISR            | ~50ms     | Medium |
| 1000+    | ISR + Database | ~50ms     | Low    |

#### For 1000+ Users, Consider:

1. **Database Storage**

   ```typescript
   // Store user data in MongoDB/PostgreSQL
   const resume = await db.users.findOne({ username });
   ```

2. **Search Functionality**

   ```typescript
   // Add Algolia or Elasticsearch
   const results = await search.query(searchTerm);
   ```

3. **User Directory**

   ```typescript
   // Create a /users page listing all users
   ```

4. **Lazy Loading**
   ```typescript
   // Load user list in batches
   const users = await getUsers({ page, limit: 50 });
   ```

---

## 📝 Examples

### Example 1: Software Engineer

See `apps/web/users/idimetrix/` for a complete example.

### Example 2: Adding Bulk Users

```typescript
// Script to add multiple users
const users = [
  { username: "user1", name: "User One" },
  { username: "user2", name: "User Two" },
  // ... more users
];

users.forEach((user) => {
  // Create directories and files
  createUserFolder(user.username);
  generateUserFiles(user);
});
```

### Example 3: User Migration

```typescript
// Migrate from old format to new format
async function migrateUser(oldData) {
  const newData = {
    firstName: oldData.first_name,
    lastName: oldData.last_name,
    // ... map fields
  };

  await createUser(newData);
}
```

---

## 💡 Best Practices

### 1. Username Convention

- ✅ Use lowercase letters
- ✅ Use hyphens for spaces: `john-doe`
- ✅ Keep it short and memorable
- ❌ Avoid special characters
- ❌ Avoid spaces or uppercase

### 2. Data Organization

- ✅ Separate concerns (experiences, skills, etc.)
- ✅ Use TypeScript types
- ✅ Keep files focused and small
- ✅ Follow existing structure

### 3. Images

- ✅ Optimize images (WebP, compressed)
- ✅ Use consistent sizes
- ✅ Store in `/public/avatars/` or `/public/projects/`
- ✅ Use descriptive filenames

### 4. SEO

- ✅ Fill all required fields
- ✅ Use descriptive summaries
- ✅ Add relevant keywords
- ✅ Include social media links

### 5. Performance

- ✅ Keep resume data under 100KB
- ✅ Limit projects to top 10
- ✅ Compress images
- ✅ Use lazy loading for images

---

## 🔧 Troubleshooting

### User Page Shows 404

**Problem:** `/user/johndoe` shows 404

**Solutions:**

1. Check if user is in `getAvailableUsers()`:

   ```typescript
   // apps/web/utils/users.ts
   return ["idimetrix", "johndoe"]; // johndoe must be here
   ```

2. Verify folder exists:

   ```bash
   ls apps/web/users/johndoe
   ```

3. Check file exports:
   ```typescript
   // apps/web/users/johndoe/index.ts
   export const RESUME: Resume = { ... }
   ```

### Type Errors

**Problem:** TypeScript errors in user files

**Solutions:**

1. Run type check:

   ```bash
   pnpm type
   ```

2. Check required fields:

   ```typescript
   // All these are required
   (firstName,
     lastName,
     name,
     avatar,
     summary,
     contact,
     experiences,
     educations,
     skills,
     locations,
     languages);
   ```

3. Import correct types:
   ```typescript
   import { Resume, Experience, Education } from "../../types";
   ```

### Performance Issues

**Problem:** Slow page load

**Solutions:**

1. Enable caching in production
2. Optimize images (< 200KB each)
3. Reduce number of projects/experiences
4. Use ISR instead of SSR

### Import Errors

**Problem:** `Cannot find module '../users/johndoe'`

**Solutions:**

1. Ensure folder name matches exactly (lowercase)
2. Check `index.ts` exists in user folder
3. Verify exports:
   ```typescript
   export const RESUME: Resume = { ... }
   ```

---

## 🚀 Advanced Topics

### Custom User Routes

Create custom routes for specific features:

```typescript
// pages/user/[username]/projects.tsx
// Access: /user/johndoe/projects
```

### User Authentication

Add authentication for users to edit their CVs:

```typescript
// Use NextAuth.js or similar
import { useSession } from "next-auth/react";

const canEdit = session?.user?.username === username;
```

### Database Integration

Scale to unlimited users with a database:

```typescript
// lib/database.ts
export async function getUserFromDB(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      experiences: true,
      educations: true,
      skills: true,
    },
  });
  return user;
}
```

### Search Functionality

Add user search:

```typescript
// pages/search.tsx
const results = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
```

---

## 📚 Resources

- [Next.js Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Resume Type Definition](apps/web/types/Resume.ts)
- [Example User Data](apps/web/users/idimetrix/)

---

## 🆘 Need Help?

1. Check the [README](README.md)
2. Review [example user](apps/web/users/idimetrix/)
3. Open an [issue](https://github.com/idimetrix/cv/issues)
4. Ask in [discussions](https://github.com/idimetrix/cv/discussions)

---

<div align="center">

**Built with ❤️ for scalable CV management**

[⬆ Back to Top](#-multi-user-cv-system-guide)

</div>
