import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() desativarBusca: boolean = false;

  @Output() onPesquisa: EventEmitter<string | null>

  @Output() onVoltar: EventEmitter<boolean>

  constructor(){
    this.onPesquisa = new EventEmitter();
    this.onVoltar = new EventEmitter();
  }

  pesquisar(nome:string | null){
    this.onPesquisa.emit(nome);
  }

  voltar(){
    this.onVoltar.emit(true);
  }
}
