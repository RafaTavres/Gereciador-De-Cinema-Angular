import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barra-de-pesquisa',
  templateUrl: './barra-de-pesquisa.component.html',
  styleUrls: ['./barra-de-pesquisa.component.css']
})
export class BarraDePesquisaComponent {

  @Output() onNomePesquisado: EventEmitter<string>

  nomePesquisado:string;
  constructor(){
    this.onNomePesquisado = new EventEmitter();
    this.nomePesquisado = '';
  }

  pesquisarFilme() {
    this.onNomePesquisado.emit(this.nomePesquisado);
  }

}
