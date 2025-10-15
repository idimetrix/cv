# User Template

This is a template for creating a new user profile.

## Quick Start - Add a New User in 3 Steps

### Step 1: Copy This Template

```bash
# From the apps/web/users directory
cp -r TEMPLATE yournewusername
cd yournewusername
```

### Step 2: Update index.ts

Edit `index.ts` with your information:

- Change `name` to your full name
- Change `nick` to match your folder name (yournewusername)
- Update contact information
- Fill in your professional details

### Step 3: Access Your Profile

Your profile will be automatically available at:

```
http://localhost:3000/user/yournewusername
```

That's it! 🎉

## Structure Options

You have two options for organizing your data:

### Option 1: All-in-One (Simple)

Keep everything in `index.ts` - good for smaller profiles.

### Option 2: Split Files (Recommended)

Create separate files for better organization:

- `EXPERIENCES.ts` - Your work history
- `PROJECTS.ts` - Your projects/portfolio
- `SKILLS.ts` - Your technical skills
- `EDUCATIONS.ts` - Your education background
- `CONTRIBUTIONS.ts` - Open source contributions
- `LANGUAGES.ts` - Languages you speak
- `LOCATIONS.ts` - Where you work/available
- `TECHNOLOGIES.ts` - Technologies you use

Then import them in `index.ts`:

```typescript
import { EXPERIENCES } from './EXPERIENCES'
import { PROJECTS } from './PROJECTS'
// ... etc

export const RESUME: Resume = {
   // ...
   experiences: EXPERIENCES,
   projects: PROJECTS,
   // ... etc
}
```

## Example

Check the `idimetrix` folder for a complete working example!

## Need Help?

See the main [USERS_GUIDE.md](/USERS_GUIDE.md) for detailed documentation.
