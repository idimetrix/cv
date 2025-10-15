# Users Directory

This directory contains user CV data. Each user has their own folder with their resume information.

## 📁 Structure

```
users/
├── index.ts                 # Exports default user
├── {username}/              # User folder
│   ├── index.ts            # Main resume export
│   ├── EXPERIENCES.ts      # Work experience
│   ├── EDUCATIONS.ts       # Education history
│   ├── SKILLS.ts           # Skills list
│   ├── PROJECTS.ts         # Projects portfolio
│   ├── CONTRIBUTIONS.ts    # Open source contributions
│   ├── LANGUAGES.ts        # Languages spoken
│   ├── LOCATIONS.ts        # Locations
│   └── TECHNOLOGIES.ts     # Technologies used
└── README.md               # This file
```

## 🚀 Adding a New User

### Step 1: Create User Folder

Create a new folder with the username (lowercase, no spaces):

```bash
mkdir apps/web/users/johndoe
```

### Step 2: Copy Template Files

Copy the structure from an existing user (e.g., `idimetrix`) or create new files:

```bash
cp -r apps/web/users/idimetrix/* apps/web/users/johndoe/
```

### Step 3: Update User Data

Edit the files in your new user folder:

- `index.ts` - Main resume data
- `EXPERIENCES.ts` - Work experience
- `EDUCATIONS.ts` - Education
- `SKILLS.ts` - Skills
- etc.

### Step 4: Register User

Add the username to the available users list in `apps/web/utils/users.ts`:

```typescript
export const getAvailableUsers = (): string[] => {
   return ['idimetrix', 'johndoe'] // Add your username here
}
```

### Step 5: Test

Access your CV at:

```
http://localhost:3000/user/johndoe
```

## 🌐 Accessing User CVs

- **Default user** (homepage): `http://localhost:3000`
- **Specific user**: `http://localhost:3000/user/{username}`

## 📝 User Data Structure

Each user's `index.ts` should export a `RESUME` object:

```typescript
import { Resume } from '../../types'

export const RESUME: Resume = {
   firstName: 'John',
   lastName: 'Doe',
   name: 'John Doe',
   email: 'john@example.com',
   // ... more fields
}
```

## 🔧 Tips

1. **Keep usernames lowercase** - Easier to manage and prevents case-sensitivity issues
2. **Use meaningful names** - First name, last name, or username
3. **Separate concerns** - Use different files for experiences, skills, etc.
4. **Follow TypeScript types** - All fields should match the `Resume` type
5. **Optimize images** - Use compressed images for avatars and projects

## 🚀 Scaling to 1000+ Users

The system is designed to handle many users efficiently:

1. **Dynamic imports** - User data is loaded only when needed
2. **Server-side caching** - 1-hour cache with 2-hour stale-while-revalidate
3. **API endpoints** - Check user existence without loading full data
4. **Static generation** - Can use ISR for even better performance

### For Large Scale Deployments

Consider:

1. **Database integration** - Store user data in MongoDB/PostgreSQL
2. **CDN caching** - Use Vercel/CloudFlare for global distribution
3. **Search functionality** - Add user search and directory
4. **User authentication** - Allow users to edit their own CVs
5. **Admin panel** - Manage users through a dashboard

## 📋 Required Fields

Minimum fields required for a user:

```typescript
{
   firstName: string
   lastName: string
   name: string
   avatar: string
   summary: string
   contact: {
      email: string
   }
   experiences: Experience[]
   educations: Education[]
   skills: Skill[]
   locations: Location[]
   languages: Record<string, string>
}
```

## 🆘 Troubleshooting

### User not found (404)

- Check username spelling (must be lowercase)
- Verify user is registered in `getAvailableUsers()`
- Ensure `index.ts` exports `RESUME` object

### Data not loading

- Check file structure matches template
- Verify all required fields are present
- Check browser console for import errors

### Type errors

- Ensure all data matches TypeScript types
- Run `pnpm type` to check for errors
- Refer to existing user data for examples

## 📚 Resources

- [Resume Type Definition](../../types/Resume.ts)
- [Example User](./idimetrix/)
- [User API Endpoints](../pages/api/users/)
