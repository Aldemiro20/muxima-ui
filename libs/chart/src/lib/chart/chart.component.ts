import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'radar' | 'polarArea';
export type ChartSize = 'sm' | 'md' | 'lg';

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
}

@Component({
  selector: 'muxima-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: ChartType = 'line';
  @Input() data!: ChartData;
  @Input() size: ChartSize = 'md';
  @Input() title: string = '';
  @Input() showLegend: boolean = true;
  @Input() showGrid: boolean = true;
  @Input() animated: boolean = true;

  private ctx!: CanvasRenderingContext2D;
  private animationProgress = 0;

  ngAfterViewInit() {
    if (this.canvas) {
      const context = this.canvas.nativeElement.getContext('2d');
      if (context) {
        this.ctx = context;
        this.renderChart();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.ctx && (changes['data'] || changes['type'])) {
      this.renderChart();
    }
  }

  private renderChart() {
    if (!this.ctx || !this.data) return;

    const canvas = this.canvas.nativeElement;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    this.ctx.scale(2, 2);

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.animated) {
      this.animateChart();
    } else {
      this.animationProgress = 1;
      this.drawChart();
    }
  }

  private animateChart() {
    this.animationProgress = 0;
    const animate = () => {
      this.animationProgress += 0.05;
      if (this.animationProgress > 1) this.animationProgress = 1;

      this.drawChart();

      if (this.animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }

  private drawChart() {
    switch (this.type) {
      case 'line':
        this.drawLineChart();
        break;
      case 'bar':
        this.drawBarChart();
        break;
      case 'pie':
        this.drawPieChart();
        break;
      case 'donut':
        this.drawDonutChart();
        break;
      case 'area':
        this.drawAreaChart();
        break;
      case 'radar':
        this.drawRadarChart();
        break;
      case 'polarArea':
        this.drawPolarAreaChart();
        break;
    }
  }

  private drawLineChart() {
    const canvas = this.canvas.nativeElement;
    const padding = 40;
    const width = canvas.offsetWidth - padding * 2;
    const height = canvas.offsetHeight - padding * 2;

    // Grid
    if (this.showGrid) {
      this.ctx.strokeStyle = '#e5e7eb';
      this.ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, y);
        this.ctx.lineTo(padding + width, y);
        this.ctx.stroke();
      }
    }

    // Lines
    this.data.datasets.forEach((dataset, datasetIndex) => {
      this.ctx.strokeStyle = dataset.borderColor || this.getColor(datasetIndex);
      this.ctx.lineWidth = dataset.borderWidth || 3;
      this.ctx.beginPath();

      dataset.data.forEach((value, index) => {
        const x = padding + (width / (dataset.data.length - 1)) * index;
        const maxValue = Math.max(...dataset.data);
        const y = padding + height - (value / maxValue) * height * this.animationProgress;

        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });

      this.ctx.stroke();

      // Points
      dataset.data.forEach((value, index) => {
        const x = padding + (width / (dataset.data.length - 1)) * index;
        const maxValue = Math.max(...dataset.data);
        const y = padding + height - (value / maxValue) * height * this.animationProgress;

        this.ctx.fillStyle = dataset.borderColor || this.getColor(datasetIndex);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      });
    });
  }

  private drawBarChart() {
    const canvas = this.canvas.nativeElement;
    const padding = 40;
    const width = canvas.offsetWidth - padding * 2;
    const height = canvas.offsetHeight - padding * 2;

    const barWidth = width / this.data.labels.length / this.data.datasets.length - 10;
    const maxValue = Math.max(...this.data.datasets.flatMap(d => d.data));

    this.data.datasets.forEach((dataset, datasetIndex) => {
      dataset.data.forEach((value, index) => {
        const x = padding + (width / this.data.labels.length) * index + barWidth * datasetIndex + 10;
        const barHeight = (value / maxValue) * height * this.animationProgress;
        const y = padding + height - barHeight;

        const color = Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[index]
          : dataset.backgroundColor || this.getColor(datasetIndex);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, barWidth, barHeight);
      });
    });
  }

  private drawPieChart() {
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const total = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
    let currentAngle = -Math.PI / 2;

    this.data.datasets[0].data.forEach((value, index) => {
      const sliceAngle = (value / total) * Math.PI * 2 * this.animationProgress;

      const color = Array.isArray(this.data.datasets[0].backgroundColor)
        ? this.data.datasets[0].backgroundColor[index]
        : this.getColor(index);

      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      this.ctx.closePath();
      this.ctx.fill();

      currentAngle += sliceAngle;
    });
  }

  private drawDonutChart() {
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 40;
    const innerRadius = radius * 0.6;

    const total = this.data.datasets[0].data.reduce((a, b) => a + b, 0);
    let currentAngle = -Math.PI / 2;

    this.data.datasets[0].data.forEach((value, index) => {
      const sliceAngle = (value / total) * Math.PI * 2 * this.animationProgress;

      const color = Array.isArray(this.data.datasets[0].backgroundColor)
        ? this.data.datasets[0].backgroundColor[index]
        : this.getColor(index);

      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      this.ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      this.ctx.closePath();
      this.ctx.fill();

      currentAngle += sliceAngle;
    });
  }

  private drawAreaChart() {
    const canvas = this.canvas.nativeElement;
    const padding = 40;
    const width = canvas.offsetWidth - padding * 2;
    const height = canvas.offsetHeight - padding * 2;

    // Grid
    if (this.showGrid) {
      this.ctx.strokeStyle = '#e5e7eb';
      this.ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, y);
        this.ctx.lineTo(padding + width, y);
        this.ctx.stroke();
      }
    }

    this.data.datasets.forEach((dataset, datasetIndex) => {
      const points = dataset.data.length;
      const stepX = width / (points - 1);
      const maxValue = Math.max(...this.data.datasets.flatMap(d => d.data));

      const color = dataset.borderColor || this.getColor(datasetIndex);
      const fillColor = typeof dataset.backgroundColor === 'string' 
        ? dataset.backgroundColor 
        : (Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : color);

      // Draw filled area
      const fillStyle = typeof fillColor === 'string' 
        ? (fillColor.includes('rgba') ? fillColor : `${fillColor}33`)
        : fillColor;
      this.ctx.fillStyle = fillStyle;
      this.ctx.beginPath();
      this.ctx.moveTo(padding, padding + height);

      dataset.data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height * this.animationProgress;
        if (index === 0) {
          this.ctx.lineTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });

      this.ctx.lineTo(padding + width, padding + height);
      this.ctx.closePath();
      this.ctx.fill();

      // Draw line
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();

      dataset.data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height * this.animationProgress;
        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.stroke();

      // Draw points
      dataset.data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height * this.animationProgress;
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      });
    });
  }

  private drawRadarChart() {
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 60;
    const numPoints = this.data.labels.length;
    const angleStep = (Math.PI * 2) / numPoints;

    // Draw grid circles
    this.ctx.strokeStyle = '#e5e7eb';
    this.ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Draw grid lines
    for (let i = 0; i < numPoints; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    // Draw labels
    this.ctx.fillStyle = '#475569';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    for (let i = 0; i < numPoints; i++) {
      const angle = angleStep * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius + 25);
      const y = centerY + Math.sin(angle) * (radius + 25);
      this.ctx.fillText(this.data.labels[i], x, y);
    }

    // Draw datasets
    const maxValue = Math.max(...this.data.datasets.flatMap(d => d.data));
    this.data.datasets.forEach((dataset, datasetIndex) => {
      const color = dataset.borderColor || this.getColor(datasetIndex);
      const fillColor = typeof dataset.backgroundColor === 'string' 
        ? dataset.backgroundColor 
        : (Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : color);

      // Fill area
      const fillStyle = typeof fillColor === 'string' 
        ? (fillColor.includes('rgba') ? fillColor : `${fillColor}33`)
        : fillColor;
      this.ctx.fillStyle = fillStyle;
      this.ctx.beginPath();
      dataset.data.forEach((value, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (value / maxValue) * radius * this.animationProgress;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.closePath();
      this.ctx.fill();

      // Draw line
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      dataset.data.forEach((value, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (value / maxValue) * radius * this.animationProgress;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.closePath();
      this.ctx.stroke();

      // Draw points
      dataset.data.forEach((value, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (value / maxValue) * radius * this.animationProgress;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      });
    });
  }

  private drawPolarAreaChart() {
    const canvas = this.canvas.nativeElement;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;
    const numSlices = this.data.datasets[0].data.length;
    const angleStep = (Math.PI * 2) / numSlices;

    const maxValue = Math.max(...this.data.datasets[0].data);
    let currentAngle = -Math.PI / 2;

    this.data.datasets[0].data.forEach((value, index) => {
      const radius = (value / maxValue) * maxRadius * this.animationProgress;

      const color = Array.isArray(this.data.datasets[0].backgroundColor)
        ? this.data.datasets[0].backgroundColor[index]
        : this.getColor(index);

      this.ctx.fillStyle = color.includes('rgba') ? color : `${color}99`;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angleStep);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      currentAngle += angleStep;
    });
  }

  private getColor(index: number): string {
    const colors = [
      '#667eea',
      '#764ba2',
      '#f093fb',
      '#4facfe',
      '#43e97b',
      '#fa709a',
      '#fee140',
      '#30cfd0'
    ];
    return colors[index % colors.length];
  }

  get sizeClass(): string {
    return `chart-${this.size}`;
  }

  get legendItems() {
    if (!this.data || !this.data.datasets[0]) return [];
    
    return this.data.labels.map((label, index) => ({
      label,
      color: Array.isArray(this.data.datasets[0].backgroundColor)
        ? this.data.datasets[0].backgroundColor[index]
        : this.getColor(index)
    }));
  }
}
