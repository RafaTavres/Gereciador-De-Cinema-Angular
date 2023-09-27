import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-de-pesquisa',
  templateUrl: './barra-de-pesquisa.component.html',
  styleUrls: ['./barra-de-pesquisa.component.css']
})
export class BarraDePesquisaComponent {

  nomePesquisado:string;

  constructor(private router:Router){
    this.nomePesquisado = '';
  }

  pesquisar(){
    this.router.navigate(['/filmes','home']);
    setTimeout(()=> {this.router.navigate(['/filmes','busca',`${this.nomePesquisado}`])},100);
  }

}
