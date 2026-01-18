import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class FileManagerComponent implements OnInit {
  @Input() files: FileItem[] = [];
  @Input() viewMode: FileViewMode = 'grid';
  @Input() allowUpload: boolean = true;
  @Input() allowMultiSelect: boolean = true;
  @Input() showBreadcrumb: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() showToolbar: boolean = true;
  
  @Output() fileSelected = new EventEmitter<FileItem[]>();
  @Output() fileOpened = new EventEmitter<FileItem>();
  @Output() folderOpened = new EventEmitter<FileItem>();
  @Output() fileDeleted = new EventEmitter<FileItem>();
  @Output() fileRenamed = new EventEmitter<{ file: FileItem; newName: string }>();
  @Output() fileUploaded = new EventEmitter<File[]>();
  @Output() folderCreated = new EventEmitter<string>();

  currentFolderId?: string | number;
  selectedFiles: Set<string | number> = new Set();
  searchQuery = '';
  sortBy: SortBy = 'name';
  sortOrder: SortOrder = 'asc';
  
  breadcrumbs: FileItem[] = [];
  filteredFiles: FileItem[] = [];

  ngOnInit(): void {
    this.updateFilteredFiles();
  }

  ngOnChanges(): void {
    this.updateFilteredFiles();
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

  getFileIcon(file: FileItem): string {
    if (file.icon) return file.icon;
    
    if (file.type === 'folder') {
      return '📁';
    }

    const ext = file.extension?.toLowerCase();
    switch (ext) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📽️';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg': return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov': return '🎥';
      case 'mp3':
      case 'wav': return '🎵';
      case 'zip':
      case 'rar':
      case '7z': return '📦';
      case 'txt': return '📃';
      case 'html':
      case 'css':
      case 'js':
      case 'ts':
      case 'json': return '💻';
      default: return '📄';
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
      this.fileUploaded.emit(files);
      input.value = '';
    }
  }

  createFolder(): void {
    const name = prompt('Nome da pasta:');
    if (name) {
      this.folderCreated.emit(name);
    }
  }

  getSelectedCount(): number {
    return this.selectedFiles.size;
  }

  hasSelection(): boolean {
    return this.selectedFiles.size > 0;
  }
}
