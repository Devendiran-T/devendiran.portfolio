# How to Add Your Profile Photo - Step by Step

## Current Issue
The photo is not displaying because the file `profile.jpg` is not in the `public` folder yet.

---

## Solution - Follow These Exact Steps:

### Step 1: Locate Your Photo
Find the professional photo you want to use (the one in the black suit).

### Step 2: Rename the Photo
Rename it to exactly: **profile.jpg** (all lowercase)

### Step 3: Move to Public Folder
Copy or move the file to this location:
```
c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main\public\profile.jpg
```

### Step 4: Verify File Location
The folder structure should look like:
```
devendiran.portfolio-main/
├── public/
│   └── profile.jpg          <-- Your photo here
├── src/
├── package.json
└── ...
```

### Step 5: Refresh Browser
- If dev server is running, just refresh the browser
- Or restart: `npm run dev`

---

## Quick Command to Check

Run this command to verify the photo is in place:

```powershell
Test-Path "public\profile.jpg"
```

If it returns `True`, the photo is correctly placed.
If it returns `False`, the photo is missing.

---

## Photo Requirements

- **Name:** profile.jpg (exactly, lowercase)
- **Location:** public folder
- **Format:** JPG or PNG (jpg preferred)
- **Recommended Size:** 800x800 pixels or larger
- **Aspect Ratio:** Square (1:1)

---

## What You'll See

**Before adding photo:**
- Blue circle with letter "D"
- Text: "Add profile.jpg to public folder"

**After adding photo:**
- Your professional photo in circular frame
- White border around it
- Floating stat cards (CGPA, Projects, Internships)
- Beautiful gradient background

---

## Troubleshooting

### If photo still doesn't show:

1. **Check file name:** Must be exactly `profile.jpg` (not Profile.jpg or profile.JPG)
2. **Check location:** Must be in `public` folder (not src or any subfolder)
3. **Clear browser cache:** Ctrl+F5 or Cmd+Shift+R
4. **Restart dev server:** Stop and run `npm run dev` again
5. **Check file format:** Should be JPG or PNG
6. **Check file size:** Should be under 5MB

---

## Alternative: Use Windows File Explorer

1. Open File Explorer
2. Navigate to: `c:\Users\Mani\Downloads\devendiran.portfolio-main\devendiran.portfolio-main\public`
3. Copy your photo into this folder
4. Rename it to: `profile.jpg`
5. Refresh your browser

---

## Need Help?

If photo still doesn't show after following these steps:
1. Verify the file exists: `dir public\profile.jpg`
2. Check the file size: Should show the file details
3. Make sure dev server is running: `npm run dev`
