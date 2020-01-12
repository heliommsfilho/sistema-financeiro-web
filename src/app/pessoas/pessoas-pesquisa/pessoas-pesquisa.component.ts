import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {

  totalRegistros = 0;
  filtro = new PessoaFiltro();

  /* Acessa a instância do Table via código TypeScript */
  @ViewChild('tabela', { static: true }) tabela: Table;

  pessoas = [];

  constructor(private pessoasService: PessoaService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
                       .then(resultado => {
                         this.totalRegistros = resultado.total;
                         this.pessoas = resultado.pessoas;
                       });
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => { this.excluir(lancamento) }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
                       .then(() => {
                         this.tabela.reset();
                         this.toasty.success('Pessoa excluída com sucesso!');
                       })
                       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event : LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoasService.mudarStatus(pessoa.codigo, novoStatus)
                       .then(() => {
                         const acao = novoStatus ? 'ativada' : 'desativada';

                         pessoa.ativo = novoStatus;
                         this.toasty.success(`Pessoa ${acao} com sucesso!`);
                       })
                       .catch(erro => this.errorHandler.handle(erro));
  }
}
