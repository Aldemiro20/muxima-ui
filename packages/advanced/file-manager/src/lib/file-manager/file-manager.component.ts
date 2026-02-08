import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FileItem {
  id: string | number;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modifiedDate?: Date;
  createdDate?: Date;
  owner?: string;
  permissions?: string;
  extension?: string;
  icon?: string;
  parentId?: string | number;
  shared?: boolean;
  starred?: boolean;
  path?: string;
}

export type FileViewMode = 'grid' | 'list' | 'tree';
export type SortBy = 'name' | 'size' | 'date' | 'type';
export type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'muxima-file-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit, OnChanges {
  @Input() files: FileItem[] = [];
  @Input() viewMode: FileViewMode = 'grid';
  @Input() allowUpload: boolean = true;
  @Input() allowMultiSelect: boolean = true;
  @Input() showBreadcrumb: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() showToolbar: boolean = true;
  @Input() theme: 'light' | 'dark' = 'dark';
  
  @Output() fileSelected = new EventEmitter<FileItem[]>();
  @Output() fileOpened = new EventEmitter<FileItem>();
  @Output() folderOpened = new EventEmitter<FileItem>();
  @Output() fileDeleted = new EventEmitter<FileItem>();
  @Output() fileRenamed = new EventEmitter<{ file: FileItem; newName: string }>();
  @Output() fileUploaded = new EventEmitter<{ files: File[]; folderId?: string | number }>();
  @Output() folderCreated = new EventEmitter<{ name: string; parentId?: string | number }>();
  @Output() themeChanged = new EventEmitter<'light' | 'dark'>();

  currentFolderId?: string | number;
  selectedFiles: Set<string | number> = new Set();
  searchQuery = '';
  sortBy: SortBy = 'name';
  sortOrder: SortOrder = 'asc';
  
  breadcrumbs: FileItem[] = [];
  filteredFiles: FileItem[] = [];
  
  // Modal state for folder creation
  showCreateFolderModal = false;
  newFolderName = '';

  ngOnInit(): void {
    this.updateFilteredFiles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['files']) {
      this.updateFilteredFiles();
    }
  }

  private updateFilteredFiles(): void {
    let files = this.getCurrentFolderFiles();

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      files = files.filter(f => f.name.toLowerCase().includes(query));
    }

    // Apply sorting
    files = this.sortFiles(files);

    this.filteredFiles = files;
  }

  private getCurrentFolderFiles(): FileItem[] {
    return this.files.filter(f => f.parentId === this.currentFolderId);
  }

  private sortFiles(files: FileItem[]): FileItem[] {
    return [...files].sort((a, b) => {
      // Folders first
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;

      let comparison = 0;

      switch (this.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
        case 'date':
          const dateA = a.modifiedDate?.getTime() || 0;
          const dateB = b.modifiedDate?.getTime() || 0;
          comparison = dateA - dateB;
          break;
        case 'type':
          const extA = a.extension || '';
          const extB = b.extension || '';
          comparison = extA.localeCompare(extB);
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  onFileClick(file: FileItem, event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey) {
      this.toggleSelection(file);
    } else {
      this.selectedFiles.clear();
      this.selectedFiles.add(file.id);
    }
    this.emitSelection();
  }

  onFileDoubleClick(file: FileItem): void {
    if (file.type === 'folder') {
      this.openFolder(file);
    } else {
      this.fileOpened.emit(file);
    }
  }

  openFolder(folder: FileItem): void {
    this.currentFolderId = folder.id;
    this.updateBreadcrumbs(folder);
    this.selectedFiles.clear();
    this.updateFilteredFiles();
    this.folderOpened.emit(folder);
  }

  navigateToFolder(folderId?: string | number): void {
    this.currentFolderId = folderId;
    this.updateBreadcrumbs();
    this.selectedFiles.clear();
    this.updateFilteredFiles();
  }

  private updateBreadcrumbs(folder?: FileItem): void {
    this.breadcrumbs = [];
    let currentId = folder?.id || this.currentFolderId;

    while (currentId) {
      const item = this.files.find(f => f.id === currentId);
      if (!item) break;
      this.breadcrumbs.unshift(item);
      currentId = item.parentId;
    }
  }

  goBack(): void {
    if (this.breadcrumbs.length > 0) {
      const parent = this.breadcrumbs[this.breadcrumbs.length - 2];
      this.navigateToFolder(parent?.id);
    } else {
      this.navigateToFolder();
    }
  }

  toggleSelection(file: FileItem): void {
    if (this.selectedFiles.has(file.id)) {
      this.selectedFiles.delete(file.id);
    } else {
      this.selectedFiles.add(file.id);
    }
    this.emitSelection();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.themeChanged.emit(this.theme);
  }

  selectAll(): void {
    this.filteredFiles.forEach(f => this.selectedFiles.add(f.id));
    this.emitSelection();
  }

  clearSelection(): void {
    this.selectedFiles.clear();
    this.emitSelection();
  }

  private emitSelection(): void {
    const selected = this.files.filter(f => this.selectedFiles.has(f.id));
    this.fileSelected.emit(selected);
  }

  isSelected(file: FileItem): boolean {
    return this.selectedFiles.has(file.id);
  }

  changeViewMode(mode: FileViewMode): void {
    this.viewMode = mode;
  }

  changeSort(field: SortBy): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.updateFilteredFiles();
  }

  onSearch(): void {
    this.updateFilteredFiles();
  }

  deleteSelected(): void {
    const selected = this.files.filter(f => this.selectedFiles.has(f.id));
    selected.forEach(f => this.fileDeleted.emit(f));
    this.selectedFiles.clear();
  }

  getFileIconSvg(file: FileItem): string {
    const iconType = this.getFileIcon(file);
    const svgs: { [key: string]: string } = {
      'folder': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path></svg>',
      'pdf': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6M9 13h6M9 17h3"></path></svg>',
      'document': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path></svg>',
      'spreadsheet': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="9" x2="15" y2="21"></line></svg>',
      'presentation': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      'image': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',
      'video': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
      'audio': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
      'archive': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"></path></svg>',
      'text': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path></svg>',
      'code': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path></svg>',
      'file': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path><path d="M13 2v7h7"></path></svg>'
    };
    return svgs[iconType] || svgs['file'];
  }

  getFileIconSvgSmall(file: FileItem): string {
    const iconType = this.getFileIcon(file);
    const svgs: { [key: string]: string } = {
      'folder': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path></svg>',
      'pdf': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path></svg>',
      'document': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6M16 13H8"></path></svg>',
      'spreadsheet': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="3" x2="9" y2="21"></line></svg>',
      'presentation': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      'image': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',
      'video': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>',
      'audio': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle></svg>',
      'archive': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8v13H3V8M1 3h22v5H1z"></path></svg>',
      'text': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path></svg>',
      'code': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path></svg>',
      'file': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path><path d="M13 2v7h7"></path></svg>'
    };
    return svgs[iconType] || svgs['file'];
  }

  getFileIcon(file: FileItem): string {
    if (file.icon) return file.icon;
    
    if (file.type === 'folder') {
      return 'folder';
    }

    const ext = file.extension?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'pdf';
      case 'doc':
      case 'docx': return 'document';
      case 'xls':
      case 'xlsx': return 'spreadsheet';
      case 'ppt':
      case 'pptx': return 'presentation';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg': return 'image';
      case 'mp4':
      case 'avi':
      case 'mov': return 'video';
      case 'mp3':
      case 'wav': return 'audio';
      case 'zip':
      case 'rar':
      case '7z': return 'archive';
      case 'txt': return 'text';
      case 'html':
      case 'css':
      case 'js':
      case 'ts':
      case 'json': return 'code';
      default: return 'file';
    }
  }

  formatSize(bytes?: number): string {
    if (!bytes) return '-';
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  formatDate(date?: Date): string {
    if (!date) return '-';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    
    return date.toLocaleDateString('pt-BR');
  }

  toggleStar(file: FileItem, event: Event): void {
    event.stopPropagation();
    file.starred = !file.starred;
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      console.log('[FileManager] Uploading files:', files.length, 'to folder:', this.currentFolderId);
      this.fileUploaded.emit({ files, folderId: this.currentFolderId });
      input.value = '';
    }
  }

  createFolder(): void {
    this.newFolderName = '';
    this.showCreateFolderModal = true;
  }
  
  confirmCreateFolder(): void {
    if (this.newFolderName.trim()) {
      console.log('[FileManager] Creating folder:', this.newFolderName.trim(), 'in folder:', this.currentFolderId);
      this.folderCreated.emit({ 
        name: this.newFolderName.trim(), 
        parentId: this.currentFolderId 
      });
      this.cancelCreateFolder();
    }
  }
  
  cancelCreateFolder(): void {
    this.showCreateFolderModal = false;
    this.newFolderName = '';
  }

  getSelectedCount(): number {
    return this.selectedFiles.size;
  }

  hasSelection(): boolean {
    return this.selectedFiles.size > 0;
  }
}
