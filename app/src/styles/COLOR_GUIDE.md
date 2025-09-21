# Centralized Color Palette System

## 📁 File Location

**Primary Color Definitions:** `/src/styles/color-palette.css`

## 🎨 How to Use the Color System

### Quick Start

All colors are defined as CSS custom properties (variables) and can be used throughout your application:

```css
/* In any CSS file */
.my-component {
  background-color: var(--btn-primary-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}
```

```jsx
/* In React inline styles */
<div
  style={{
    backgroundColor: "var(--nav-background)",
    color: "var(--nav-text)",
  }}
>
  Navigation Item
</div>
```

## 🎯 Purpose-Based Color Categories

### Navigation Colors

- `--nav-background` - Main navigation background
- `--nav-text` - Navigation text color
- `--nav-text-hover` - Navigation hover state
- `--nav-link-active` - Active navigation link

### Button Colors

- `--btn-primary-bg` - Primary button background
- `--btn-primary-bg-hover` - Primary button hover state
- `--btn-secondary-bg` - Secondary button background
- `--btn-success-bg` - Success button background
- `--btn-danger-bg` - Danger/error button background
- `--btn-warning-bg` - Warning button background

### Text Colors

- `--text-primary` - Main body text
- `--text-secondary` - Secondary text (subtitles)
- `--text-muted` - Muted/placeholder text
- `--text-link` - Link colors
- `--text-error` - Error message text
- `--text-success` - Success message text

### Background Colors

- `--bg-primary` - Main page background
- `--bg-secondary` - Secondary section background
- `--bg-hero-gradient` - Hero section gradient
- `--bg-section-gradient` - Section background gradient

### Header Colors

- `--header-primary` - Main heading text
- `--header-secondary` - Secondary heading text
- `--header-subtitle` - Subtitle text

## ✏️ How to Change Colors Globally

### 1. Edit the Master File

Open `/src/styles/color-palette.css` and modify the color values:

```css
:root {
  /* Change primary brand color from blue to green */
  --brand-primary: #10b981; /* Was: #667eea */
  --brand-primary-dark: #059669; /* Was: #4c63d2 */

  /* This will automatically update ALL components using these colors */
}
```

### 2. Available Customization Points

#### Brand Colors

```css
--brand-primary: #667eea; /* Main brand color */
--brand-primary-dark: #4c63d2; /* Darker variant */
--brand-accent: #ff6b6b; /* Accent color */
```

#### Component-Specific Colors

```css
/* Navigation */
--nav-background: var(--brand-primary); /* Links to brand color */

/* Buttons */
--btn-primary-bg: var(--brand-primary); /* Links to brand color */

/* Text */
--text-primary: #1a202c; /* Independent color */
```

## 🌈 Color Change Examples

### Example 1: Change to Purple Theme

```css
:root {
  --brand-primary: #8b5cf6;
  --brand-primary-dark: #7c3aed;
  --brand-primary-light: #a78bfa;
}
```

### Example 2: Change to Green Theme

```css
:root {
  --brand-primary: #10b981;
  --brand-primary-dark: #059669;
  --brand-primary-light: #34d399;
}
```

### Example 3: Custom Navigation Colors

```css
:root {
  --nav-background: #1f2937; /* Dark gray nav */
  --nav-text: #f9fafb; /* Light text */
  --nav-text-hover: #e5e7eb; /* Hover state */
}
```

## 🔗 Files Using the Color System

1. **`/src/styles/design-system.css`** - Button styles, containers
2. **`/src/components/common/Navigation.jsx`** - Navigation component
3. **`/src/pages/home/CustomerHomePage.jsx`** - Home page sections
4. **`/src/styles/responsive.css`** - Responsive utilities

## 🎨 Advanced Features

### Dark Mode Support

The color palette includes automatic dark mode support:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a202c; /* Auto dark background */
    --text-primary: #f7fafc; /* Auto light text */
  }
}
```

### High Contrast Mode

For accessibility compliance:

```css
@media (prefers-contrast: high) {
  :root {
    --brand-primary: #4c63d2; /* Higher contrast colors */
    --text-primary: #000000;
  }
}
```

### Reduced Motion

Disables gradients for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --bg-hero-gradient: var(--brand-primary); /* Solid color fallback */
  }
}
```

## 🚀 Benefits

✅ **Single Source of Truth** - All colors in one file  
✅ **Global Updates** - Change once, updates everywhere  
✅ **Semantic Naming** - Clear purpose for each color  
✅ **Accessibility** - Built-in dark mode & high contrast  
✅ **Maintainable** - Easy to understand and modify  
✅ **Consistent** - No random colors scattered in code

## 🔧 Development Workflow

1. **Design Phase**: Define colors in `color-palette.css`
2. **Implementation**: Use semantic variables in components
3. **Theme Changes**: Modify only the palette file
4. **Testing**: Colors update automatically across the app

## 📋 Color Reference Quick List

### Most Commonly Used

- `var(--nav-background)` - Navigation bar
- `var(--btn-primary-bg)` - Primary buttons
- `var(--text-primary)` - Body text
- `var(--bg-primary)` - Page background
- `var(--header-primary)` - Main headings
- `var(--border-light)` - Subtle borders
- `var(--card-bg)` - Card backgrounds

### Status Colors

- `var(--status-success)` - Success states
- `var(--status-error)` - Error states
- `var(--status-warning)` - Warning states
- `var(--status-info)` - Info states
