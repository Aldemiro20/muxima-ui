import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class DialogService {
  private dialogState: Record<string, BehaviorSubject<boolean>> = {}

  private getDialogSubject(id: string): BehaviorSubject<boolean> {
    if (!this.dialogState[id]) {
      this.dialogState[id] = new BehaviorSubject<boolean>(false)
    }

    return this.dialogState[id]
  }

  isOpen$(id: string) {
    return this.getDialogSubject(id).asObservable()
  }

  open(id: string) {
    this.getDialogSubject(id).next(true)
  }

  close(id: string) {
    this.getDialogSubject(id).next(false)
  }
}
