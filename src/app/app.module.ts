import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { FiltroPorCategoriaComponent } from './shared/filtro-por-categoria/filtro-por-categoria.component';
import { DetalhesFilmesComponent } from './views/detalhes-filmes/detalhes-filmes.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { ListarFilmesComponent } from './shared/listar-filmes/listar-filmes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SafePipe } from './pipe/safe.pipe';
import { CommonModule, ImageLoaderConfig, IMAGE_LOADER, NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { BarraDePesquisaComponent } from './shared/barra-de-pesquisa/barra-de-pesquisa.component';
import { FilmesPesquisadosComponent } from './views/filmes-pesquisados/filmes-pesquisados.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FiltroPorCategoriaComponent,
    DetalhesFilmesComponent,
    CardFilmeComponent,
    ListarFilmesComponent,
    SafePipe,
    BarraDePesquisaComponent,
    FilmesPesquisadosComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    YouTubePlayerModule,
    CommonModule,
    NgOptimizedImage,

    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-bottom-right',
      preventDuplicates:true,
   }),
   
   
  ],
  
  providers: [
    {  provide: IMAGE_LOADER,
       useValue: (config: ImageLoaderConfig) => {
       return `https://image.tmdb.org/t/p/w500/${config.src}`;}
  
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
