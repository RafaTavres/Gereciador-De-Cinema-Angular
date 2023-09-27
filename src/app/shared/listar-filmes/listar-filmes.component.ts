import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Filme } from 'src/app/models/Filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-listar-filmes',
  templateUrl: './listar-filmes.component.html',
  styleUrls: ['./listar-filmes.component.css']
})
export class ListarFilmesComponent implements OnInit {

  page = 1;
  filmes: Filme[] = [];
  _tipo:string | null;

  constructor(private filmeService:FilmeService,private toastService:ToastrService) 
  {
    this._tipo = 'popular';
  }

  ngOnInit(): void {
   this.selecionarTodosFilmes();
  }

  selecionarTodosFilmes(){
    this.filmeService.selecionarFilmesPopulares(this.page).subscribe((filmes: Filme[]) => {
      this.filmes = filmes
    });
  }

  selecionarFavoritos(){
    this.filmes = this.filmeService.selecionarFavoritos();
    if(this.filmes.length == 0){
      this.toastService.warning('Nenhum Filme encontrado','Falha');
    }
  }

  selecionarFilmesPorTipo(tipo: string){
    this.filmeService.selecionarFilmesPorTipo(this.page,tipo).subscribe((filmes: Filme[]) => {
      this.filmes = filmes
    });
  }

  filtrarFilmesPorTipo(tipo: string|null) {

    this._tipo = tipo;
    
    if(this._tipo == null){
      this.selecionarTodosFilmes();
      return;
    }

    if(this._tipo == 'favoritos'){
      this.selecionarFavoritos();
      return;
    }

    this.selecionarFilmesPorTipo(this._tipo);
  }


  mudarDePagina(){
    setTimeout(()=> {this.filtrarFilmesPorTipo(this._tipo)},100)
  }
}
