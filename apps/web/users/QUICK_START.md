# 🚀 Quick Start: Add a New User in 2 Minutes

## Adding a new user is super easy!

### Method 1: Copy the Template (Recommended)

```bash
# 1. Navigate to the users directory
cd apps/web/users

# 2. Copy the TEMPLATE folder
cp -r TEMPLATE johndoe

# 3. Edit the new user's index.ts file
cd johndoe
# Update the file with your information

# 4. That's it! Your profile is now live at:
#    http://localhost:3000/user/johndoe
```

### Method 2: Create from Scratch

```bash
# 1. Create a new folder with the username
cd apps/web/users
mkdir janedoe

# 2. Create an index.ts file inside
touch janedoe/index.ts

# 3. Copy the content from TEMPLATE/index.ts and customize it

# 4. Done! Visit http://localhost:3000/user/janedoe
```

## ✨ Key Features

- **Automatic Discovery**: Just add a folder, no configuration needed!
- **Dynamic Loading**: Each user's data is loaded only when accessed
- **Scalable**: Supports 1000+ users easily
- **Flexible**: Keep all data in one file or split into multiple files

## 📁 Folder Structure

### Simple (all in one file):
```
users/
  ├── idimetrix/
  │   └── index.ts (all data here)
  └── yournewuser/
      └── index.ts (all data here)
```

### Advanced (split files for better organization):
```
users/
  ├── idimetrix/
  │   ├── index.ts
  │   ├── EXPERIENCES.ts
  │   ├── PROJECTS.ts
  │   ├── SKILLS.ts
  │   ├── EDUCATIONS.ts
  │   ├── CONTRIBUTIONS.ts
  │   ├── LANGUAGES.ts
  │   ├── LOCATIONS.ts
  │   └── TECHNOLOGIES.ts
  └── yournewuser/
      ├── index.ts
      ├── EXPERIENCES.ts
      └── PROJECTS.ts
```

## 🎯 Important Notes

1. **Folder name = URL**: If your folder is `johndoe`, the URL will be `/user/johndoe`
2. **Lowercase URLs**: All URLs are automatically converted to lowercase
3. **TEMPLATE is excluded**: The TEMPLATE folder won't show up as a user
4. **No restart needed**: Changes are picked up automatically in dev mode

## 🔍 Viewing All Users

You can access the list of all users via API:
```
GET http://localhost:3000/api/users
```

Or check a specific user:
```
GET http://localhost:3000/api/users/johndoe
```

## 📚 Need More Help?

- See `/TEMPLATE/README.md` for detailed template instructions
- Check `/idimetrix/` for a complete working example
- Read the main `/USERS_GUIDE.md` for comprehensive documentation

## 💡 Pro Tips

1. Use meaningful folder names (e.g., `john-smith`, not `user123`)
2. Keep your avatar image hosted externally or in `/public`
3. Test your profile locally before deploying
4. Use the idimetrix folder as a reference for structure

---

That's it! Adding new users is literally just creating a folder and a file. 🎉

