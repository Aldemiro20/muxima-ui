import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ChartData } from '@muxima-ui/chart';

@Component({
  selector: 'app-chart-doc',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './chart-doc.component.html',
  styleUrls: ['./chart-doc.component.scss']
})
export class ChartDocComponent {
  // Line Chart Example
  lineChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)'
    }]
  };

  // Multiple Line Chart
  multiLineChartData: ChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Product A',
        data: [45, 52, 48, 65],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)'
      },
      {
        label: 'Product B',
        data: [38, 42, 55, 50],
        borderColor: '#764ba2',
        backgroundColor: 'rgba(118, 75, 162, 0.1)'
      }
    ]
  };

  // Bar Chart Example
  barChartData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [45000, 52000, 48000, 65000],
        backgroundColor: '#667eea'
      },
      {
        label: 'Revenue 2025',
        data: [48000, 55000, 52000, 70000],
        backgroundColor: '#764ba2'
      }
    ]
  };

  // Pie Chart Example
  pieChartData: ChartData = {
    labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
    datasets: [{
      label: 'Market Share',
      data: [65, 15, 10, 7, 3],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#4facfe',
        '#43e97b'
      ]
    }]
  };

  // Donut Chart Example
  donutChartData: ChartData = {
    labels: ['Direct', 'Search', 'Social', 'Email'],
    datasets: [{
      label: 'Traffic Sources',
      data: [40, 30, 20, 10],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#4facfe'
      ]
    }]
  };

  // Budget Distribution
  budgetChartData: ChartData = {
    labels: ['Marketing', 'Development', 'Sales', 'Operations', 'Support'],
    datasets: [{
      label: 'Budget Allocation',
      data: [30, 35, 15, 12, 8],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#4facfe',
        '#43e97b'
      ]
    }]
  };

  // Area Chart Example
  areaChartData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Page Views',
      data: [1200, 1900, 1500, 2100, 1800, 2400, 2000],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      fill: true
    }]
  };

  // Radar Chart Example
  radarChartData: ChartData = {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
    datasets: [
      {
        label: 'Model A',
        data: [85, 90, 75, 88, 92],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.2)'
      },
      {
        label: 'Model B',
        data: [78, 85, 88, 82, 85],
        borderColor: '#764ba2',
        backgroundColor: 'rgba(118, 75, 162, 0.2)'
      }
    ]
  };

  // Polar Area Chart Example
  polarAreaChartData: ChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: 'Color Distribution',
      data: [11, 16, 7, 14, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  };

  codeExamples = {
    lineChart: `<muxima-chart
  [data]="lineChartData"
  [type]="'line'"
  [title]="'Monthly Sales'"
  [size]="'md'"
  [animated]="true">
</muxima-chart>

lineChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales',
    data: [12, 19, 15, 25, 22, 30],
    borderColor: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.1)'
  }]
};`,
    barChart: `<muxima-chart
  [data]="barChartData"
  [type]="'bar'"
  [title]="'Quarterly Revenue'"
  [size]="'md'">
</muxima-chart>

barChartData: ChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Revenue 2024',
      data: [45000, 52000, 48000, 65000],
      backgroundColor: '#667eea'
    },
    {
      label: 'Revenue 2025',
      data: [48000, 55000, 52000, 70000],
      backgroundColor: '#764ba2'
    }
  ]
};`,
    pieChart: `<muxima-chart
  [data]="pieChartData"
  [type]="'pie'"
  [title]="'Browser Market Share'">
</muxima-chart>

pieChartData: ChartData = {
  labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
  datasets: [{
    label: 'Market Share',
    data: [65, 15, 10, 7, 3],
    backgroundColor: [
      '#667eea', '#764ba2', '#f093fb',
      '#4facfe', '#43e97b'
    ]
  }]
};`,
    donutChart: `<muxima-chart
  [data]="donutChartData"
  [type]="'donut'"
  [title]="'Traffic Sources'"
  [size]="'md'">
</muxima-chart>

donutChartData: ChartData = {
  labels: ['Direct', 'Search', 'Social', 'Email'],
  datasets: [{
    label: 'Traffic Sources',
    data: [40, 30, 20, 10],
    backgroundColor: [
      '#667eea', '#764ba2', '#f093fb', '#4facfe'
    ]
  }]
};`
  };
}
