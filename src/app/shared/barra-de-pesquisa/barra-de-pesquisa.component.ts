import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barra-de-pesquisa',
  templateUrl: './barra-de-pesquisa.component.html',
  styleUrls: ['./barra-de-pesquisa.component.css']
})
export class BarraDePesquisaComponent {

  nomePesquisado:string;
  
  constructor(){
    this.nomePesquisado = '';
  }

}
