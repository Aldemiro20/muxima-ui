# Chart Component

A flexible and lightweight charting component that supports multiple chart types with smooth animations. Built using native Canvas 2D API without external dependencies.

## Features

- 📊 **4 Chart Types**: Line, Bar, Pie, and Donut charts
- 🎨 **8 Gradient Colors**: Beautiful default color palette
- ⚡ **Smooth Animations**: 60fps animations using requestAnimationFrame
- 📱 **3 Size Variants**: Small, Medium, and Large
- 🎯 **TypeScript Support**: Full type safety with interfaces
- 🪶 **Lightweight**: No external chart libraries required
- 🎭 **Legend Support**: Automatic legend generation with color indicators

## Installation

```bash
npm install @muxima-ui/chart
```

## Usage

### Basic Line Chart

```typescript
import { Component } from '@angular/core';
import { ChartComponent, ChartData } from '@muxima-ui/chart';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <muxima-chart
      [data]="salesData"
      [type]="'line'"
      [title]="'Monthly Sales'"
      [size]="'md'"
      [animated]="true">
    </muxima-chart>
  `
})
export class AnalyticsComponent {
  salesData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)'
    }]
  };
}
```

### Bar Chart with Multiple Datasets

```typescript
revenueData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Product A',
      data: [45, 52, 48, 65],
      backgroundColor: '#667eea'
    },
    {
      label: 'Product B',
      data: [38, 42, 55, 50],
      backgroundColor: '#764ba2'
    }
  ]
};
```

```html
<muxima-chart
  [data]="revenueData"
  [type]="'bar'"
  [title]="'Quarterly Revenue'"
  [size]="'lg'">
</muxima-chart>
```

### Pie Chart

```typescript
marketShareData: ChartData = {
  labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
  datasets: [{
    label: 'Market Share',
    data: [65, 15, 10, 7, 3],
    backgroundColor: [
      '#667eea', '#764ba2', '#f093fb',
      '#4facfe', '#43e97b'
    ]
  }]
};
```

```html
<muxima-chart
  [data]="marketShareData"
  [type]="'pie'"
  [title]="'Browser Market Share'">
</muxima-chart>
```

### Donut Chart

```typescript
trafficData: ChartData = {
  labels: ['Direct', 'Search', 'Social', 'Email'],
  datasets: [{
    label: 'Traffic Sources',
    data: [40, 30, 20, 10],
    backgroundColor: [
      '#667eea', '#764ba2', '#f093fb', '#4facfe'
    ]
  }]
};
```

```html
<muxima-chart
  [data]="trafficData"
  [type]="'donut'"
  [title]="'Traffic Sources'"
  [size]="'md'"
  [animated]="true">
</muxima-chart>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `ChartData` | - | **Required**. Chart data with labels and datasets |
| `type` | `'line' \| 'bar' \| 'pie' \| 'donut'` | `'line'` | Type of chart to render |
| `title` | `string` | `''` | Chart title displayed above |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Chart size (200px, 300px, 400px) |
| `animated` | `boolean` | `true` | Enable smooth animations |

### Interfaces

```typescript
interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}
```

## Chart Types

### Line Chart
- **Use Case**: Time series data, trends, comparisons
- **Features**: Grid lines, point markers, smooth lines
- **Best For**: Stock prices, temperature, website analytics

### Bar Chart
- **Use Case**: Category comparisons, multiple datasets
- **Features**: Multiple series support, automatic bar spacing
- **Best For**: Sales by region, product comparisons, survey results

### Pie Chart
- **Use Case**: Part-to-whole relationships
- **Features**: Circular slices, percentage visualization
- **Best For**: Market share, budget allocation, demographics

### Donut Chart
- **Use Case**: Similar to pie with center focus area
- **Features**: Inner radius cutout, cleaner look
- **Best For**: Progress tracking, category breakdown with totals

## Size Variants

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 200 x 200px | Small widgets, cards |
| `md` | 300 x 300px | Dashboard panels, reports |
| `lg` | 400 x 400px | Full-width sections, presentations |

## Color Palette

The component uses 8 gradient colors by default:

```typescript
const colors = [
  '#667eea', // Primary Purple
  '#764ba2', // Deep Purple
  '#f093fb', // Pink
  '#4facfe', // Blue
  '#43e97b', // Green
  '#fa709a', // Rose
  '#fee140', // Yellow
  '#30cfd0'  // Cyan
];
```

You can override colors in the `datasets`:

```typescript
datasets: [{
  label: 'Custom Colors',
  data: [10, 20, 30],
  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1']
}]
```

## Animation

Charts animate on mount with a smooth 1-second animation:
- **Line**: Points and lines draw progressively
- **Bar**: Bars grow from bottom to top
- **Pie/Donut**: Slices reveal clockwise

Disable animations:
```html
<muxima-chart [animated]="false" ...></muxima-chart>
```

## Advanced Examples

### Real-time Data Updates

```typescript
export class DashboardComponent implements OnInit {
  chartData: ChartData = {
    labels: [],
    datasets: [{ label: 'Live Data', data: [] }]
  };

  ngOnInit() {
    setInterval(() => {
      this.chartData.labels.push(new Date().toLocaleTimeString());
      this.chartData.datasets[0].data.push(Math.random() * 100);
      
      // Keep last 10 points
      if (this.chartData.labels.length > 10) {
        this.chartData.labels.shift();
        this.chartData.datasets[0].data.shift();
      }
    }, 2000);
  }
}
```

### Responsive Dashboard

```html
<div class="dashboard-grid">
  <muxima-chart
    [data]="salesData"
    [type]="'line'"
    [size]="'md'"
    [title]="'Sales Trend'">
  </muxima-chart>
  
  <muxima-chart
    [data]="revenueData"
    [type]="'bar'"
    [size]="'md'"
    [title]="'Revenue by Product'">
  </muxima-chart>
  
  <muxima-chart
    [data]="trafficData"
    [type]="'donut'"
    [size]="'sm'"
    [title]="'Traffic Sources'">
  </muxima-chart>
</div>
```

## Accessibility

- Charts use semantic HTML structure
- Titles provided via `[title]` prop
- Legend with color indicators for screen readers
- Consider providing data tables as fallback

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Requires Canvas 2D API support
- No IE11 support

## License

MIT
