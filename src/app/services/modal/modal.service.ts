import { Injectable } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalComponent!: ModalComponent

  register(modalComponent: ModalComponent) {
    this.modalComponent = modalComponent
  }

  show(title: string, description: string, showSaveChanges: boolean = false, showClose: boolean = true) {
    return new Promise((resolve: any, reject: any) => {
      this.modalComponent.show(title, description, showSaveChanges, showClose)
      this.modalComponent.onOk.subscribe(() => {
        this.modalComponent.hide()
        resolve()
      })
      this.modalComponent.onCancel.subscribe(() => {
        this.modalComponent.hide()
        reject()
      })
    })
  }
}
