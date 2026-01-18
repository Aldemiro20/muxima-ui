import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent, TreeNode } from '@muxima-ui/tree-view';

@Component({
  selector: 'muxima-tree-view-doc',
  standalone: true,
  imports: [CommonModule, TreeViewComponent],
  templateUrl: './tree-view-doc.component.html',
  styleUrls: ['./tree-view-doc.component.scss']
})
export class TreeViewDocComponent {
  // Code examples as strings
  codeExample1 = `<muxima-tree-view
  [nodes]="fileSystemData"
  [expandOnClick]="true"
  (nodeSelect)="onNodeSelect($event)">
</muxima-tree-view>`;

  codeExample2 = `<muxima-tree-view
  [nodes]="checkboxData"
  [showCheckbox]="true"
  [selectionMode]="'checkbox'"
  (selectionChange)="onSelectionChange($event)">
</muxima-tree-view>`;

  codeExample3 = `<muxima-tree-view
  [nodes]="fileSystemData"
  [draggable]="true"
  (nodeDrop)="onNodeDrop($event)">
</muxima-tree-view>`;

  // File system example
  fileSystemData: TreeNode[] = [
    {
      id: 1,
      label: 'Documents',
      icon: '📁',
      expanded: true,
      children: [
        {
          id: 11,
          label: 'Work',
          icon: '📂',
          children: [
            { id: 111, label: 'Project.docx', icon: '📄' },
            { id: 112, label: 'Report.pdf', icon: '📄' }
          ]
        },
        {
          id: 12,
          label: 'Personal',
          icon: '📂',
          children: [
            { id: 121, label: 'Resume.pdf', icon: '📄' },
            { id: 122, label: 'Photo.jpg', icon: '🖼️' }
          ]
        }
      ]
    },
    {
      id: 2,
      label: 'Downloads',
      icon: '📁',
      children: [
        { id: 21, label: 'Setup.exe', icon: '⚙️' },
        { id: 22, label: 'Archive.zip', icon: '📦' }
      ]
    },
    {
      id: 3,
      label: 'Pictures',
      icon: '📁',
      children: [
        { id: 31, label: 'Vacation', icon: '📂' },
        { id: 32, label: 'Family', icon: '📂' }
      ]
    }
  ];

  // Organization chart example
  organizationData: TreeNode[] = [
    {
      id: 1,
      label: 'CEO - John Smith',
      icon: '👔',
      expanded: true,
      data: { department: 'Executive', email: 'ceo@company.com' },
      children: [
        {
          id: 11,
          label: 'CTO - Sarah Johnson',
          icon: '💻',
          data: { department: 'Technology', email: 'cto@company.com' },
          children: [
            {
              id: 111,
              label: 'Dev Team Lead',
              icon: '👨‍💻',
              data: { department: 'Engineering' }
            },
            {
              id: 112,
              label: 'QA Team Lead',
              icon: '🧪',
              data: { department: 'Quality Assurance' }
            }
          ]
        },
        {
          id: 12,
          label: 'CFO - Michael Brown',
          icon: '💰',
          data: { department: 'Finance', email: 'cfo@company.com' },
          children: [
            {
              id: 121,
              label: 'Accounting Manager',
              icon: '📊',
              data: { department: 'Accounting' }
            }
          ]
        },
        {
          id: 13,
          label: 'CMO - Emily Davis',
          icon: '📢',
          data: { department: 'Marketing', email: 'cmo@company.com' }
        }
      ]
    }
  ];

  // With checkboxes
  checkboxData: TreeNode[] = [
    {
      id: 1,
      label: 'Features',
      icon: '⭐',
      children: [
        { id: 11, label: 'User Management', icon: '👥' },
        { id: 12, label: 'Reports', icon: '📊' },
        { id: 13, label: 'Analytics', icon: '📈' }
      ]
    },
    {
      id: 2,
      label: 'Permissions',
      icon: '🔐',
      children: [
        { id: 21, label: 'Read', icon: '👁️' },
        { id: 22, label: 'Write', icon: '✍️' },
        { id: 23, label: 'Delete', icon: '🗑️' }
      ]
    }
  ];

  // Project structure example
  projectData: TreeNode[] = [
    {
      id: 'root',
      label: 'my-angular-app',
      icon: '📦',
      expanded: true,
      children: [
        {
          id: 'src',
          label: 'src',
          icon: '📂',
          expanded: true,
          children: [
            {
              id: 'app',
              label: 'app',
              icon: '📂',
              children: [
                { id: 'component', label: 'app.component.ts', icon: '📄' },
                { id: 'module', label: 'app.module.ts', icon: '📄' },
                { id: 'routing', label: 'app-routing.module.ts', icon: '📄' }
              ]
            },
            {
              id: 'assets',
              label: 'assets',
              icon: '📂',
              children: [
                { id: 'images', label: 'images', icon: '📂' },
                { id: 'styles', label: 'styles.css', icon: '🎨' }
              ]
            },
            { id: 'main', label: 'main.ts', icon: '⚙️' },
            { id: 'index', label: 'index.html', icon: '🌐' }
          ]
        },
        { id: 'package', label: 'package.json', icon: '📋' },
        { id: 'tsconfig', label: 'tsconfig.json', icon: '⚙️' },
        { id: 'angular', label: 'angular.json', icon: '⚙️' }
      ]
    }
  ];

  selectedNode: TreeNode | null = null;
  selectedNodes: TreeNode[] = [];

  onNodeSelect(node: TreeNode) {
    this.selectedNode = node;
    console.log('Node selected:', node);
  }

  onNodeUnselect(node: TreeNode) {
    console.log('Node unselected:', node);
  }

  onNodeExpand(node: TreeNode) {
    console.log('Node expanded:', node.label);
  }

  onNodeCollapse(node: TreeNode) {
    console.log('Node collapsed:', node.label);
  }

  onNodeDrop(event: any) {
    console.log('Node dropped:', event);
  }

  onSelectionChange(nodes: TreeNode[]) {
    this.selectedNodes = nodes;
    console.log('Selection changed:', nodes);
  }
}
