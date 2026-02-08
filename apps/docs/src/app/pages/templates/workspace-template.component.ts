import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent, FileItem } from '@muxima-ui/file-manager';
import { DocumentViewerComponent, Document } from '@muxima-ui/document-viewer';
import { CalendarComponent, CalendarEvent } from '@muxima-ui/calendar';
import { BadgeBadgeComponent } from '@muxima-ui/badge';

type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'muxima-workspace-template',
  standalone: true,
  imports: [
    CommonModule,
    FileManagerComponent,
    DocumentViewerComponent,
    CalendarComponent,
    BadgeBadgeComponent
  ],
  templateUrl: './workspace-template.component.html',
  styleUrls: ['./workspace-template.component.scss']
})
export class WorkspaceTemplateComponent implements OnInit {
  // Sidebar state
  sidebarCollapsed = false;
  activeTab: 'files' | 'calendar' | 'tasks' = 'files';

  // File Manager
  files: FileItem[] = [];
  selectedFiles: FileItem[] = [];
  selectedDocument: FileItem | null = null;

  // Calendar
  currentDate: Date = new Date();
  events: CalendarEvent[] = [];

  // Documents for viewer
  documents: Document[] = [];

  // Computed properties for conditional rendering
  get showUnreadBadge(): boolean {
    return this.getUnreadCount() > 0;
  }

  get showTasksBadge(): boolean {
    return this.getIncompleteTasks() > 0;
  }

  get showFilesTab(): boolean {
    return this.activeTab === 'files';
  }

  get showCalendarTab(): boolean {
    return this.activeTab === 'calendar';
  }

  get showTasksTab(): boolean {
    return this.activeTab === 'tasks';
  }

  get showDocumentPreview(): boolean {
    return this.selectedDocument !== null;
  }

  get filteredNotifications(): any[] {
    return this.notifications;
  }

  get filteredRecentFiles(): any[] {
    return this.recentFiles;
  }

  get filteredEvents(): any[] {
    return this.events;
  }

  get filteredTasks(): any[] {
    return this.tasks;
  }

  // Tasks & Notifications
  tasks = [
    { id: 1, title: 'Review Q4 Reports', priority: 'high', completed: false, dueDate: new Date(2026, 1, 8) },
    { id: 2, title: 'Update Client Presentation', priority: 'medium', completed: false, dueDate: new Date(2026, 1, 9) },
    { id: 3, title: 'Team Meeting Prep', priority: 'high', completed: true, dueDate: new Date(2026, 1, 7) },
    { id: 4, title: 'Code Review - Feature X', priority: 'medium', completed: false, dueDate: new Date(2026, 1, 10) },
    { id: 5, title: 'Documentation Update', priority: 'low', completed: false, dueDate: new Date(2026, 1, 12) }
  ];

  notifications = [
    { id: 1, type: 'file', message: 'Maria Silva compartilhou "Q4_Report.pdf"', time: '5 min atrás', unread: true },
    { id: 2, type: 'calendar', message: 'Reunião em 30 minutos: "Team Sync"', time: '10 min atrás', unread: true },
    { id: 3, type: 'task', message: 'João Silva completou "Design Review"', time: '1 hora atrás', unread: false },
    { id: 4, type: 'file', message: 'Novo comentário em "Proposal_Draft.docx"', time: '2 horas atrás', unread: false }
  ];

  // User info
  user = {
    name: 'Aldemiro Valentim',
    email: 'aldemiro@muxima.com',
    avatar: 'AV',
    role: 'Senior Developer'
  };

  // Recent files for quick access
  recentFiles = [
    { name: 'Q4_Report.pdf', type: 'pdf', modified: '2 horas atrás', starred: true },
    { name: 'Project_Plan.docx', type: 'docx', modified: '1 dia atrás', starred: false },
    { name: 'Budget_2026.xlsx', type: 'xlsx', modified: '3 dias atrás', starred: true },
    { name: 'Design_Mockups.fig', type: 'fig', modified: '5 dias atrás', starred: false }
  ];

  ngOnInit(): void {
    this.initializeFiles();
    this.initializeCalendarEvents();
    this.initializeDocuments();
  }

  private initializeDocuments(): void {
    this.documents = [
      {
        id: '1',
        name: 'Sample Document',
        type: 'pdf',
        url: 'assets/sample-document.pdf'
      }
    ];
  }

