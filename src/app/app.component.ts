import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormPokemonComponent } from './components/form-pokemon/form-pokemon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-pokemon';

  constructor(
    private modalService: NgbModal
  ) { }


  openModal() {

    const modalRef = this.modalService.open(
      FormPokemonComponent,
      {
        size: 'md',
        backdrop: 'static',
        keyboard: false
      }

    );
  }

}
