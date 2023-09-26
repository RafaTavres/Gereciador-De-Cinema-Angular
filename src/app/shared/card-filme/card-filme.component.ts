import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/Filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent {

  @Input() filme: Filme = {
    title: '',
    overview:'',
    video: false,
    poster:'',
    vote_count:10,
    genres:[],
    favorito: false

  };
  constructor(private router:Router) {}
  
}
