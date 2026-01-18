import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TreeNode {
  id: string | number;
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

export type SelectionMode = 'single' | 'multiple' | 'checkbox';

@Component({
  selector: 'muxima-tree-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() selectionMode: SelectionMode = 'single';
  @Input() showCheckbox: boolean = false;
  @Input() showIcons: boolean = true;
  @Input() allowDragDrop: boolean = false;
  @Input() expandOnClick: boolean = true;
  @Input() nodeTemplate?: TemplateRef<any>;
  @Input() filter: string = '';

  @Output() nodeSelect = new EventEmitter<TreeNode>();
  @Output() nodeUnselect = new EventEmitter<TreeNode>();
  @Output() nodeExpand = new EventEmitter<TreeNode>();
  @Output() nodeCollapse = new EventEmitter<TreeNode>();
  @Output() nodeDrop = new EventEmitter<{ dragNode: TreeNode; dropNode: TreeNode; dropPosition: 'before' | 'after' | 'inside' }>();
  @Output() selectionChange = new EventEmitter<TreeNode[]>();

  selectedNodes: TreeNode[] = [];
  draggedNode: TreeNode | null = null;
  dropTargetNode: TreeNode | null = null;
  dropPosition: 'before' | 'after' | 'inside' | null = null;

  ngOnInit() {
    this.initializeTree();
  }

  ngOnChanges() {
    if (this.filter) {
      this.filterNodes();
    }
  }

  private initializeTree() {
    this.nodes = this.nodes.map(node => this.initializeNode(node, null, 0));
  }

  private initializeNode(node: TreeNode, parent: TreeNode | null, level: number): TreeNode {
    node.parent = parent || undefined;
    node.level = level;
    node.expanded = node.expanded ?? false;
    node.selected = node.selected ?? false;
    
    if (node.children) {
      node.children = node.children.map(child => this.initializeNode(child, node, level + 1));
    }
    
    return node;
  }

  toggleNode(node: TreeNode, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    node.expanded = !node.expanded;
    
    if (node.expanded) {
      this.nodeExpand.emit(node);
    } else {
      this.nodeCollapse.emit(node);
    }
  }

  selectNode(node: TreeNode, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    if (node.disabled) return;

    if (this.selectionMode === 'single') {
      // Deselect all other nodes
      this.deselectAllNodes(this.nodes);
      node.selected = true;
      this.selectedNodes = [node];
      this.nodeSelect.emit(node);
    } else if (this.selectionMode === 'multiple') {
      if (event?.ctrlKey || event?.metaKey) {
        node.selected = !node.selected;
        if (node.selected) {
          this.selectedNodes.push(node);
          this.nodeSelect.emit(node);
        } else {
          this.selectedNodes = this.selectedNodes.filter(n => n.id !== node.id);
          this.nodeUnselect.emit(node);
        }
      } else {
        this.deselectAllNodes(this.nodes);
        node.selected = true;
        this.selectedNodes = [node];
        this.nodeSelect.emit(node);
      }
    }

    if (this.expandOnClick && node.children && node.children.length > 0) {
      this.toggleNode(node);
    }
  }

  toggleCheckbox(node: TreeNode, event: Event) {
    event.stopPropagation();
    node.selected = !node.selected;
    
    // Cascade selection to children
    if (node.children) {
      this.cascadeSelection(node.children, node.selected);
    }
    
    // Update parent checkbox state
    if (node.parent) {
      this.updateParentSelection(node.parent);
    }

    this.updateSelectedNodes();
    
    if (node.selected) {
      this.nodeSelect.emit(node);
    } else {
      this.nodeUnselect.emit(node);
    }
  }

  private cascadeSelection(nodes: TreeNode[], selected: boolean) {
    nodes.forEach(node => {
      if (!node.disabled) {
        node.selected = selected;
        if (node.children) {
          this.cascadeSelection(node.children, selected);
        }
      }
    });
  }

  private updateParentSelection(node: TreeNode) {
    if (!node.children) return;

    const allSelected = node.children.every(child => child.selected);
    const someSelected = node.children.some(child => child.selected);

    if (allSelected) {
      node.selected = true;
    } else if (someSelected) {
      node.selected = undefined as any; // Indeterminate state
    } else {
      node.selected = false;
    }

    if (node.parent) {
      this.updateParentSelection(node.parent);
    }
  }

  private updateSelectedNodes() {
    this.selectedNodes = [];
    this.collectSelectedNodes(this.nodes);
    this.selectionChange.emit(this.selectedNodes);
  }

  private collectSelectedNodes(nodes: TreeNode[]) {
    nodes.forEach(node => {
      if (node.selected) {
        this.selectedNodes.push(node);
      }
      if (node.children) {
        this.collectSelectedNodes(node.children);
      }
    });
  }

  private deselectAllNodes(nodes: TreeNode[]) {
    nodes.forEach(node => {
      node.selected = false;
      if (node.children) {
        this.deselectAllNodes(node.children);
      }
    });
  }

  // Drag & Drop
  onDragStart(node: TreeNode, event: DragEvent) {
    if (!this.allowDragDrop || node.disabled) return;
    this.draggedNode = node;
    event.dataTransfer!.effectAllowed = 'move';
  }

  onDragOver(node: TreeNode, event: DragEvent) {
    if (!this.allowDragDrop || !this.draggedNode) return;
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const y = event.clientY - rect.top;
    const height = rect.height;

    if (y < height * 0.25) {
      this.dropPosition = 'before';
    } else if (y > height * 0.75) {
      this.dropPosition = 'after';
    } else {
      this.dropPosition = 'inside';
    }

    this.dropTargetNode = node;
  }

  onDragLeave(event: DragEvent) {
    this.dropTargetNode = null;
    this.dropPosition = null;
  }

  onDrop(node: TreeNode, event: DragEvent) {
    if (!this.allowDragDrop || !this.draggedNode || !this.dropPosition) return;
    event.preventDefault();

    if (this.draggedNode.id !== node.id) {
      this.nodeDrop.emit({
        dragNode: this.draggedNode,
        dropNode: node,
        dropPosition: this.dropPosition
      });
    }

    this.draggedNode = null;
    this.dropTargetNode = null;
    this.dropPosition = null;
  }

  // Filter
  private filterNodes() {
    if (!this.filter) {
      this.initializeTree();
      return;
    }

    const filterLower = this.filter.toLowerCase();
    this.nodes = this.nodes.map(node => this.filterNode(node, filterLower)).filter(Boolean) as TreeNode[];
  }

  private filterNode(node: TreeNode, filter: string): TreeNode | null {
    const matches = node.label.toLowerCase().includes(filter);
    
    let filteredChildren: TreeNode[] = [];
    if (node.children) {
      filteredChildren = node.children
        .map(child => this.filterNode(child, filter))
        .filter(Boolean) as TreeNode[];
    }

    if (matches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
        expanded: filteredChildren.length > 0 ? true : node.expanded
      };
    }

    return null;
  }

  getNodePaddingLeft(node: TreeNode): string {
    return `${(node.level || 0) * 24}px`;
  }

  hasChildren(node: TreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  getDropIndicatorClass(node: TreeNode): string {
    if (this.dropTargetNode?.id === node.id) {
      return `drop-${this.dropPosition}`;
    }
    return '';
  }
}
