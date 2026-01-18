import { Component, Input } from '@angular/core';
import { DialogService } from './dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'agt-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() id!: string

  @Input() title!: string
  @Input() subtitle?: string
  @Input() icon?: string

  isOpen = false

  constructor(private dialogService: DialogService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.dialogService.isOpen$(this.id).subscribe(state => {
      this.isOpen = state
    })
  }

  close() {
    this.dialogService.close(this.id)
  }
}
