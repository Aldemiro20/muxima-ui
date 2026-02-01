import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '@muxima-ui/stats-card';

@Component({
  selector: 'app-stats-card-doc',
  standalone: true,
  imports: [CommonModule, StatsCardComponent],
  templateUrl: './stats-card-doc.component.html',
  styleUrls: ['./stats-card-doc.component.scss']
})
export class StatsCardDocComponent {
  // Sample sparkline data
  revenueData = [45, 52, 48, 60, 55, 68, 72, 70, 80, 85, 90, 95];
  usersData = [120, 132, 125, 145, 150, 165, 170, 180, 185, 195, 200, 210];
  ordersData = [85, 80, 75, 82, 78, 88, 92, 90, 95, 98, 100, 105];
  bounceData = [65, 62, 58, 55, 52, 50, 48, 45, 42, 40, 38, 35];

  codeExamples: { [key: string]: string } = {
    import: `import { StatsCardComponent } from '@muxima-ui/stats-card';

@Component({
  standalone: true,
  imports: [StatsCardComponent],
  // ...
})`,
    basic: `<muxima-stats-card
  label="Total Revenue"
  value="$45,231"
  icon="💰"
  [trend]="12.5"
  trendLabel="vs last month"
  color="primary">
</muxima-stats-card>`,
    withSparkline: `<muxima-stats-card
  label="Active Users"
  value="2,543"
  icon="👥"
  [trend]="8.2"
  trendLabel="this week"
  [sparklineData]="[120, 132, 125, 145, 150, 165, 170, 180, 185, 195, 200, 210]"
  color="success">
</muxima-stats-card>`,
    colors: `<!-- Primary (Purple) -->
<muxima-stats-card color="primary" ...></muxima-stats-card>

<!-- Success (Green) -->
<muxima-stats-card color="success" ...></muxima-stats-card>

<!-- Warning (Orange) -->
<muxima-stats-card color="warning" ...></muxima-stats-card>

<!-- Danger (Red) -->
<muxima-stats-card color="danger" ...></muxima-stats-card>

<!-- Info (Blue) -->
<muxima-stats-card color="info" ...></muxima-stats-card>`,
    sizes: `<!-- Small -->
<muxima-stats-card size="sm" ...></muxima-stats-card>

<!-- Medium (Default) -->
<muxima-stats-card size="md" ...></muxima-stats-card>

<!-- Large -->
<muxima-stats-card size="lg" ...></muxima-stats-card>`,
    loading: `<muxima-stats-card
  label="Loading Data"
  [loading]="true">
</muxima-stats-card>`,
    dashboard: `<!-- Dashboard Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
  <muxima-stats-card
    label="Total Revenue"
    value="$45,231"
    icon="💰"
    [trend]="12.5"
    trendLabel="vs last month"
    [sparklineData]="revenueData"
    color="primary">
  </muxima-stats-card>

  <muxima-stats-card
    label="Active Users"
    value="2,543"
    icon="👥"
    [trend]="8.2"
    trendLabel="this week"
    [sparklineData]="usersData"
    color="success">
  </muxima-stats-card>

  <muxima-stats-card
    label="Total Orders"
    value="1,234"
    icon="📦"
    [trend]="-3.1"
    trendLabel="vs yesterday"
    [sparklineData]="ordersData"
    color="info">
  </muxima-stats-card>

  <muxima-stats-card
    label="Bounce Rate"
    value="35.2%"
    icon="📊"
    [trend]="-4.8"
    trendLabel="improvement"
    [sparklineData]="bounceData"
    color="warning">
  </muxima-stats-card>
</div>`
  };

  getCodeExample(key: string): string {
    return this.codeExamples[key] || '';
  }
}
