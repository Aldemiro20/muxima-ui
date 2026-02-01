import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipChipComponent } from '@muxima-ui/chip';

@Component({
  selector: 'app-chip-doc',
  standalone: true,
  imports: [CommonModule, ChipChipComponent],
  templateUrl: './chip-doc.component.html',
  styleUrls: ['./chip-doc.component.scss']
})
export class ChipDocComponent implements OnInit {
  copiedStates: { [key: string]: boolean } = {};
  codeExamples: { [key: string]: string } = {};

  // Código de instalação e importação
  importCode = `npm install @muxima-ui/chip`;
  basicCode = `<muxima-chip label="Angular" icon="???"></muxima-chip>`;

  // Estados dos chips para exemplos interativos
  basicChips = [
    { label: 'Angular', icon: '???', color: 'primary' as const },
    { label: 'TypeScript', icon: '??', color: 'info' as const },
    { label: 'RxJS', icon: '??', color: 'success' as const }
  ];

  statusChips = [
    { label: 'Ativo', icon: '?', color: 'success' as const },
    { label: 'Pendente', icon: '?', color: 'warning' as const },
    { label: 'Erro', icon: '?', color: 'danger' as const },
    { label: 'Info', icon: '??', color: 'info' as const }
  ];

  removableChips = [
    { label: 'JavaScript', icon: '??', color: 'warning' as const },
    { label: 'Python', icon: '??', color: 'success' as const },
    { label: 'Java', icon: '?', color: 'danger' as const },
    { label: 'Go', icon: '??', color: 'info' as const }
  ];

  selectedItems = ['Angular', 'TypeScript'];

  ngOnInit() {
    this.initializeCodeExamples();
  }

  initializeCodeExamples() {
    this.codeExamples = {
      basic: `<muxima-chip label="Angular" icon=""></muxima-chip>`,

      colors: `<!-- Default -->
<muxima-chip label="Default" color="default"></muxima-chip>

<!-- Primary -->
<muxima-chip label="Primary" color="primary"></muxima-chip>

<!-- Success -->
<muxima-chip label="Success" color="success"></muxima-chip>

<!-- Warning -->
<muxima-chip label="Warning" color="warning"></muxima-chip>

<!-- Danger -->
<muxima-chip label="Danger" color="danger"></muxima-chip>

<!-- Info -->
<muxima-chip label="Info" color="info"></muxima-chip>`,

      sizes: `<!-- Small -->
<muxima-chip label="Small" size="sm"></muxima-chip>

<!-- Medium (padrão) -->
<muxima-chip label="Medium" size="md"></muxima-chip>

<!-- Large -->
<muxima-chip label="Large" size="lg"></muxima-chip>`,

      variants: `<!-- Filled (padrão) -->
<muxima-chip label="Filled" variant="filled"></muxima-chip>

<!-- Outlined -->
<muxima-chip label="Outlined" variant="outlined"></muxima-chip>

<!-- Light -->
<muxima-chip label="Light" variant="light"></muxima-chip>`,

      withIcons: `<!-- Icon Left -->
<muxima-chip label="Angular" icon=""></muxima-chip>

<!-- Icon Right -->
<muxima-chip label="Next" icon="" iconPosition="right"></muxima-chip>

<!-- With Avatar -->
<muxima-chip label="User" avatar="/assets/avatar.jpg"></muxima-chip>`,

      removable: `<muxima-chip 
  label="Removable"
  [removable]="true"
  (removed)="onChipRemoved()">
</muxima-chip>`,

      clickable: `<muxima-chip 
  label="Click me"
  [clickable]="true"
  (clicked)="onChipClicked()">
</muxima-chip>`,

      selectable: `<muxima-chip 
  label="Selectable"
  [selected]="isSelected"
  (clicked)="toggleSelection()">
</muxima-chip>`,

      disabled: `<muxima-chip label="Disabled" [disabled]="true"></muxima-chip>`,
    };
  }

  copyCode(example: string) {
    const code = this.codeExamples[example as string];
    navigator.clipboard.writeText(code);
    this.copiedStates[example] = true;
    setTimeout(() => {
      this.copiedStates[example] = false;
    }, 2000);
  }

  removeChip(index: number) {
    this.removableChips.splice(index, 1);
  }

  toggleSelection(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }
}

