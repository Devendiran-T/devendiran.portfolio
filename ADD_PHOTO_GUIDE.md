# How to Add Your Profile Photo

## Quick Steps

1. **Save your professional photo** from the image you provided as `profile.jpg`

2. **Place it in the public folder:**
   ```
   public/profile.jpg
   ```

3. **Done!** The portfolio will automatically display it

---

## Design Details

Your photo will be displayed as:
- **Circular frame** (320x320px displayed size)
- **White border** (8px thick)
- **Subtle shadow** for depth
- **Blended with background** using gradient circles
- **Floating stat cards** around it (CGPA, Projects, Internships)

---

## Photo Recommendations

### Best Practices:
- Use the professional photo you provided (man in black suit)
- Square format (1:1 ratio)
- Minimum 800x800 pixels
- Clean background
- Good lighting
- Professional attire

### File Specifications:
- **Name:** `profile.jpg`
- **Location:** `public/` folder
- **Format:** JPG or PNG
- **Size:** Optimized under 500KB

---

## Visual Design

The photo is integrated with:

1. **Background Circles:**
   - Outer circle: Light blue gradient
   - Inner circle: White to light blue
   - Creates a halo effect

2. **Circular Photo Frame:**
   - Perfect circle crop
   - White 8px border
   - Soft shadow (shadow-2xl)

3. **Floating Stats:**
   - CGPA card (top right)
   - Projects card (bottom left)
   - Internships card (middle left)
   - Smooth floating animations

---

## Fallback

If you don't add a photo, the system will show:
- Blue circle with your initial "D"
- Maintains the same design and layout
- Professional placeholder

---

## Current Status

- ✅ Hero section updated with circular photo design
- ✅ Background circles added for blending effect
- ✅ White border and shadow applied
- ✅ Floating stats positioned around photo
- ✅ Smooth animations added
- ✅ Fallback placeholder configured
- ✅ Build successful

---

## Run Your Portfolio

```powershell
npm run dev
```

Access at: **http://localhost:5173**

The photo will appear in the hero section on the right side, beautifully integrated with the background and floating stat cards.
