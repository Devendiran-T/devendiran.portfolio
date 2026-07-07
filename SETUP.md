# 🚀 Portfolio Project Setup Guide

## ✅ Project Status
**All configurations fixed and verified!** The project is now ready to run.

---

## 📋 Prerequisites

Before running this project, ensure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

---

## 🛠️ Installation & Setup

### 1️⃣ Frontend Setup

Navigate to the project root and install dependencies:

```powershell
# Navigate to project directory
cd "c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main"

# Install frontend dependencies
npm install
```

### 2️⃣ Backend Setup (Optional)

**Note:** The contact form currently uses [FormSubmit.co](https://formsubmit.co/), so the backend server is optional. If you want to use your own email server:

```powershell
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Configure environment variables
# Edit backend\.env and add your Gmail credentials:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-gmail-app-password
```

**To generate a Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate an App Password at [App Passwords](https://myaccount.google.com/apppasswords)
4. Use this password in the `.env` file

---

## 🚀 Running the Project

### Option A: Frontend Only (Recommended)

```powershell
# From project root
npm run dev
```

Your portfolio will open at: **http://localhost:5173**

### Option B: Frontend + Backend

Open **two separate PowerShell terminals**:

**Terminal 1 - Frontend:**
```powershell
cd "c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main"
npm run dev
```

**Terminal 2 - Backend:**
```powershell
cd "c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main\backend"
npm run dev
```

- Frontend: **http://localhost:5173**
- Backend: **http://localhost:5000**

---

## 🏗️ Build for Production

To create an optimized production build:

```powershell
npm run build
```

To preview the production build locally:

```powershell
npm run preview
```

---

## 🧪 Run Linter

To check code quality:

```powershell
npm run lint
```

---

## 📦 Project Structure

```
devendiran.portfolio-main/
├── backend/                    # Node.js + Express backend (optional)
│   ├── server.js              # API server
│   ├── .env                   # Email configuration
│   └── package.json           # Backend dependencies
├── src/
│   ├── components/            # React components
│   │   ├── Hero.jsx          # Hero section
│   │   ├── About.jsx         # About section
│   │   ├── Projects.jsx      # Projects showcase
│   │   ├── Experience.jsx    # Work experience
│   │   ├── Contact.jsx       # Contact form
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── AIBrain.jsx       # 3D AI brain component
│   │   ├── NeuralCanvas.jsx  # Neural network visualization
│   │   └── bg3d/             # 3D background components
│   ├── constants/
│   │   └── index.js          # Personal data & content
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                       # Frontend environment variables
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
└── package.json               # Frontend dependencies
```

---

## 🔧 Changes Made During Setup

### ✅ Fixed Issues:
1. **Tailwind Config:** Converted from CommonJS to ES modules
2. **ESLint Config:** Added `backend` to ignored directories and fixed `motion` import false positives
3. **HTML Index:** Removed incorrect CSS link (Vite handles this automatically)
4. **Backend .env:** Created missing environment configuration file
5. **Dependencies:** Verified all packages are installed correctly
6. **Build Process:** Tested and confirmed successful production builds

### 📝 Configuration Files:
- ✅ `package.json` - All dependencies correct
- ✅ `vite.config.js` - Proper Vite + React setup
- ✅ `tailwind.config.js` - Fixed module export syntax
- ✅ `eslint.config.js` - Configured to ignore backend and allow `motion` imports
- ✅ `backend/.env` - Created with placeholder email credentials
- ✅ `.env` - Backend URL configured

---

## 🎨 Customization

To personalize your portfolio:

1. **Edit Personal Info:** `src/constants/index.js`
   - Update name, email, phone, location
   - Modify projects, experience, skills
   - Add your resume URL, GitHub, LinkedIn

2. **Styling:** Modify `src/index.css` and `tailwind.config.js`
   - Change color scheme
   - Adjust fonts and spacing

3. **Components:** Customize any component in `src/components/`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended):
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify:
```powershell
# Build first
npm run build

# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages:
```powershell
npm run deploy
```

---

## 📞 Contact Form Configuration

The contact form currently uses **FormSubmit.co** (no backend required). To customize:

**Option 1: Keep FormSubmit.co (Current)**
- Edit `src/components/Contact.jsx`
- Update the email in the fetch URL:
  ```javascript
  const res = await fetch('https://formsubmit.co/ajax/YOUR-EMAIL@gmail.com', {
  ```

**Option 2: Use Custom Backend**
- Start the backend server
- Edit `src/components/Contact.jsx` to use: `${import.meta.env.VITE_BACKEND_URL}/contact`
- Configure `backend/.env` with your email credentials

---

## ⚡ Performance

Current build output:
- **Bundle size:** ~863 KB (243 KB gzipped)
- **CSS:** 17.5 KB (4.5 KB gzipped)
- Built with Vite for optimal performance

---

## 🐛 Troubleshooting

**Issue:** `vite: command not found`
```powershell
# Reinstall dependencies
npm install
```

**Issue:** Port 5173 already in use
```powershell
# Kill the process or use a different port
npm run dev -- --port 3000
```

**Issue:** Backend email not sending
- Verify Gmail App Password is correct
- Check that 2FA is enabled on Google Account
- Ensure `backend/.env` is properly configured

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file.

---

## 👨‍💻 Author

**Devendiran T**
- 📧 Email: tdevendirandevdevidtamil@gmail.com
- 🐙 GitHub: [Devendiran-T](https://github.com/Devendiran-T)
- 💼 LinkedIn: [devendiran-t](https://www.linkedin.com/in/devendiran-t-5250892a5)

---

## 🎉 You're All Set!

Your portfolio is ready to run. Execute the following command to start:

```powershell
npm run dev
```

Then open **http://localhost:5173** in your browser!
