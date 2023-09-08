import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon-service.service';
import { UtilService } from 'src/app/services/util-service.service';
import Swal from 'sweetalert2';
import { FormPokemonComponent } from '../form-pokemon/form-pokemon.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss']
})
export class ListPokemonsComponent implements OnInit, OnDestroy {


  listPokemon: any[] = [];

  private subcription: Subscription
  constructor(
    private pokemonService: PokemonService,
    private utilService: UtilService,
    private modalService: NgbModal
  ) {
    this.getAllPokemon();
  }

  ngOnInit(): void {

    this.subcription = this.utilService.reloadPokemon$.subscribe(
      (res) => {
        this.getAllPokemon();
      }
    );


  }
  getAllPokemon() {

    this.pokemonService.getAllPokemon()
      .subscribe((res: any) => {
        // console.log(res);
        this.listPokemon = res.data;
      });
  }


  ngOnDestroy(): void {

    this.subcription.unsubscribe();

  }

  removePokemon(id: number) {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this pokemon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'

    }).then((result) => {
      if (result.isConfirmed) {

        this.pokemonService.deletePokemon(id)
          .subscribe((res: any) => {
            // console.log(res);
            this.getAllPokemon();
          });
      }
    })
  }


  editPokemon(id: number) {

    const modalRef = this.modalService.open(
      FormPokemonComponent,
      {
        size: 'md',
        backdrop: 'static',
        keyboard: false
      }
    );

    modalRef.componentInstance.idEdit = id;
  
  }


}
