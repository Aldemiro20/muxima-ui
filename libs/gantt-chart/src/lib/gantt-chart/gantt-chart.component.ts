import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface GanttTask {
  id: string | number;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  dependencies?: (string | number)[];
  assignee?: string;
  color?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  parentId?: string | number;
  collapsed?: boolean;
}

export interface GanttMilestone {
  id: string | number;
  name: string;
  date: Date;
  color?: string;
  icon?: string;
}

@Component({
  selector: 'muxima-gantt-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit, OnChanges {
  @Input() tasks: GanttTask[] = [];
  @Input() milestones: GanttMilestone[] = [];
  @Input() showWeekends: boolean = true;
  @Input() showToday: boolean = true;
  @Input() zoomLevel: 'day' | 'week' | 'month' = 'day';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() height: string = '600px';
  @Input() allowDrag: boolean = false;
  @Input() showProgress: boolean = true;
  @Input() showDependencies: boolean = true;
  
  @Output() taskClicked = new EventEmitter<GanttTask>();
  @Output() taskUpdated = new EventEmitter<GanttTask>();
  @Output() dateRangeChanged = new EventEmitter<{ minDate: Date; maxDate: Date }>();

  timelineHeaders: { label: string; date: Date }[] = [];
  dateRange: Date[] = [];
  today = new Date();
  
  gridTemplateColumns = '';
  rowHeight = 40;
  
  ngOnInit(): void {
    this.calculateDateRange();
    this.generateTimeline();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] || changes['minDate'] || changes['maxDate'] || changes['zoomLevel']) {
      this.calculateDateRange();
      this.generateTimeline();
    }
  }

  private calculateDateRange(): void {
    if (this.tasks.length === 0) {
      const now = new Date();
      this.minDate = this.minDate || new Date(now.getFullYear(), now.getMonth(), 1);
      this.maxDate = this.maxDate || new Date(now.getFullYear(), now.getMonth() + 3, 0);
      return;
    }

    const dates = this.tasks.flatMap(t => [t.startDate, t.endDate]);
    const minTaskDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxTaskDate = new Date(Math.max(...dates.map(d => d.getTime())));

    this.minDate = this.minDate || new Date(minTaskDate.getFullYear(), minTaskDate.getMonth(), 1);
    this.maxDate = this.maxDate || new Date(maxTaskDate.getFullYear(), maxTaskDate.getMonth() + 1, 0);
  }

  private generateTimeline(): void {
    if (!this.minDate || !this.maxDate) return;

    this.dateRange = [];
    this.timelineHeaders = [];
    
    const current = new Date(this.minDate);
    
    while (current <= this.maxDate) {
      this.dateRange.push(new Date(current));
      
      if (this.zoomLevel === 'day') {
        this.timelineHeaders.push({
          label: this.formatDayHeader(current),
          date: new Date(current)
        });
        current.setDate(current.getDate() + 1);
      } else if (this.zoomLevel === 'week') {
        this.timelineHeaders.push({
          label: `Semana ${this.getWeekNumber(current)}`,
          date: new Date(current)
        });
        current.setDate(current.getDate() + 7);
      } else {
        this.timelineHeaders.push({
          label: this.formatMonthHeader(current),
          date: new Date(current)
        });
        current.setMonth(current.getMonth() + 1);
      }
    }

    this.gridTemplateColumns = `repeat(${this.dateRange.length}, 1fr)`;
  }

  private formatDayHeader(date: Date): string {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return `${days[date.getDay()]} ${date.getDate()}`;
  }

  private formatMonthHeader(date: Date): string {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  getTaskPosition(task: GanttTask): { left: string; width: string } {
    if (!this.minDate) return { left: '0%', width: '0%' };

    const totalDays = this.getDaysBetween(this.minDate, this.maxDate!);
    const startOffset = this.getDaysBetween(this.minDate, task.startDate);
    const duration = this.getDaysBetween(task.startDate, task.endDate);

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.max(1, width)}%`
    };
  }

  private getDaysBetween(date1: Date, date2: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / msPerDay);
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, this.today);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  getMilestonePosition(milestone: GanttMilestone): string {
    if (!this.minDate || !this.maxDate) return '0%';
    
    const totalDays = this.getDaysBetween(this.minDate, this.maxDate);
    const offset = this.getDaysBetween(this.minDate, milestone.date);
    
    return `${(offset / totalDays) * 100}%`;
  }

  onTaskClick(task: GanttTask): void {
    this.taskClicked.emit(task);
  }

  getTaskColor(task: GanttTask): string {
    if (task.color) return task.color;
    
    switch (task.priority) {
      case 'critical': return '#f56565';
      case 'high': return '#ed8936';
      case 'medium': return '#48bb78';
      case 'low': return '#4299e1';
      default: return '#667eea';
    }
  }

  getProgressWidth(task: GanttTask): string {
    return `${task.progress}%`;
  }

  formatDateRange(task: GanttTask): string {
    const start = this.formatDate(task.startDate);
    const end = this.formatDate(task.endDate);
    return `${start} - ${end}`;
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  getVisibleTasks(): GanttTask[] {
    return this.tasks.filter(task => !task.parentId || this.isParentExpanded(task.parentId));
  }

  private isParentExpanded(parentId: string | number): boolean {
    const parent = this.tasks.find(t => t.id === parentId);
    return parent ? !parent.collapsed : true;
  }

  hasChildren(task: GanttTask): boolean {
    return this.tasks.some(t => t.parentId === task.id);
  }

  toggleCollapse(task: GanttTask): void {
    task.collapsed = !task.collapsed;
  }

  getTaskLevel(task: GanttTask): number {
    let level = 0;
    let currentTask = task;
    
    while (currentTask.parentId) {
      level++;
      const parent = this.tasks.find(t => t.id === currentTask.parentId);
      if (!parent) break;
      currentTask = parent;
    }
    
    return level;
  }

  getPriorityIcon(priority?: string): string {
    switch (priority) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  }

  zoomIn(): void {
    if (this.zoomLevel === 'month') this.zoomLevel = 'week';
    else if (this.zoomLevel === 'week') this.zoomLevel = 'day';
    this.generateTimeline();
  }

  zoomOut(): void {
    if (this.zoomLevel === 'day') this.zoomLevel = 'week';
    else if (this.zoomLevel === 'week') this.zoomLevel = 'month';
    this.generateTimeline();
  }

  exportToPNG(): void {
    console.log('Exportando para PNG...');
    // Implementação futura com html2canvas
  }
}
