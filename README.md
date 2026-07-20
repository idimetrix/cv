<div align="center">

![Professional CV Maker](https://raw.githubusercontent.com/idimetrix/cv/main/apps/web/public/full.png)

# 🎯 Professional CV Maker

### **Create stunning, ATS-friendly CVs in minutes**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/idimetrix/cv)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

[Live Demo](https://cv-idimetrix.vercel.app) · [Report Bug](https://github.com/idimetrix/cv/issues) · [Request Feature](https://github.com/idimetrix/cv/issues)

</div>

---

## 🌟 Why Choose This CV Maker?

A modern, minimalist CV builder designed for professionals who value **simplicity** and **results**. Built with the latest web technologies, this tool creates beautiful, print-friendly CVs that actually get past Applicant Tracking Systems (ATS).

**Perfect for:**

- 💼 Job seekers wanting a professional online presence
- 🎓 Recent graduates building their first CV
- 👨‍💻 Developers showcasing their technical skills
- 🚀 Professionals who need quick, reliable CV generation
- 🏢 Organizations managing CVs for multiple team members
- 🌐 Platforms hosting CVs for 1000+ users

---

## ✨ Key Features

### 🎨 **Beautiful Design**

- Clean, minimalist layout that highlights your experience
- Responsive design works perfectly on all devices
- Print-friendly formatting for physical copies

### ⚡ **Lightning Fast Setup**

- Configure everything in a single file
- No complex forms or databases required
- Live preview as you make changes

### 🤖 **ATS-Optimized**

- Passes Applicant Tracking Systems with ease
- Semantic HTML structure for better parsing
- SEO-optimized for maximum online visibility

### 🛠️ **Developer-Friendly**

- Built with modern tech stack (React, Next.js, TypeScript)
- Fully customizable and extensible
- Type-safe development experience

### 📤 **Export Options**

- Print directly from browser
- Download as PDF
- Export as PNG, JPG, or SVG
- Share via unique URL

### 👥 **Multi-User Support**

- Support for unlimited users (tested with 1000+)
- Dynamic loading - only loads data when needed
- Each user gets their own URL: `/user/{username}`
- API endpoints for user management
- Scales effortlessly with your needs

---

## 🚀 Tech Stack

<table>
<tr>
<td>

**Frontend**

- ⚛️ React 19
- ▲ Next.js 15
- 📘 TypeScript 5
- 🎨 Tailwind CSS 4

</td>
<td>

**Tooling**

- 📦 pnpm Workspaces
- 🔥 Turbo (Monorepo)
- 🎯 ESLint 9
- ✨ Prettier 3

</td>
<td>

**Deployment**

- ▲ Vercel (Recommended)
- 🐳 Docker Support
- 🔄 CI/CD Ready
- 📊 Analytics Built-in

</td>
</tr>
</table>

---

## 🏃 Quick Start

Get your CV up and running in **less than 5 minutes**:

```bash
# Clone the repository
git clone https://github.com/idimetrix/cv.git

# Navigate to the project
cd cv

# Install dependencies and setup
pnpm bootstrap

# Start the development server
pnpm web:dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) to see your CV.

### 👥 Adding More Users

Want to host multiple CVs? Check out the [Multi-User Guide](USERS_GUIDE.md) for detailed instructions.

```bash
# Quick: Create a new user
mkdir apps/web/users/johndoe
cp -r apps/web/users/idimetrix/* apps/web/users/johndoe/

# Edit the user data
# Then add to apps/web/utils/users.ts

# Access at http://localhost:3000/user/johndoe
```

---

## 📖 Detailed Setup Guide

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **pnpm** 9.x or higher ([Install](https://pnpm.io/installation))

### Step-by-Step Installation

#### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/idimetrix/cv.git
cd cv
```

#### 2️⃣ **Install Dependencies**

```bash
pnpm install
# or use the bootstrap command for full setup
pnpm bootstrap
```

The `bootstrap` command will:

- Install all dependencies
- Run code formatters (Prettier)
- Run linters (ESLint)
- Type-check the codebase

#### 3️⃣ **Configure Your CV**

Edit the configuration file at:

```
apps/web/users/idimetrix/index.ts
```

Or create your own profile folder:

```
apps/web/users/your-name/
```

#### 4️⃣ **Start Development**

```bash
pnpm web:dev
```

Your CV will be available at `http://localhost:3000`

---

## 🎯 Customization Guide

### Basic Configuration

All your CV content is managed in a single configuration file:

```typescript
// apps/web/users/idimetrix/index.ts
export const RESUME = {
  firstName: "Your",
  lastName: "Name",
  email: "your.email@example.com",
  phone: "+1234567890",
  // ... more fields
};
```

### Key Sections to Customize:

1. **Personal Information** - Name, contact, location
2. **Professional Summary** - Your elevator pitch
3. **Experience** - Work history with achievements
4. **Education** - Academic background
5. **Skills** - Technical and soft skills
6. **Projects** - Portfolio pieces
7. **Languages** - Language proficiency

### Advanced Customization

- **Styling**: Modify `tailwind.config.js` for theme changes
- **Layout**: Edit components in `apps/web/components/`
- **SEO**: Update metadata in `apps/web/utils/seo.tsx`

---

## 📜 Available Scripts

### Development

```bash
pnpm web:dev        # Start development server
pnpm web:build      # Build for production
pnpm web:start      # Start production server
```

### Code Quality

```bash
pnpm format         # Format, lint, and type-check
pnpm lint           # Run ESLint
pnpm type           # Run TypeScript type checking
pnpm prettier       # Format code with Prettier
```

### Maintenance

```bash
pnpm clean          # Clean build artifacts and node_modules
pnpm bootstrap      # Fresh install and setup
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your CV:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/idimetrix/cv)

**Or manually:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

<details>
<summary><b>Deploy to Netlify</b></summary>

```bash
# Build the project
pnpm web:build

# Deploy the .next folder
netlify deploy --prod --dir=apps/web/.next
```

</details>

<details>
<summary><b>Deploy with Docker</b></summary>

```bash
# Build Docker image
docker build -t cv-app .

# Run container
docker run -p 3000:3000 cv-app
```

</details>

---

## 📁 Project Structure

```
cv/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── components/         # React components
│       │   ├── atoms/         # Basic UI elements
│       │   ├── molecules/     # Composite components
│       │   └── organism/      # Page-level components
│       ├── constants/         # Configuration & constants
│       ├── pages/             # Next.js pages
│       │   ├── index.tsx      # Homepage (default user)
│       │   ├── user/          # Multi-user routes
│       │   │   └── [username].tsx  # Dynamic user pages
│       │   └── api/           # API endpoints
│       │       └── users/     # User API
│       ├── styles/            # Global styles
│       ├── types/             # TypeScript types
│       ├── users/             # User CV data ⭐ Multi-user support
│       │   ├── idimetrix/     # Example user
│       │   └── {username}/    # Add more users here
│       └── utils/             # Utility functions
│           └── users.ts       # User management utilities
├── packages/                   # Shared packages
│   ├── config/                # Shared configuration
│   ├── dayjs/                 # Date utilities
│   ├── lib/                   # Shared utilities
│   ├── mongodb/               # Database utilities
│   ├── trpc/                  # API layer
│   └── tsconfig/              # TypeScript configs
├── USERS_GUIDE.md             # Multi-user setup guide ⭐
└── turbo.json                 # Turbo configuration
```

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ Use commercially
- ✅ Modify freely
- ✅ Distribute
- ✅ Private use
- ❌ Liability or warranty

---

## 👨‍💻 Author

**Dmitrii Selikhov**

- 🌐 Website: [LinkedIn](https://www.linkedin.com/in/dimetrix)
- 📧 Email: dmitrii.selikhov@gmail.com
- 🐙 GitHub: [@idimetrix](https://github.com/idimetrix)

---

## 🙏 Acknowledgments

- Inspired by the need for simple, effective CV creation
- Built with amazing open-source technologies
- Community feedback and contributions

---

## 📚 Resources

- **[Multi-User Guide](USERS_GUIDE.md)** - Complete guide for hosting multiple CVs ⭐
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Resume Type Definition](apps/web/types/Resume.ts)
- [Example User Data](apps/web/users/idimetrix/)
- [User API Documentation](apps/web/pages/api/users/)

---

## 📊 Project Stats

- ⭐ **Stars**: Show your support by starring this repo!
- 🐛 **Issues**: Found a bug? [Report it](https://github.com/idimetrix/cv/issues)
- 💡 **Ideas**: Have a feature request? [Share it](https://github.com/idimetrix/cv/issues)

---

<div align="center">

### Made with ❤️ by developers, for developers

**If this project helped you, please consider giving it a ⭐**

[⬆ Back to Top](#-professional-cv-maker)

</div>

---

Built by the team behind [Planoda](https://planoda.com/?utm_source=github&utm_medium=referral&utm_campaign=cv) — an AI-native work platform, currently pre-launch and building in public.
