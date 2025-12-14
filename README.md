# Vedic Hackathon Website

A fully responsive, production-quality hackathon website built with React, Vite, Tailwind CSS, and Framer Motion. The design is inspired by Indian Ancient/Vedic/Temple aesthetics, combining traditional wisdom with modern technology.

## 🚀 Features

- **Fully Responsive Design** - Mobile-first approach, works seamlessly on all devices
- **Dynamic Scroll-Based Background** - Smooth transitions between multiple ancient-inspired scenes as you scroll
- **Particle Effects** - Subtle fire/sparks-style particles floating across the site
- **Smooth Animations** - Powered by Framer Motion for engaging interactions
- **Vedic Theme** - Ancient Indian aesthetics with gold, saffron, and charcoal color palette
- **Modern UI/UX** - Clean, polished interface with micro-interactions
- **Routing** - React Router for navigation, dedicated Team page
- **Performance Optimized** - Lazy loading, reduced animations on mobile, GPU acceleration
- **All Required Sections**:
  - Hero Section with animated background
  - About the Hackathon
  - Tracks & Domains
  - What You Get (Prizes, Certificates, etc.)
  - Schedule/Timeline
  - Team & Management (separate page with category cards)
  - Sponsors Section
  - FAQ (Accordion style)
  - Footer with social links

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library with scroll-based animations
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
hackathon/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Tracks.jsx
│   │   ├── WhatYouGet.jsx
│   │   ├── Schedule.jsx
│   │   ├── TeamPreview.jsx
│   │   ├── Sponsors.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollBackground.jsx
│   │   └── ParticleSystem.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── TeamPage.jsx
│   ├── data/
│   │   └── teamData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
- **Deep Black**: `#0a0a0a` - Primary background
- **Charcoal**: `#1a1a1a` - Secondary background
- **Ancient Gold**: `#D4AF37` - Primary accent
- **Saffron**: `#FF9933` - Secondary accent
- **Burnt Orange**: `#CC5500` - Tertiary accent
- **Sandstone**: `#C19A6B` - Text accent

### Typography
- **Headings**: Cinzel & Cormorant Garamond (serif, ancient-inspired with improved letter spacing)
- **Body**: Inter (clean modern sans-serif)

## ✨ Key Features

- **Dynamic scroll-based background** - Multiple scenes transition smoothly as you scroll:
  - Dark temple interior with gold light
  - Saffron/orange dawn sky
  - Stone texture/parchment effect
  - Deep temple return
- **Particle system** - Canvas-based fire/sparks particles (performance-optimized for mobile)
- **Scroll-based animations** - Elements animate as they come into view using Framer Motion
- **Hover effects** - Interactive cards and buttons with smooth transitions
- **Timeline component** - Visual schedule with animated progress line
- **Accordion FAQ** - Smooth expand/collapse animations
- **Team page** - Dedicated route with category cards and animated member display
- **Responsive navigation** - Fixed navbar with scroll detection and mobile menu
- **Performance optimizations** - Lazy loading, reduced animations on mobile, GPU acceleration

## 🔧 Customization

### Update Team Members
Edit `src/data/teamData.js` to add or modify team members. The Team page will automatically display them in their respective categories.

### Change Colors
Modify the color palette in `tailwind.config.js`.

### Update Content
Each component is self-contained. Edit the respective component files to update content.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Performance Features

- **Lazy loading** - Components load on demand
- **Mobile optimization** - Reduced particle count and animations on mobile devices
- **GPU acceleration** - CSS will-change properties for smooth animations
- **Reduced motion support** - Respects user's motion preferences
- **Optimized images** - Lazy loading for team member photos

## 📄 License

This project is created for the Vedic Hackathon event.

## 👥 Credits

Built with ❤️ for Vedic Hackathon 2024

---

**Note**: This is a frontend-only project with no backend. All data is static and can be easily customized in the component files.

