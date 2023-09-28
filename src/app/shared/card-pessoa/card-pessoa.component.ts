import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cast } from 'src/app/models/cast';

@Component({
  selector: 'app-card-pessoa',
  templateUrl: './card-pessoa.component.html',
  styleUrls: ['./card-pessoa.component.css']
})
export class CardPessoaComponent {

  @Input() pessoa: Cast = {
    id:0,
    known_for_department: '',
    name:'',
    profile_path:'',
    movie_credits_cast:[],
    movie_credits_crew:[],
    biography:''
  };
  constructor(private router:Router) {}
}
