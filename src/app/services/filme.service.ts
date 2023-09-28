import { Injectable, SecurityContext } from "@angular/core";
import { filter, map, Observable,of,tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Filme } from "../models/Filme";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { Video } from "../models/video";
import { SafePipe } from "../pipe/safe.pipe";
import { Genero } from "../models/genero";
import { Credito } from "../models/credito";
import { HistoricoFavoritos } from "../models/historico-favoritos";
import { LocalStorageService } from "./local-storage.service";
import { Cast } from "../models/cast";

@Injectable({
    providedIn:'root'
})
export class FilmeService{
    
    
    historico:HistoricoFavoritos;
    constructor(private http: HttpClient, private sanitizer: DomSanitizer,private localStorageService: LocalStorageService)
    {
      this.historico = this.localStorageService.carregarDados();
    }

    safePipe: SafePipe = new SafePipe(this.sanitizer);

    private API_URL = `${environment.API_URL}`;

    
    registrarFavorito(filme:Filme): void {
        this.historico.filmes.push(filme);
    }
    
    removerFavorito(filme:Filme): void {   
      for(let film of this.selecionarFavoritos()){
        if(filme.title == film.title){
          this.historico.filmes.splice(this.selecionarFavoritos().indexOf(film),1);
        }
      }
    }
    
    selecionarFavoritos(): Filme[]{
        return this.historico.filmes;
    }

    selecionarFilmesPorNome(page: number, nome: string) {
      return this.http.get<any>(`${this.API_URL}/search/movie?query=${nome}&include_adult=false&language=pt-BR&page=${page}`
        ,this.ObterHeaderDeAutorizacao()).pipe(
            map((r: any) => r.results),
            map((results: any[]) => this.mapearListaFilme(results)),
        );
    }

    selecionarPessoasPorNome(page: number, nome: string) {
      return this.http.get<any>(`${this.API_URL}/search/person?query=${nome}&include_adult=false&language=pt-BR&page=${page}`
        ,this.ObterHeaderDeAutorizacao()).pipe(
            map((r: any) => r.results),
            map((results: any[]) => this.obterIdsDaLista(results))
        );
    } 

    selecionarFilmesPopulares(pagina:number): Observable<Filme[]>{

        return this.http.get<any>(`${this.API_URL}/movie/popular?language=pt-BR&page=${pagina}`
        ,this.ObterHeaderDeAutorizacao()).pipe(
            map((r: any) => r.results),
            map((results: any[]) => this.mapearListaFilme(results)),
        );
    }

    selecionarFilmePorId(id:number){

        return this.http.get<any>(`${this.API_URL}/movie/${id}?language=pt-BR`
        ,this.ObterHeaderDeAutorizacao()).pipe(map((r: any) => this.mapearFilme(r)));
    }

    selecionarPessoaPorId(id:number){

        return this.http.get<any>(`${this.API_URL}/person/${id}?append_to_response=movie_credits&language=pt-BR`
        ,this.ObterHeaderDeAutorizacao()).pipe(map((r: any) => this.mapearPessoa(r)));
    }

    buscarVideo(id: any) {
        return this.http.get<any>(`${this.API_URL}/movie/${id}/videos`
        ,this.ObterHeaderDeAutorizacao())
        .pipe(
            map((res) => res.results),
            map((obj) => this.mapearVideo(obj))
            );
    }

    selecionarFilmesPorTipo(pagina:number, tipo:string): Observable<Filme[]>{

        return this.http.get<any>(`${this.API_URL}/movie/${tipo}?language=pt-BR&page=${pagina}`
        ,this.ObterHeaderDeAutorizacao()).pipe(
            map((r: any) => r.results),
            map((results: any[]) => this.mapearListaFilme(results)),
        );
    }

    pegarGenerosDoFilmes(filme:Filme): Observable<Genero[]> {

        let generos:Genero[] = this.selecionarGeneros();
        let generosDoFilme: Genero[] = [];

        for (let genero of generos) {
            for (let generoDoFilme of filme.genres) {
                if (generoDoFilme.id == genero.id) {
                    generosDoFilme.push(genero);
                }
            }
        }
        const obsrGenero = of(generosDoFilme);
        return obsrGenero;
    }

    selecionarCreditoDoFilme(filme: Filme): Observable<Credito>{
       return this.http.get<any>(`${this.API_URL}/movie/${filme.id}/credits?language=pt-BR`
       ,this.ObterHeaderDeAutorizacao())
       .pipe(
            map((e) => this.mapearCredito(e))
        );
    }

    limparURL(url:any) {
        return this.safePipe.transform(url);
    }

    private mapearListaFilme(objs: any[]):Filme[]{
        return objs.map(obj => {
            return this.mapearFilme(obj);
        })
    }

    private mapearFilme(obj: any): Filme{  
        return new Filme (
            obj.title,
            obj.overview,
            obj.video,
            obj.poster_path,
            obj.vote_count,
            obj.genres,
            obj.id,
        )
    }

    private mapearPessoa(obj: any): Cast{  
      return new Cast(
          obj.id,
          obj.known_for_department,
          obj.name,
          obj.profile_path,
          this.mapearListaFilme(obj.movie_credits.cast),
          this.mapearListaFilme(obj.movie_credits.crew),
          obj.biography
        )
    }

    private obterIdsDaLista(objs: any): number[]{  
        return objs.map((obj: any) => {
          return obj.id;
      })
    }

    private ObterHeaderDeAutorizacao(){
        return {
            method:'GET',
            headers:{
                accept:'application/json',
                Authorization: `Bearer ${environment.API_KEY}`
            }
        }
    }

 

    private mapearVideo(obj: any): Video{
        try
        {
            return new Video(obj[0].key);

        }catch(Error){

            console.log(Error);
        }
        return new Video('');
    }

    private selecionarGeneros(): Genero[]{
        
        return[
              {
                "id": 28,
                "name": "Ação"
              },
              {
                "id": 12,
                "name": "Aventura"
              },
              {
                "id": 16,
                "name": "Animação"
              },
              {
                "id": 35,
                "name": "Comédia"
              },
              {
                "id": 80,
                "name": "Crime"
              },
              {
                "id": 99,
                "name": "Documentário"
              },
              {
                "id": 18,
                "name": "Drama"
              },
              {
                "id": 10751,
                "name": "Família"
              },
              {
                "id": 14,
                "name": "Fantasia"
              },
              {
                "id": 36,
                "name": "História"
              },
              {
                "id": 27,
                "name": "Terror"
              },
              {
                "id": 10402,
                "name": "Música"
              },
              {
                "id": 9648,
                "name": "Mistério"
              },
              {
                "id": 10749,
                "name": "Romance"
              },
              {
                "id": 878,
                "name": "Ficção científica"
              },
              {
                "id": 10770,
                "name": "Cinema TV"
              },
              {
                "id": 53,
                "name": "Thriller"
              },
              {
                "id": 10752,
                "name": "Guerra"
              },
              {
                "id": 37,
                "name": "Faroeste"
              }
        ]
    }

    private mapearCredito(obj: any): Credito{  
        return new Credito(
            obj.cast,
            obj.crew
            );
   
    }
}