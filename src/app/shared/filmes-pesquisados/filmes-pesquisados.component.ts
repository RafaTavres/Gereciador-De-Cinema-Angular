import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Filme } from 'src/app/models/Filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filmes-pesquisados',
  templateUrl: './filmes-pesquisados.component.html',
  styleUrls: ['./filmes-pesquisados.component.css']
})
export class FilmesPesquisadosComponent implements OnInit, OnChanges{

  page = 1;
  filmes: Filme[] = [];
  @Input() nome: string | null;
  constructor(private filmeService:FilmeService,private toastService:ToastrService) { this.nome = ''}
  
  
  ngOnInit(): void {
    this.selecionarFilmesPorNome(this.nome);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.selecionarFilmesPorNome(this.nome);
  }

  selecionarFilmesPorNome(nome: string | null){
    if(nome == null){
      return;
    }
    this.filmeService.selecionarFilmesPorNome(this.page,nome).subscribe((filmes: Filme[]) => {
      this.filmes = filmes
      if(filmes.length == 0){
         this.filmes = []
         this.toastService.warning('Nenhum Filme encontrado','Falha');
      }
    });
    
  }
  
  pesquisar(nome:string | null){
    this.selecionarFilmesPorNome(nome);
  }

  mudarDePagina(){
    setTimeout(()=> {this.selecionarFilmesPorNome(this.nome)},100)
  }

}
