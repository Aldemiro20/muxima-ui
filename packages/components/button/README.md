# Muxima Button

Modern and versatile button component for Angular with multiple variants and hover effects.

## Features

- 12 built-in variants (primary, secondary, danger, success, warning, info, gradient, purple, glass, outline, ghost, neon)
- 5 hover effect options (shadow, gradient, lift, scale, none)
- SVG icon support via content projection
- Image icon support
- 5 size options (sm, md, lg, xl, 2xl)
- Fully customizable

## Installation

```typescript
import { ButtonComponent } from '@muxima/button';
```

## Usage

### Basic Button

```html
<muxima-button text="Click Me" variant="primary"></muxima-button>
```

### Button with Icon (SVG)

```html
<muxima-button 
  text="Add User" 
  variant="purple"
  [iconSvg]="true"
  hoverEffect="shadow">
  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
  </svg>
</muxima-button>
```

### Button with Image Icon

```html
<muxima-button 
  text="Settings" 
  variant="secondary"
  icon="/assets/settings-icon.png">
</muxima-button>
```

## Hover Effects

### `shadow` (default)
Subtle lift with purple shadow - Perfect for primary actions
```html
<muxima-button text="Button" hoverEffect="shadow"></muxima-button>
```
Effect: `translateY(-2px)` + `box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4)`

### `gradient`
Gradient background animation - Great for call-to-action buttons
```html
<muxima-button text="Button" hoverEffect="gradient"></muxima-button>
```
Effect: Background position shift + shadow

### `lift`
More pronounced lift effect - Good for standalone buttons
```html
<muxima-button text="Button" hoverEffect="lift"></muxima-button>
```
Effect: `translateY(-4px)` + larger shadow

### `scale`
Scale up with shadow - Modern feel
```html
<muxima-button text="Button" hoverEffect="scale"></muxima-button>
```
Effect: `scale(1.05)` + shadow

### `none`
No hover effect - For disabled-looking or minimal design
```html
<muxima-button text="Button" hoverEffect="none"></muxima-button>
```

## Variants

- **primary**: Blue gradient (default)
- **secondary**: Gray gradient
- **danger**: Red gradient
- **success**: Green gradient
- **warning**: Orange gradient
- **info**: Cyan gradient
- **gradient**: Purple gradient with shimmer effect
- **purple**: Dashboard-style purple gradient
- **glass**: Glassmorphism effect
- **outline**: Transparent with border
- **ghost**: Minimal style
- **neon**: Neon glow effect

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| text | string | - | Button text |
| variant | string | 'primary' | Button style variant |
| size | string | 'lg' | Button size (sm, md, lg, xl, 2xl) |
| hoverEffect | string | 'shadow' | Hover animation type |
| disabled | boolean | false | Disabled state |
| type | string | 'submit' | HTML button type |
| icon | string | - | Image icon URL |
| iconSvg | boolean | false | Enable SVG icon via ng-content |
| iconPosition | string | 'left' | Icon position (left, right) |
| wFull | boolean | false | Full width button |

## Examples

### Dashboard-style Button
```html
<muxima-button 
  text="Add New User" 
  variant="purple"
  hoverEffect="shadow"
  [iconSvg]="true">
  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
</muxima-button>
```

### Gradient Animated Button
```html
<muxima-button 
  text="Start Now" 
  variant="gradient"
  hoverEffect="gradient"
  size="xl">
</muxima-button>
```

### Glass Effect Button
```html
<muxima-button 
  text="Learn More" 
  variant="glass"
  hoverEffect="lift">
</muxima-button>
```

## Running unit tests

Run `nx test button` to execute the unit tests.
