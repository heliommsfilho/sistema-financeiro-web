import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();

  /* Acessa a instância do Table via código TypeScript */
  @ViewChild('tabela', { static: true }) tabela: Table;

  lancamentos = [];

  constructor(private lancamentoService : LancamentoService,
              private toasty: ToastyService) { }

  ngOnInit() { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
                          .then(resultado => { 
                            this.totalRegistros = resultado.total;
                            this.lancamentos = resultado.lancamentos
                          });
  }

  aoMudarPagina(event : LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.tabela.reset();

        this.toasty.success('Lançamento excluído com sucesso!');
      });
  }
}
