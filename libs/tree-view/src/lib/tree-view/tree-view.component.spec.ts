import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeViewComponent, TreeNode } from './tree-view.component';

describe('TreeViewComponent', () => {
  let component: TreeViewComponent;
  let fixture: ComponentFixture<TreeViewComponent>;

  const mockNodes: TreeNode[] = [
    {
      id: 1,
      label: 'Root 1',
      icon: '📁',
      children: [
        { id: 11, label: 'Child 1.1', icon: '📄' },
        { id: 12, label: 'Child 1.2', icon: '📄' }
      ]
    },
    {
      id: 2,
      label: 'Root 2',
      icon: '📁',
      children: [
        { id: 21, label: 'Child 2.1', icon: '📄' }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TreeViewComponent);
    component = fixture.componentInstance;
    component.nodes = mockNodes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize nodes with levels', () => {
    component.ngOnInit();
    expect(component.nodes[0].level).toBe(0);
    expect(component.nodes[0].children![0].level).toBe(1);
  });

  it('should toggle node expansion', () => {
    const node = component.nodes[0];
    expect(node.expanded).toBeFalsy();
    
    component.toggleNode(node);
    expect(node.expanded).toBeTruthy();
    
    component.toggleNode(node);
    expect(node.expanded).toBeFalsy();
  });

  it('should select node in single mode', () => {
    spyOn(component.nodeSelect, 'emit');
    const node = component.nodes[0];
    
    component.selectNode(node);
    
    expect(node.selected).toBeTruthy();
    expect(component.selectedNodes.length).toBe(1);
    expect(component.nodeSelect.emit).toHaveBeenCalledWith(node);
  });

  it('should handle checkbox selection', () => {
    component.showCheckbox = true;
    const node = component.nodes[0];
    const event = new Event('change');
    
    component.toggleCheckbox(node, event);
    
    expect(node.selected).toBeTruthy();
  });

  it('should cascade selection to children', () => {
    const node = component.nodes[0];
    const event = new Event('change');
    
    component.toggleCheckbox(node, event);
    
    expect(node.children![0].selected).toBeTruthy();
    expect(node.children![1].selected).toBeTruthy();
  });

  it('should check if node has children', () => {
    expect(component.hasChildren(component.nodes[0])).toBeTruthy();
    expect(component.hasChildren(component.nodes[0].children![0])).toBeFalsy();
  });

  it('should calculate node padding based on level', () => {
    component.ngOnInit();
    const padding = component.getNodePaddingLeft(component.nodes[0].children![0]);
    expect(padding).toBe('24px');
  });
});
