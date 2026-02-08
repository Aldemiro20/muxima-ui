import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  category?: string;
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

@Component({
  selector: 'muxima-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() view: CalendarView = 'month';
  @Input() currentDate: Date = new Date();
  @Input() weekStartsOn: 0 | 1 = 1; // 0 = Sunday, 1 = Monday
  @Input() showWeekNumbers: boolean = false;
  @Input() allowEventCreation: boolean = true;
  @Input() allowEventEdit: boolean = true;
  @Input() minTime: string = '00:00';
  @Input() maxTime: string = '23:59';
  @Input() slotDuration: number = 30; // minutes
  
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventCreated = new EventEmitter<CalendarEvent>();
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<CalendarEvent>();
  @Output() dateClicked = new EventEmitter<Date>();
  @Output() viewChanged = new EventEmitter<CalendarView>();
  @Output() dateRangeChanged = new EventEmitter<{ start: Date; end: Date }>();

  monthDays: Date[] = [];
  weekDays: Date[] = [];
  dayHours: string[] = [];
  
  today = new Date();
  selectedDate?: Date;
  
  // Event Modal State
  showEventModal = false;
  editingEvent: CalendarEvent | null = null;
  eventForm = {
    title: '',
    start: '',
    startTime: '09:00',
    end: '',
    endTime: '10:00',
    allDay: false,
    description: '',
    location: '',
    category: '',
    color: '#667eea',
    recurring: 'none' as 'none' | 'daily' | 'weekly' | 'monthly'
  };
  
  // Context Menu State
  showContextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextMenuEvent: CalendarEvent | null = null;
  
  // Search & Filter
  searchQuery = '';
  selectedCategory = '';
  availableCategories: string[] = [];
  
  readonly weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  readonly monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                         'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  readonly categoryColors = [
    { name: 'Trabalho', color: '#667eea' },
    { name: 'Pessoal', color: '#f56565' },
    { name: 'Reunião', color: '#48bb78' },
    { name: 'Evento', color: '#ed8936' },
    { name: 'Importante', color: '#e53e3e' },
    { name: 'Outros', color: '#718096' }
  ];

  ngOnInit(): void {
    this.generateCalendarData();
    this.updateCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate'] || changes['view'] || changes['weekStartsOn']) {
      this.generateCalendarData();
    }
  }

  private generateCalendarData(): void {
    switch (this.view) {
      case 'month':
        this.generateMonthView();
        break;
      case 'week':
        this.generateWeekView();
        break;
      case 'day':
        this.generateDayView();
        break;
      case 'agenda':
        this.generateAgendaView();
        break;
    }
    this.generateTimeSlots();
  }

  private generateMonthView(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() - this.weekStartsOn + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);
    
    this.monthDays = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      this.monthDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  private generateWeekView(): void {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    this.weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      this.weekDays.push(day);
    }
  }

  private generateDayView(): void {
    this.weekDays = [new Date(this.currentDate)];
  }

  private generateAgendaView(): void {
    // Agenda view uses events list directly
  }

  private generateTimeSlots(): void {
    const [minHour, minMinute] = this.minTime.split(':').map(Number);
    const [maxHour, maxMinute] = this.maxTime.split(':').map(Number);
    
    this.dayHours = [];
    let hour = minHour;
    let minute = minMinute;
    
    while (hour < maxHour || (hour === maxHour && minute <= maxMinute)) {
      this.dayHours.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      minute += this.slotDuration;
      if (minute >= 60) {
        hour++;
        minute = minute % 60;
      }
    }
  }

  private getStartOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = (day - this.weekStartsOn + 7) % 7;
    result.setDate(result.getDate() - diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event => this.isSameDay(event.start, date));
  }

  getEventsForTimeSlot(date: Date, time: string): CalendarEvent[] {
    const [hour, minute] = time.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hour, minute, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + this.slotDuration);

    return this.events.filter(event => {
      if (event.allDay) return false;
      return this.isSameDay(event.start, date) && 
             event.start < slotEnd && 
             event.end > slotStart;
    });
  }

  getAllDayEvents(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.allDay && this.isSameDay(event.start, date)
    );
  }

  getUpcomingEvents(): CalendarEvent[] {
    const now = new Date();
    return this.events
      .filter(event => event.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 10);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, this.today);
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  isSelected(date: Date): boolean {
    return this.selectedDate ? this.isSameDay(date, this.selectedDate) : false;
  }

  onDateClick(date: Date): void {
    this.selectedDate = date;
    this.dateClicked.emit(date);
  }

  onEventClick(event: CalendarEvent, $event: Event): void {
    $event.stopPropagation();
    // Open edit modal instead of just emitting
    this.openEditEventModal(event);
  }

  previousPeriod(): void {
    const date = new Date(this.currentDate);
    
    switch (this.view) {
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
    }
    
    this.currentDate = date;
    this.generateCalendarData();
    this.emitDateRange();
  }

  nextPeriod(): void {
    const date = new Date(this.currentDate);
    
    switch (this.view) {
      case 'month':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'week':
        date.setDate(date.getDate() + 7);
        break;
      case 'day':
        date.setDate(date.getDate() + 1);
        break;
    }
    
    this.currentDate = date;
    this.generateCalendarData();
    this.emitDateRange();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.generateCalendarData();
    this.emitDateRange();
  }

  changeView(view: CalendarView): void {
    this.view = view;
    this.viewChanged.emit(view);
    this.generateCalendarData();
  }

  private emitDateRange(): void {
    let start: Date;
    let end: Date;

    switch (this.view) {
      case 'month':
        start = this.monthDays[0];
        end = this.monthDays[this.monthDays.length - 1];
        break;
      case 'week':
        start = this.weekDays[0];
        end = this.weekDays[6];
        break;
      case 'day':
        start = new Date(this.currentDate);
        end = new Date(this.currentDate);
        break;
      default:
        start = new Date(this.currentDate);
        end = new Date(this.currentDate);
    }

    this.dateRangeChanged.emit({ start, end });
  }

  getViewTitle(): string {
    switch (this.view) {
      case 'month':
        return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      case 'week':
        const startOfWeek = this.getStartOfWeek(this.currentDate);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      case 'day':
        return `${this.currentDate.getDate()} ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      case 'agenda':
        return 'Agenda';
      default:
        return '';
    }
  }

  getEventColor(event: CalendarEvent): string {
    return event.color || '#667eea';
  }

  formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  formatDateRange(event: CalendarEvent): string {
    if (event.allDay) {
      return 'Dia inteiro';
    }
    return `${this.formatTime(event.start)} - ${this.formatTime(event.end)}`;
  }

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  getWeekDayNames(): string[] {
    const names = [...this.weekDayNames];
    if (this.weekStartsOn === 1) {
      names.push(names.shift()!);
    }
    return names;
  }
  
  // =====================================================
  // EVENT MODAL METHODS
  // =====================================================
  
  openCreateEventModal(date?: Date): void {
    if (!this.allowEventCreation) return;
    
    this.editingEvent = null;
    this.eventForm = {
      title: '',
      start: date ? this.formatDateInput(date) : this.formatDateInput(new Date()),
      startTime: '09:00',
      end: date ? this.formatDateInput(date) : this.formatDateInput(new Date()),
      endTime: '10:00',
      allDay: false,
      description: '',
      location: '',
      category: '',
      color: '#667eea',
      recurring: 'none'
    };
    this.showEventModal = true;
  }
  
  openEditEventModal(event: CalendarEvent): void {
    if (!this.allowEventEdit) return;
    
    this.editingEvent = event;
    this.eventForm = {
      title: event.title,
      start: this.formatDateInput(event.start),
      startTime: this.formatTimeInput(event.start),
      end: this.formatDateInput(event.end),
      endTime: this.formatTimeInput(event.end),
      allDay: event.allDay || false,
      description: event.description || '',
      location: event.location || '',
      category: event.category || '',
      color: event.color || '#667eea',
      recurring: event.recurring || 'none'
    };
    this.showEventModal = true;
  }
  
  closeEventModal(): void {
    this.showEventModal = false;
    this.editingEvent = null;
  }
  
  saveEvent(): void {
    if (!this.eventForm.title.trim()) {
      alert('Por favor, insira um título para o evento.');
      return;
    }
    
    const startDate = new Date(this.eventForm.start + 'T' + this.eventForm.startTime);
    const endDate = new Date(this.eventForm.end + 'T' + this.eventForm.endTime);
    
    if (endDate <= startDate) {
      alert('A data de término deve ser posterior à data de início.');
      return;
    }
    
    const event: CalendarEvent = {
      id: this.editingEvent ? this.editingEvent.id : Date.now(),
      title: this.eventForm.title,
      start: startDate,
      end: endDate,
      allDay: this.eventForm.allDay,
      description: this.eventForm.description,
      location: this.eventForm.location,
      category: this.eventForm.category,
      color: this.eventForm.color,
      recurring: this.eventForm.recurring
    };
    
    if (this.editingEvent) {
      this.eventUpdated.emit(event);
    } else {
      this.eventCreated.emit(event);
    }
    
    this.closeEventModal();
    this.updateCategories();
  }
  
  deleteEvent(event: CalendarEvent): void {
    if (confirm(`Deseja excluir o evento "${event.title}"?`)) {
      this.eventDeleted.emit(event);
      this.closeContextMenu();
      this.updateCategories();
    }
  }
  
  // =====================================================
  // CONTEXT MENU METHODS
  // =====================================================
  
  openContextMenu(event: CalendarEvent, mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
    
    this.contextMenuEvent = event;
    this.contextMenuX = mouseEvent.clientX;
    this.contextMenuY = mouseEvent.clientY;
    this.showContextMenu = true;
  }
  
  closeContextMenu(): void {
    this.showContextMenu = false;
    this.contextMenuEvent = null;
  }
  
  onContextMenuAction(action: 'view' | 'edit' | 'delete'): void {
    if (!this.contextMenuEvent) return;
    
    switch (action) {
      case 'view':
        this.eventClicked.emit(this.contextMenuEvent);
        break;
      case 'edit':
        this.openEditEventModal(this.contextMenuEvent);
        break;
      case 'delete':
        this.deleteEvent(this.contextMenuEvent);
        break;
    }
    
    this.closeContextMenu();
  }
  
  // =====================================================
  // SEARCH & FILTER METHODS
  // =====================================================
  
  get filteredEvents(): CalendarEvent[] {
    let filtered = this.events;
    
    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(event => event.category === this.selectedCategory);
    }
    
    return filtered;
  }
  
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
  }
  
  private updateCategories(): void {
    const categories = new Set(this.events.map(e => e.category).filter(Boolean));
    this.availableCategories = Array.from(categories) as string[];
  }
  
  // =====================================================
  // UTILITY METHODS
  // =====================================================
  
  private formatDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  private formatTimeInput(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  onDateDoubleClick(date: Date): void {
    this.openCreateEventModal(date);
  }
  
  onEventDoubleClick(event: CalendarEvent, mouseEvent: Event): void {
    mouseEvent.stopPropagation();
    this.openEditEventModal(event);
  }
  
  getCategoryColor(categoryName: string): string {
    const category = this.categoryColors.find(c => c.name === categoryName);
    return category ? category.color : '#718096';
  }
}
