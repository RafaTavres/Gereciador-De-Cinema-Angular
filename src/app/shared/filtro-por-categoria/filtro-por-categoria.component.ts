import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-por-categoria',
  templateUrl: './filtro-por-categoria.component.html',
  styleUrls: ['./filtro-por-categoria.component.css']
})
export class FiltroPorCategoriaComponent {

  
  @Output() onFiltroSelecionado: EventEmitter<string | null>

  constructor(){
    this.onFiltroSelecionado = new EventEmitter();
  }

  selecionarComFiltro(tipo: string) {
    this.onFiltroSelecionado.emit(tipo);
  }

  selecionarFavoritos(favorito: string) {
    this.onFiltroSelecionado.emit(favorito);
  }

}
