import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nomeBuscado:string | null;
  busca:boolean;

  ativarLayoutBusca(nome:string | null){
    this.nomeBuscado = nome;
    this.busca = true
  }

  desativarLayoutBusca(){
    this.busca = false
  }

  constructor() {
    this.busca = false
    this.nomeBuscado = '';
  }
}