  private initializeFiles(): void {
    this.files = [
      {
        id: '1',
        name: 'Projects',
        type: 'folder',
        modifiedDate: new Date(2026, 0, 15),
        owner: 'Aldemiro Valentim',
        starred: true
      },
      {
        id: '2',
        name: 'Documents',
        type: 'folder',
        modifiedDate: new Date(2026, 1, 1),
        owner: 'Aldemiro Valentim'
      },
      {
        id: '3',
        name: 'Q4_Report.pdf',
        type: 'file',
        size: 3548576,
        extension: 'pdf',
        modifiedDate: new Date(2026, 1, 5),
        owner: 'Maria Silva',
        starred: true,
        shared: true
      },
      {
        id: '4',
        name: 'Project_Plan.docx',
        type: 'file',
        size: 1248576,
        extension: 'docx',
        modifiedDate: new Date(2026, 1, 3),
        owner: 'João Silva',
        shared: true
      },
      {
        id: '5',
        name: 'Budget_2026.xlsx',
        type: 'file',
        size: 524288,
        extension: 'xlsx',
        modifiedDate: new Date(2026, 0, 28),
        owner: 'Aldemiro Valentim',
        starred: true
      },
      {
        id: '6',
        name: 'Team_Photo.jpg',
        type: 'file',
        size: 2097152,
        extension: 'jpg',
        modifiedDate: new Date(2026, 0, 20),
        owner: 'Pedro Santos'
      },
      {
        id: '7',
        name: 'Presentation.pptx',
        type: 'file',
        size: 5242880,
        extension: 'pptx',
        modifiedDate: new Date(2026, 1, 6),
        owner: 'Ana Costa',
        shared: true
      },
      {
        id: '8',
        name: 'Archives',
        type: 'folder',
        modifiedDate: new Date(2025, 11, 15),
        owner: 'Aldemiro Valentim'
      }
    ];
  }

  private initializeCalendarEvents(): void {
    this.events = [
      {
        id: 1,
        title: 'Team Sync',
        start: new Date(2026, 1, 7, 10, 0),
        end: new Date(2026, 1, 7, 11, 0),
        category: 'meeting'
      },
      {
        id: 2,
        title: 'Client Presentation',
        start: new Date(2026, 1, 9, 14, 0),
        end: new Date(2026, 1, 9, 15, 30),
        category: 'meeting'
      },
      {
        id: 3,
        title: 'Q4 Report Due',
        start: new Date(2026, 1, 8, 17, 0),
        end: new Date(2026, 1, 8, 17, 0),
        category: 'deadline',
        allDay: true
      },
      {
        id: 4,
        title: 'Code Review Session',
        start: new Date(2026, 1, 10, 15, 0),
        end: new Date(2026, 1, 10, 16, 0),
        category: 'meeting'
      }
    ];
  }

  // File Manager Events
  onFileSelected(files: FileItem[]): void {
    this.selectedFiles = files;
    if (files.length === 1 && files[0].type === 'file') {
      this.selectedDocument = files[0];
    } else {
      this.selectedDocument = null;
    }
  }

  onFileOpened(file: FileItem): void {
    console.log('[Workspace] File opened:', file);
    console.log('[Workspace] File has fileData?', !!(file as any).fileData);
    console.log('[Workspace] File extension:', file.extension);
    
    if (file.type === 'file') {
      this.selectedDocument = file;
      
      // Convert FileItem to Document for the viewer
      // In a real app, you would fetch the file URL from a server
      // For now, we'll create a temporary document representation
      const docType = this.getDocumentType(file.extension || '');
      
      console.log('[Workspace] Document type:', docType);
      
      // Only show if it's a supported type
      if (docType === 'pdf' || docType === 'image') {
        const document: Document = {
          id: String(file.id),
          name: file.name,
          type: docType,
          url: this.getFileUrl(file),
          size: file.size ? this.formatFileSize(file.size) : undefined,
          date: file.modifiedDate ? file.modifiedDate.toLocaleDateString('pt-BR') : undefined
        };
        
        this.documents = [document];
        
        console.log('[Workspace] Document prepared for viewer:', document);
      } else {
        console.log('[Workspace] File type not supported for preview:', file.extension);
        // You could show a message to the user here
        this.documents = [];
      }
    }
  }
  
  private getDocumentType(extension: string): 'pdf' | 'image' | 'other' {
    const ext = extension.toLowerCase();
    
    if (ext === 'pdf') {
      return 'pdf';
    }
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    if (imageExtensions.includes(ext)) {
      return 'image';
    }
    
    return 'other';
  }
  
  private getFileUrl(file: FileItem): string {
    console.log('[Workspace] getFileUrl called for:', file.name);
    console.log('[Workspace] file object:', file);
    console.log('[Workspace] fileData exists?', !!(file as any).fileData);
    
    // Check if the file has a URL stored (for files uploaded from URL)
    if ((file as any).url) {
      console.log('[Workspace] Using stored URL:', (file as any).url);
      return (file as any).url;
    }
    
    // Check if we have the actual File object stored (for uploaded files)
    if ((file as any).fileData) {
      const objectUrl = URL.createObjectURL((file as any).fileData);
      console.log('[Workspace] Created object URL:', objectUrl);
      return objectUrl;
    }
    
    console.warn('[Workspace] No fileData or URL found! Using fallback.');
    console.warn('[Workspace] This should not happen for uploaded files.');
    
    // Fallback: For demo purposes, return a sample URL
    // In production, this would be an API endpoint like: `/api/files/${file.id}/download`
    const ext = file.extension?.toLowerCase();
    if (ext === 'pdf') {
      return 'https://pdfobject.com/pdf/sample.pdf';
    } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
    }
    
