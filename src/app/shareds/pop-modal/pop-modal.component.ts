import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-modal',
  templateUrl: './pop-modal.component.html',
  styleUrls: ['./pop-modal.component.scss']
})
export class PopModalComponent {

  @Input() firstName: any ;
  @Input() lastName: string = '';
  @Input() middleInitial: string = '';

  constructor(public modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
