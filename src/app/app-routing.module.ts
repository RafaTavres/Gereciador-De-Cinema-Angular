import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesFilmesComponent } from './views/detalhes-filmes/detalhes-filmes.component';
import { HomeComponent } from './views/home/home.component';

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

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
