import { Component, EventEmitter, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer){}
  transform(value:string) {
    return this.sanitized.bypassSecurityTrustHtml(value)
  }
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  onOk: EventEmitter<any> = new EventEmitter()
  onCancel: EventEmitter<any> = new EventEmitter()
  private backdrop!: HTMLElement
  title!: string
  description!: string
  style: any
  showClose!: boolean
  showSaveChanges!: boolean
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  okClicked() {
    this.onOk.emit()
  }

  cancelClicked() {
    this.onCancel.emit()
  }

  show(title: string, description: string, showSaveChanges: boolean, showClose: boolean) {
    this.document.body.classList.add('modal-open')
    this.style = { 'display': 'block' }
    this.title = title
    this.description = description
    this.showSaveChanges = showSaveChanges
    this.showClose = showClose
    this.showBackdrop()
  }

  hide() {
    this.document.body.classList.remove('modal-open')
    this.style = { 'display': 'none' }
    this.hideBackdrop()
  }

  showBackdrop() {
    this.backdrop = this.document.createElement('div')
    this.backdrop.classList.add('modal-backdrop')
    this.backdrop.classList.add('show')
    if (this.document.getElementsByClassName('app-main__inner')[0]) {
      this.document.getElementsByClassName('app-main__inner')[0].appendChild(this.backdrop)
    } else {
      this.document.body.appendChild(this.backdrop)
    }
  }

  hideBackdrop() {
    this.backdrop.remove()
  }

  ngOnDestroy(): void {
    if (this.backdrop) {
      this.hideBackdrop()
    }
  }
}
