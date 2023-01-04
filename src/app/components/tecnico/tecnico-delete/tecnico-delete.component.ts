import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService, 
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis = [];
      this.tecnico = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.tecnico.id).subscribe(
      data => {this.toast.success('Técnico Deletao com Sucesso', 'Deletar');
      this.router.navigate(['tecnicos'])
    },
      err => this.toast.error(err.error.message)
    )
  }


}
