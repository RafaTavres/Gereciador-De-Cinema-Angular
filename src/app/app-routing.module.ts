import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesPesquisadosComponent } from './views/filmes-pesquisados/filmes-pesquisados.component';
import { DetalhesFilmesComponent } from './views/detalhes-filmes/detalhes-filmes.component';
import { HomeComponent } from './views/home/home.component';
import { DetalhesPessoasComponent } from './views/detalhes-pessoas/detalhes-pessoas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes/home',
    pathMatch: 'full',
  },
  {
    path: 'filmes/home',
    component: HomeComponent,
  }
  ,
  {
    path: 'filmes/detalhes/:id',
    component: DetalhesFilmesComponent,
  }
  ,
  {
    path: 'filmes/busca/:nome',
    component: FilmesPesquisadosComponent,
  }
  ,
  {
    path: 'pessoas/detalhes/:id',
    component: DetalhesPessoasComponent,
  }

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
