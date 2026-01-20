import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartComponent, GanttTask, GanttMilestone } from '@muxima-ui/gantt-chart';

@Component({
  selector: 'app-gantt-chart-doc',
  standalone: true,
  imports: [CommonModule, GanttChartComponent],
  templateUrl: './gantt-chart-doc.component.html',
  styleUrls: ['./gantt-chart-doc.component.scss']
})
export class GanttChartDocComponent {
  // Exemplo básico
  basicTasks: GanttTask[] = [
    {
      id: 1,
      name: 'Planejamento',
      startDate: new Date(2026, 0, 20),
      endDate: new Date(2026, 0, 27),
      progress: 100,
      color: '#667eea',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Design',
      startDate: new Date(2026, 0, 25),
      endDate: new Date(2026, 1, 5),
      progress: 75,
      color: '#f6ad55',
      priority: 'medium',
      dependencies: [1]
    },
    {
      id: 3,
      name: 'Desenvolvimento',
      startDate: new Date(2026, 1, 3),
      endDate: new Date(2026, 1, 20),
      progress: 40,
      color: '#48bb78',
      priority: 'high',
      dependencies: [2]
    },
    {
      id: 4,
      name: 'Testes',
      startDate: new Date(2026, 1, 18),
      endDate: new Date(2026, 1, 28),
      progress: 0,
      color: '#4299e1',
      priority: 'medium',
      dependencies: [3]
    }
  ];

  basicMilestones: GanttMilestone[] = [
    {
      id: 1,
      name: 'Kickoff',
      date: new Date(2026, 0, 20),
      color: '#667eea'
    },
    {
      id: 2,
      name: 'Design Review',
      date: new Date(2026, 1, 5),
      color: '#f6ad55'
    }
  ];

  // Exemplo com hierarquia
  hierarchicalTasks: GanttTask[] = [
    {
      id: 1,
      name: 'Projeto Website',
      startDate: new Date(2026, 0, 20),
      endDate: new Date(2026, 2, 15),
      progress: 45,
      color: '#667eea',
      priority: 'high',
      collapsed: false
    },
    {
      id: 2,
      name: 'Frontend',
      startDate: new Date(2026, 0, 22),
      endDate: new Date(2026, 1, 28),
      progress: 60,
      color: '#48bb78',
      priority: 'high',
      parentId: 1
    },
    {
      id: 3,
      name: 'Componentes UI',
      startDate: new Date(2026, 0, 22),
      endDate: new Date(2026, 1, 10),
      progress: 80,
      color: '#48bb78',
      priority: 'medium',
      parentId: 2,
      assignee: 'Ana Costa'
    },
    {
      id: 4,
      name: 'Páginas',
      startDate: new Date(2026, 1, 8),
      endDate: new Date(2026, 1, 28),
      progress: 40,
      color: '#48bb78',
      priority: 'medium',
      parentId: 2,
      assignee: 'Carlos Lima'
    },
    {
      id: 5,
      name: 'Backend',
      startDate: new Date(2026, 0, 25),
      endDate: new Date(2026, 2, 5),
      progress: 30,
      color: '#f6ad55',
      priority: 'high',
      parentId: 1
    },
    {
      id: 6,
      name: 'API REST',
      startDate: new Date(2026, 0, 25),
      endDate: new Date(2026, 1, 15),
      progress: 50,
      color: '#f6ad55',
      priority: 'high',
      parentId: 5,
      assignee: 'Bruno Silva'
    },
    {
      id: 7,
      name: 'Banco de Dados',
      startDate: new Date(2026, 1, 10),
      endDate: new Date(2026, 2, 5),
      progress: 10,
      color: '#f6ad55',
      priority: 'medium',
      parentId: 5,
      assignee: 'Diana Santos'
    }
  ];

  hierarchicalMilestones: GanttMilestone[] = [
    {
      id: 1,
      name: 'Sprint 1',
      date: new Date(2026, 1, 10),
      color: '#667eea'
    },
    {
      id: 2,
      name: 'Sprint 2',
      date: new Date(2026, 2, 5),
      color: '#48bb78'
    }
  ];

  // TypeScript code
  typescriptCode = `import { Component } from '@angular/core';
import { GanttChartComponent, GanttTask, GanttMilestone } from '@muxima-ui/gantt-chart';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GanttChartComponent],
  template: \`
    <muxima-gantt-chart
      [tasks]="tasks"
      [milestones]="milestones"
      [startDate]="startDate"
      [endDate]="endDate"
      (taskClick)="onTaskClick($event)"
      (milestoneClick)="onMilestoneClick($event)">
    </muxima-gantt-chart>
  \`
})
export class ExampleComponent {
  tasks: GanttTask[] = [
    {
      id: 1,
      name: 'Planejamento',
      startDate: new Date(2026, 0, 20),
      endDate: new Date(2026, 0, 27),
      progress: 100,
      color: '#667eea'
    }
  ];

  milestones: GanttMilestone[] = [
    {
      id: 1,
      name: 'Kickoff',
      date: new Date(2026, 0, 20),
      color: '#667eea'
    }
  ];

  onTaskClick(task: GanttTask) {
    console.log('Task clicked:', task);
  }

  onMilestoneClick(milestone: GanttMilestone) {
    console.log('Milestone clicked:', milestone);
  }
}`;

  // HTML code
  htmlCode = `<muxima-gantt-chart
  [tasks]="tasks"
  [milestones]="milestones"
  [startDate]="startDate"
  [endDate]="endDate"
  [zoom]="'week'"
  [showWeekends]="true"
  (taskClick)="onTaskClick($event)"
  (taskDragEnd)="onTaskDragEnd($event)"
  (milestoneClick)="onMilestoneClick($event)">
</muxima-gantt-chart>`;

  // SCSS code
  scssCode = `// Customização do Gantt Chart
:host ::ng-deep {
  muxima-gantt-chart {
    .gantt-container {
      height: 600px;
    }

    .gantt-task-bar {
      &.high-priority {
        border-left: 4px solid #e53e3e;
      }
    }

    .gantt-milestone {
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}`;

  ganttTaskInterface = `interface GanttTask {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;          // 0-100
  color?: string;
  priority?: 'low' | 'medium' | 'high';
  parentId?: number;         // Para hierarquia
  collapsed?: boolean;       // Estado de colapso
  dependencies?: number[];   // IDs de tarefas dependentes
  assignee?: string;
  description?: string;
}`;

  ganttMilestoneInterface = `interface GanttMilestone {
  id: number;
  name: string;
  date: Date;
  color?: string;
}`;

  onTaskClick(task: GanttTask) {
    console.log('Task clicked:', task);
  }

  onMilestoneClick(milestone: GanttMilestone) {
    console.log('Milestone clicked:', milestone);
  }
}
