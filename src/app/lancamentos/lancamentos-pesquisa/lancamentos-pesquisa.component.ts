import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao : string;
  dataVencimentoInicio : Date;
  davaVencimentoFim : Date;
  lancamentos = [];

  constructor(private lancamentoService : LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
  const filtro: LancamentoFiltro = {
    descricao: this.descricao,
    dataVencimentoInicio: this.dataVencimentoInicio,
    dataVencimentoFim: this.davaVencimentoFim
  };

    this.lancamentoService.pesquisar(filtro)
                          .then(lancamentos => this.lancamentos = lancamentos);
  }
}
