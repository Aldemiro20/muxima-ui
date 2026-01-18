# Skeleton Loader Component

A lightweight skeleton loader component for displaying loading placeholders with smooth animations.

## Features

- 💀 Multiple shapes (rectangle, circle, text, avatar, card)
- ✨ Three animation types (pulse, wave, shimmer)
- 📏 Predefined sizes (sm, md, lg) with custom dimensions
- 🎨 Customizable styling
- 🚀 High performance with CSS animations
- 📱 Responsive design

## Installation

```bash
npm install @muxima-ui/skeleton
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { SkeletonComponent } from '@muxima-ui/skeleton';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <muxima-skeleton></muxima-skeleton>
  `
})
export class DemoComponent {}
```

### Card Loading Skeleton

```html
<div class="card">
  <muxima-skeleton shape="avatar" size="lg"></muxima-skeleton>
  <muxima-skeleton shape="text" width="80%" [count]="3"></muxima-skeleton>
  <muxima-skeleton shape="rectangle" width="100%" height="200px"></muxima-skeleton>
</div>
```

### User Profile Loading

```html
<div class="profile">
  <muxima-skeleton shape="circle" size="lg"></muxima-skeleton>
  <muxima-skeleton shape="text" width="150px"></muxima-skeleton>
  <muxima-skeleton shape="text" width="200px"></muxima-skeleton>
</div>
```

### Table Loading

```html
<table>
  <tbody>
    <tr *ngFor="let i of [1,2,3,4,5]">
      <td><muxima-skeleton shape="text" width="100%"></muxima-skeleton></td>
      <td><muxima-skeleton shape="text" width="100%"></muxima-skeleton></td>
      <td><muxima-skeleton shape="text" width="100%"></muxima-skeleton></td>
    </tr>
  </tbody>
</table>
```

### List with Avatars

```html
<div class="list">
  <div class="list-item" *ngFor="let i of [1,2,3]">
    <muxima-skeleton shape="avatar" size="md"></muxima-skeleton>
    <div class="content">
      <muxima-skeleton shape="text" width="120px"></muxima-skeleton>
      <muxima-skeleton shape="text" width="180px"></muxima-skeleton>
    </div>
  </div>
</div>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | `'rectangle' \| 'circle' \| 'text' \| 'avatar' \| 'card'` | `'rectangle'` | Shape of the skeleton |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Predefined size (for circle/avatar) |
| `width` | `string` | - | Custom width (e.g., '200px', '50%') |
| `height` | `string` | - | Custom height (e.g., '100px', '3rem') |
| `count` | `number` | `1` | Number of skeleton items to display |
| `borderRadius` | `string` | - | Custom border radius |

### Size Reference

| Size | Dimensions |
|------|-----------|
| `sm` | 32px × 32px |
| `md` | 48px × 48px |
| `lg` | 64px × 64px |

## Shape Examples

### Rectangle (Default)

```html
<muxima-skeleton width="300px" height="200px"></muxima-skeleton>
```

### Circle

```html
<muxima-skeleton shape="circle" size="md"></muxima-skeleton>
```

### Text Lines

```html
<muxima-skeleton shape="text" width="100%" [count]="5"></muxima-skeleton>
```

### Avatar

```html
<muxima-skeleton shape="avatar" size="lg"></muxima-skeleton>
```

### Card

```html
<muxima-skeleton shape="card" width="300px" height="400px"></muxima-skeleton>
```

## Animation Types

### Pulse (Default)

```html
<muxima-skeleton animation="pulse"></muxima-skeleton>
```

Smooth opacity transition creating a breathing effect.

### Wave

```html
<muxima-skeleton animation="wave"></muxima-skeleton>
```

Moving gradient wave animation from left to right.

### None

```html
<muxima-skeleton animation="none"></muxima-skeleton>
```

Static skeleton without animation.

## Advanced Examples

### Blog Post Loading

```html
<article>
  <muxima-skeleton shape="rectangle" width="100%" height="300px"></muxima-skeleton>
  <muxima-skeleton shape="text" width="80%" height="32px" style="margin-top: 20px;"></muxima-skeleton>
  <muxima-skeleton shape="text" width="100%" [count]="4" style="margin-top: 12px;"></muxima-skeleton>
  <div style="display: flex; gap: 12px; margin-top: 20px;">
    <muxima-skeleton shape="avatar" size="sm"></muxima-skeleton>
    <muxima-skeleton shape="text" width="100px"></muxima-skeleton>
  </div>
</article>
```

### Product Grid Loading

```html
<div class="grid">
  <div class="product-card" *ngFor="let i of [1,2,3,4,5,6]">
    <muxima-skeleton shape="rectangle" width="100%" height="200px"></muxima-skeleton>
    <muxima-skeleton shape="text" width="90%" style="margin-top: 12px;"></muxima-skeleton>
    <muxima-skeleton shape="text" width="60%"></muxima-skeleton>
    <muxima-skeleton shape="rectangle" width="80px" height="36px" style="margin-top: 12px;"></muxima-skeleton>
  </div>
</div>
```

### Dashboard Loading

```html
<div class="dashboard">
  <div class="stats">
    <muxima-skeleton shape="card" width="250px" height="120px" *ngFor="let i of [1,2,3,4]"></muxima-skeleton>
  </div>
  <muxima-skeleton shape="rectangle" width="100%" height="400px" style="margin-top: 24px;"></muxima-skeleton>
</div>
```

## Styling

Customize the skeleton appearance with CSS:

```css
muxima-skeleton {
  --skeleton-bg-start: #e2e8f0;
  --skeleton-bg-mid: #f1f5f9;
  --skeleton-bg-end: #e2e8f0;
  --skeleton-border-radius: 4px;
}
```

## Best Practices

1. **Match Content Structure**: Design skeletons that match the actual content layout
2. **Use Appropriate Counts**: Display the expected number of items
3. **Combine Shapes**: Mix different shapes for realistic loading states
4. **Add Spacing**: Use margins/padding to match real content spacing
5. **Keep It Simple**: Don't over-complicate the skeleton structure

## Performance

The skeleton loader uses pure CSS animations for optimal performance:
- No JavaScript animations
- GPU-accelerated transforms
- Minimal DOM manipulation
- Low memory footprint

## Accessibility

- Semantic HTML with proper attributes
- Screen reader friendly
- No motion for users who prefer reduced motion

## License

MIT
