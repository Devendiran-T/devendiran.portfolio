# Enable Your Profile Photo - Simple Steps

## Current Status
Your portfolio is showing a placeholder with your initial "D" because the photo file hasn't been added yet.

## To Add Your Photo:

### Step 1: Save Your Photo
1. Right-click the professional photo (man in black suit) 
2. Save it as: **profile.jpg**
3. Save location: anywhere temporarily (Desktop or Downloads)

### Step 2: Move to Public Folder
Copy or move `profile.jpg` to:
```
c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main\public\profile.jpg
```

### Step 3: Edit Hero.jsx
Open: `src\components\Hero.jsx`

Find this section (around line 90):
```jsx
{/* Uncomment below when you add photo */}
{/* <img 
  src="/profile.jpg" 
  alt={personalInfo.name}
  className="w-full h-full object-cover"
/> */}
```

**Remove the comment marks** to make it:
```jsx
<img 
  src="/profile.jpg" 
  alt={personalInfo.name}
  className="w-full h-full object-cover"
/>
```

**And comment out or remove** the placeholder div above it (lines 85-92):
```jsx
{/* <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary text-white">
  <div className="text-9xl font-black mb-4">{personalInfo.name.charAt(0)}</div>
  <div className="text-sm text-center px-8 opacity-90 leading-relaxed">
    <p className="font-semibold mb-1">Photo Placeholder</p>
    <p className="text-xs">Add profile.jpg to public folder</p>
  </div>
</div> */}
```

### Step 4: Save and Refresh
1. Save the Hero.jsx file
2. The dev server will auto-reload
3. Refresh your browser if needed

## Your photo will now appear in a beautiful circular frame!

---

## Quick Verification

Check if photo exists:
```powershell
Test-Path "public\profile.jpg"
```

Should return: **True**

---

## Current Design

The photo will be displayed as:
- 320x320px circular frame
- 8px white border
- Soft shadow
- Gradient background circles
- Floating stat cards around it

Perfect professional presentation!
