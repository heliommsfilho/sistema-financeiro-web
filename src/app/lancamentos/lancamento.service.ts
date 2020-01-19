import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private httpClient: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.httpClient.get(`${this.lancamentosUrl}?resumo`, { headers, params})
                          .toPromise().then(response => {
                            const lancamentos = response['content'];
                            return { lancamentos, total: response['totalElements'] };
                          });
  }

  buscarPorCodigo(codigo: number) {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.httpClient.get(`${this.lancamentosUrl}/${codigo}`, { headers })
                          .toPromise().then(response => {
                            const lancamento = response as Lancamento;
                            this.converterStringsParaDatas([lancamento]);

                            return lancamento;
                          });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
                          .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
                          .toPromise()
                          .then(response => {
                            const lancamentoAlterado = response as Lancamento;
                            this.converterStringsParaDatas([lancamentoAlterado]);

                            return lancamentoAlterado;
                          });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.httpClient.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
                          .toPromise()
                          .then(() => null);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
