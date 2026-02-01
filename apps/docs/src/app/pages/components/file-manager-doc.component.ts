import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent, FileItem } from '@muxima-ui/file-manager';

@Component({
  selector: 'app-file-manager-doc',
  standalone: true,
  imports: [CommonModule, FileManagerComponent],
  templateUrl: './file-manager-doc.component.html',
  styleUrls: ['./file-manager-doc.component.scss']
})
export class FileManagerDocComponent {
  files: FileItem[] = [
    {
      id: '1',
      name: 'Documentos',
      type: 'folder',
      modifiedDate: new Date(2026, 0, 15),
      createdDate: new Date(2026, 0, 1),
      owner: 'João Silva',
      permissions: 'read-write'
    },
    {
      id: '2',
      name: 'Relatorio.pdf',
      type: 'file',
      size: 2548576,
      extension: 'pdf',
      modifiedDate: new Date(2026, 0, 18),
      createdDate: new Date(2026, 0, 18),
      owner: 'Maria Santos',
      permissions: 'read',
      starred: true
    },
    {
      id: '3',
      name: 'Apresentacao.pptx',
      type: 'file',
      size: 5242880,
      extension: 'pptx',
      modifiedDate: new Date(2026, 0, 19),
      createdDate: new Date(2026, 0, 19),
      owner: 'João Silva',
      permissions: 'read-write',
      shared: true
    }
  ];

  typescriptCode = `import { FileManagerComponent, FileItem } from '@muxima-ui/file-manager';

files: FileItem[] = [
  {
    id: '1',
    name: 'Documentos',
    type: 'folder',
    modifiedDate: new Date(),
    owner: 'João Silva'
  }
];`;

  htmlCode = `<muxima-file-manager
  [files]="files"
  [viewMode]="'grid'"
  [allowUpload]="true"
  [allowMultiSelect]="true"
  (fileSelected)="onFileSelect($event)"
  (fileOpened)="onFileOpen($event)">
</muxima-file-manager>`;

  onFileSelect(files: FileItem[]) {
    console.log('Files selected:', files);
  }
}