    return `assets/files/${file.name}`;
  }

  onFolderOpened(folder: FileItem): void {
    console.log('Folder opened:', folder);
  }

  onFileUploaded(event: { files: File[]; folderId?: string | number }): void {
    console.log('[Workspace] onFileUploaded called:', event);
    console.log('[Workspace] Number of files:', event.files.length);
    
    // Convert uploaded files to FileItem objects
    const newFiles = event.files.map((file, index) => {
      console.log(`[Workspace] Processing file ${index + 1}:`, {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      
      const fileItem: any = {
        id: Date.now() + Math.random(), // Generate unique ID
        name: file.name,
        type: 'file' as const,
        size: file.size,
        extension: this.getFileExtension(file.name),
        modifiedDate: new Date(),
        createdDate: new Date(),
        owner: this.user.name,
        parentId: event.folderId,
        starred: false,
        shared: false,
        fileData: file // Store the actual File object for later use
      };
      
      console.log(`[Workspace] Created fileItem with fileData:`, !!fileItem.fileData);
      
      return fileItem as FileItem;
    });
    
    console.log('[Workspace] New files created:', newFiles);
    console.log('[Workspace] First file has fileData?', !!(newFiles[0] as any)?.fileData);
    
    // Create a new array to trigger change detection
    this.files = [...this.files, ...newFiles];
    
    console.log('[Workspace] Files uploaded:', event.files.length, 'Total files:', this.files.length);
    console.log('[Workspace] Last file in array has fileData?', !!((this.files[this.files.length - 1] as any)?.fileData));
  }

  onFolderCreated(event: { name: string; parentId?: string | number }): void {
    console.log('[Workspace] onFolderCreated called:', event);
    
    const newFolder: FileItem = {
      id: Date.now() + Math.random(), // Generate unique ID
      name: event.name,
      type: 'folder',
      modifiedDate: new Date(),
      createdDate: new Date(),
      owner: this.user.name,
      parentId: event.parentId,
      starred: false,
      shared: false
    };
    
    console.log('[Workspace] New folder created:', newFolder);
    
    // Create a new array to trigger change detection
    this.files = [...this.files, newFolder];
    
    console.log('[Workspace] Folder created:', event.name, 'Total files:', this.files.length);
  }
  
  onFileDeleted(file: FileItem): void {
    console.log('[Workspace] onFileDeleted called:', file);
    
    // Remove file from array
    this.files = this.files.filter(f => f.id !== file.id);
    
    // If the deleted file was selected, clear selection
    if (this.selectedDocument?.id === file.id) {
      this.selectedDocument = null;
      this.documents = [];
    }
    
    console.log('[Workspace] File deleted:', file.name, 'Remaining files:', this.files.length);
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  }

  // Calendar Events
  onDateSelected(date: Date): void {
    this.currentDate = date;
    console.log('[Workspace] Date selected:', date);
  }

  onEventClicked(event: CalendarEvent): void {
    console.log('[Workspace] Event clicked:', event);
    // Calendar handles editing internally via modal
  }
  
  onEventCreated(event: CalendarEvent): void {
    console.log('[Workspace] Event created:', event);
    
    // Just add the event to the array
    this.events = [...this.events, event];
  }
  
  onEventUpdated(event: CalendarEvent): void {
    console.log('[Workspace] Event updated:', event);
    
    // Find and update the event
    const index = this.events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      this.events = [
        ...this.events.slice(0, index),
        event,
        ...this.events.slice(index + 1)
      ];
      console.log('[Workspace] Event updated in array');
    }
  }
  
  onEventDeleted(event: CalendarEvent): void {
    console.log('[Workspace] Event deleted:', event);
    
    const confirm = window.confirm(`Deseja excluir o evento "${event.title}"?`);
    if (confirm) {
      this.events = this.events.filter(e => e.id !== event.id);
      console.log('[Workspace] Event removed from array');
    }
  }

  // UI Controls
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  setActiveTab(tab: 'files' | 'calendar' | 'tasks'): void {
    this.activeTab = tab;
  }

  toggleTaskComplete(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  markNotificationRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.unread = false;
    }
  }

  getFileIcon(extension: string): string {
    const iconMap: { [key: string]: string } = {
      pdf: '📄',
      docx: '📝',
      xlsx: '📊',
      pptx: '📊',
      jpg: '🖼️',
      png: '🖼️',
      fig: '🎨'
    };
    return iconMap[extension] || '📄';
  }

  getPriorityColor(priority: string): BadgeColor {
    const colorMap: { [key: string]: BadgeColor } = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colorMap[priority] || 'neutral';
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  getIncompleteTasks(): number {
    return this.tasks.filter(t => !t.completed).length;
  }

  getHighPriorityTasks(): number {
    return this.tasks.filter(t => t.priority === 'high' && !t.completed).length;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // TrackBy functions for performance
  trackEventById(index: number, event: any): any {
    return event.id;
  }

  trackTaskById(index: number, task: any): any {
    return task.id;
  }

  trackNotificationById(index: number, notification: any): any {
    return notification.id;
  }

  trackFileById(index: number, file: any): any {
    return file.name; // using name since recentFiles don't have id
  }
}
