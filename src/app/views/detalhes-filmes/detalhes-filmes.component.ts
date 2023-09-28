import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cast } from 'src/app/models/cast';
import { Filme } from 'src/app/models/Filme';
import { Genero } from 'src/app/models/genero';
import { HistoricoFavoritos } from 'src/app/models/historico-favoritos';
import { Video } from 'src/app/models/video';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-detalhes-filmes',
  templateUrl: './detalhes-filmes.component.html',
  styleUrls: ['./detalhes-filmes.component.css'],
  
})
export class DetalhesFilmesComponent  implements OnInit{
  filme:Filme;
  chave= `https://www.youtube.com/embed/zcAalMeaKso?si=TNL949XOAUbvX4lB`;
  safeurl:any;
  generos:Genero[];

  listaDeAtores:Cast[] = [];
  listaDeDiretores:Cast[] = [];
  listaDeEscritores:Cast[] = [];


  constructor(private filmeService:FilmeService,private route: ActivatedRoute,private toastService:ToastrService,private localStorageService: LocalStorageService){
    this.filme = new Filme( '','',false,'',10,[]);
    this.generos = [];
  }



  ngOnInit(): void {
      const id:number = parseInt(this.route.snapshot.paramMap.get('id')!);

      this.filmeService.selecionarFilmePorId(id)!.subscribe((filme) => {
        this.filme = filme;

        for(let filmeFavorito of this.filmeService.selecionarFavoritos()){
          if(filmeFavorito.id == filme.id){
            filme.favorito = true
          }
        }

        this.filmeService.buscarVideo(this.filme.id).subscribe((video: Video)=> 
        {
          this.chave = `https://www.youtube.com/embed/${video.key}?si=IaFskl1A5pV1uf6Z&amp;controls=video.key`;
          this.safeurl = this.filmeService.limparURL(this.chave);
        });

         this.filmeService.pegarGenerosDoFilmes(filme).subscribe((genres) => this.generos = genres);

         this.filmeService.selecionarCreditoDoFilme(filme).subscribe((credito) => 
          {
            this.listaDeDiretores = this.pegarListaDosCreditos(credito.crew,'Directing')
            this.listaDeAtores = this.pegarListaDosCreditos(credito.cast,'Acting');
            this.listaDeEscritores = this.pegarListaDosCreditos(credito.crew,'Writing');
          }
         );
   
      });

      
  }

  favoritar(){
    this.filme.favorito = true
    this.filmeService.registrarFavorito(this.filme);
    this.atualizarFavoritos();
    this.toastService.success('Adicionado aos Favoritos','Sucesso',)
  }

  desfavoritar(){
    this.filme.favorito = false
    this.filmeService.removerFavorito(this.filme);
    this.atualizarFavoritos();
    this.toastService.success('Removido dos Favoritos','Sucesso')
  }
  
  private atualizarFavoritos(): void {
    this.localStorageService.salvarDados(this.filmeService.historico);
  }

  private pegarListaDosCreditos(credito: Cast[], tipo: string): any[] {
    let list:Cast[] = [];

    for(let cast of credito){
        if(!list.includes(cast)){
            if(cast.known_for_department == tipo){
                list.push(cast);
            }
        }             
    }
    return list;

  }
}
