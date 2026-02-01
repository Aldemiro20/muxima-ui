# Tree View Component

A powerful and flexible tree view component for displaying hierarchical data with support for drag & drop, multi-selection, and filtering.

## Features

- 🌳 Recursive tree structure with unlimited depth
- 🎯 Multiple selection modes (single, multiple, checkbox)
- 🔄 Drag & drop support with position indicators
- 🔍 Built-in search/filter functionality
- ✅ Cascade selection for parent-child relationships
- 🎨 Customizable icons and styling
- ♿ Accessible with keyboard navigation
- 📱 Responsive design

## Installation

```bash
npm install @muxima-ui/tree-view
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { TreeViewComponent, TreeNode } from '@muxima-ui/tree-view';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [TreeViewComponent],
  template: `
    <muxima-tree-view
      [nodes]="treeData"
      (nodeSelect)="onNodeSelect($event)">
    </muxima-tree-view>
  `
})
export class DemoComponent {
  treeData: TreeNode[] = [
    {
      id: 1,
      label: 'Documents',
      icon: '📁',
      children: [
        { id: 11, label: 'Work', icon: '📂' },
        { id: 12, label: 'Personal', icon: '📂' }
      ]
    },
    {
      id: 2,
      label: 'Images',
      icon: '📁',
      children: [
        { id: 21, label: 'photo1.jpg', icon: '🖼️' },
        { id: 22, label: 'photo2.jpg', icon: '🖼️' }
      ]
    }
  ];

  onNodeSelect(node: TreeNode) {
    console.log('Selected:', node);
  }
}
```

### With Checkboxes

```html
<muxima-tree-view
  [nodes]="treeData"
  [showCheckbox]="true"
  [selectionMode]="'checkbox'"
  (selectionChange)="onSelectionChange($event)">
</muxima-tree-view>
```

### With Drag & Drop

```html
<muxima-tree-view
  [nodes]="treeData"
  [draggable]="true"
  (nodeDrop)="onNodeDrop($event)">
</muxima-tree-view>
```

### With Filter

```typescript
filterNodes(searchTerm: string) {
  this.treeData = this.originalData.filter(node => 
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `TreeNode[]` | `[]` | Array of tree nodes |
| `selectionMode` | `'single' \| 'multiple' \| 'checkbox'` | `'single'` | Selection mode |
| `showCheckbox` | `boolean` | `false` | Show checkboxes for selection |
| `draggable` | `boolean` | `false` | Enable drag & drop |
| `expandOnClick` | `boolean` | `true` | Expand node on click |
| `showIcons` | `boolean` | `true` | Show node icons |
| `filter` | `string` | `''` | Filter term for nodes |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `nodeSelect` | `TreeNode` | Emitted when node is selected |
| `nodeUnselect` | `TreeNode` | Emitted when node is unselected |
| `nodeExpand` | `TreeNode` | Emitted when node is expanded |
| `nodeCollapse` | `TreeNode` | Emitted when node is collapsed |
| `nodeDrop` | `{node: TreeNode, target: TreeNode, position: 'before' \| 'after' \| 'inside'}` | Emitted when node is dropped |
| `selectionChange` | `TreeNode[]` | Emitted when selection changes |

### TreeNode Interface

```typescript
interface TreeNode {
  id: number | string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data?: any;
  parent?: TreeNode;
  level?: number;
}
```

## Examples

### File System Explorer

```typescript
treeData: TreeNode[] = [
  {
    id: 'root',
    label: 'Project',
    icon: '📁',
    expanded: true,
    children: [
      {
        id: 'src',
        label: 'src',
        icon: '📂',
        children: [
          { id: 'app', label: 'app.component.ts', icon: '📄' },
          { id: 'main', label: 'main.ts', icon: '📄' }
        ]
      },
      { id: 'package', label: 'package.json', icon: '📄' }
    ]
  }
];
```

### Organization Chart

```typescript
treeData: TreeNode[] = [
  {
    id: 1,
    label: 'CEO',
    icon: '👔',
    data: { name: 'John Doe', department: 'Executive' },
    children: [
      {
        id: 11,
        label: 'CTO',
        icon: '💻',
        children: [
          { id: 111, label: 'Dev Team Lead', icon: '👨‍💻' },
          { id: 112, label: 'QA Team Lead', icon: '🧪' }
        ]
      },
      {
        id: 12,
        label: 'CFO',
        icon: '💰',
        children: [
          { id: 121, label: 'Accounting', icon: '📊' }
        ]
      }
    ]
  }
];
```

## Styling

The component uses CSS custom properties for theming:

```css
muxima-tree-view {
  --tree-node-hover-bg: #f1f5f9;
  --tree-node-selected-bg: rgba(102, 126, 234, 0.1);
  --tree-node-padding: 8px 12px;
  --tree-indent-size: 24px;
  --tree-border-color: #e2e8f0;
  --tree-icon-color: #64748b;
  --tree-text-color: #1e293b;
}
```

**Note:** Child nodes are automatically indented with a left border to clearly show the hierarchy. Each level adds 1.5rem of left padding plus a vertical line indicator.

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Space)
- ARIA attributes for screen readers
- Focus indicators
- Semantic HTML structure

## License

MIT
