import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast } from 'src/app/models/cast';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhes-pessoas',
  templateUrl: './detalhes-pessoas.component.html',
  styleUrls: ['./detalhes-pessoas.component.css']
})
export class DetalhesPessoasComponent implements OnInit{

  pessoa:Cast;
  constructor(private route: ActivatedRoute,private filmeService:FilmeService){
    this.pessoa = new Cast(0,'','','',[],[],'');
  }
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.filmeService.selecionarPessoaPorId(id).subscribe((pessoa) =>{
      this.pessoa = pessoa
      console.log(this.pessoa)
    });
  }

}
