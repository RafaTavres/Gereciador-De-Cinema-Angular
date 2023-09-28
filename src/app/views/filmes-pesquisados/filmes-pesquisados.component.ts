import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cast } from 'src/app/models/cast';
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
  pessoas: Cast[] = [];
  nome: string;
  verFilmes:boolean;
  verPessoas:boolean;

  constructor(private filmeService:FilmeService,private route: ActivatedRoute,private toastService:ToastrService) 
  { 
    this.verFilmes = true;
    this.verPessoas = false;
    this.nome = ''
  }
  
  
  ngOnInit(): void {
    this.nome = String(this.route.snapshot.paramMap.get('nome')!);
    this.selecionarFilmesPorNome(this.nome);
    this.selecionarPessoasPorNome(this.nome);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.nome = String(this.route.snapshot.paramMap.get('nome')!);
    this.selecionarFilmesPorNome(this.nome);
    this.selecionarPessoasPorNome(this.nome);
  }

  mostrarFilmes(){
    this.verPessoas = false;
    this.verFilmes = true
  }
  mostrarPessoas(){
    this.verFilmes = false
    this.verPessoas = true
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

  selecionarPessoasPorNome(nome: string | null){
    if(nome == null){
      return;
    }
    this.filmeService.selecionarPessoasPorNome(this.page,nome).subscribe((ids : number[]) => {

      for(let id of ids){
      
        this.filmeService.selecionarPessoaPorId(id).subscribe((pessoa: Cast) =>{
          this.pessoas.push(pessoa)
        })
      }

    });
  }
  
  mudarDePagina(){
    setTimeout(()=> {this.selecionarFilmesPorNome(this.nome)},100)
  }

}
