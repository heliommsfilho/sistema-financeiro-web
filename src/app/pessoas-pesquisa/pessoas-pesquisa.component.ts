import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {

  pessoas = [
    { nome: 'Hélio Márcio Filho', cidade: 'Uauá', estado: 'Bahia', ativo: true },
    { nome: 'Yanadrah Stefany Lisboa', cidade: 'Petrolina', estado: 'Pernambuco', ativo: true },
    { nome: 'Ana Karla', cidade: 'Uauá', estado: 'Bahia', ativo: false },
    { nome: 'Luciana da Silva Félix', cidade: 'Uauá', estado: 'Bahia', ativo: true },
    { nome: 'Ellison Alexandre', cidade: 'Juazeiro', estado: 'Bahia', ativo: false },
    { nome: 'Marcia Elpídio', cidade: 'Serra da Canabrava', estado: 'Bahia', ativo: false },
    { nome: 'Hélio Márcio Santos', cidade: 'Uauá', estado: 'Bahia', ativo: true }
  ];
}
