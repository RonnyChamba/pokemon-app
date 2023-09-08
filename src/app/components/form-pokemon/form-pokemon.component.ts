import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of, tap } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon-service.service';
import { UtilService } from 'src/app/services/util-service.service';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.scss']
})
export class FormPokemonComponent implements OnInit {

  title = 'New Pokemon';
  form: FormGroup;
  formSearch: FormGroup;
  data: any;

  defaultImage = '../../../assets/images/default_pokemon.png';

  messageFlag= "Here will show your pokemon"

  @Input() idEdit: any;

  constructor(
    public modal: NgbActiveModal,
    private pokemonService: PokemonService,
    private utilService: UtilService
  ) {
    this.createForm();

  }

  ngOnInit(): void {

    if (this.idEdit) {

      this.title = 'Edit Pokemon';
      this.formSearch.patchValue({ ide: this.idEdit });
      this.formSearch.get('ide')?.disable();
      this.findPokemon();
      // console.log(this.idEdit);

    }

  }
  createForm() {

    this.formSearch = new FormGroup({
      ide: new FormControl('', Validators.required),
    });

    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', []),
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      image: new FormControl('', []),
    });
  }

  onSubmit() {

    if (this.formSearch.invalid) {
      alert('Formulario invalido');
      return;
    }
    this.pokemonService.findPokemon(this.formSearch.value.ide)

      .pipe(
        tap((res: any) => {
          console.log(res);
          this.data = res;
          this.populateForm();
        }
        ),
        catchError((err) => {

          console.log(err);
          this.messageFlag= err.error.message;
          return of(null);
        })
      )
      .subscribe();

  }

  populateForm() {
    this.form.patchValue(this.data, { emitEvent: false });
  }

  onSave() {

    if (this.form.invalid) {
      alert('Invalid form');
      return;
    }

    this.pokemonService.savePokemon(this.form.value, this.idEdit)
      .pipe(
        tap((res: any) => {
          console.log(res);
          this.modal.close();
          this.utilService.reloadPokemon$.next(true);
        }
        ),
        catchError((err) => {

          console.log(err);
          return of(null);
        })
      )
      .subscribe();

  }

  findPokemon() {

    this.pokemonService.findEditPokemon(this.idEdit)

      .pipe(
        tap((res: any) => {
          // console.log(res);
          this.data = res;
          this.populateForm();

          // console.log(this.form);
        }
        ),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe();

  }
}
