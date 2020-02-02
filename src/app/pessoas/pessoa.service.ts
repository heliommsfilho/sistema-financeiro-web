import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ErrorHandlerService} from '../core/error-handler.service';
import {Pessoa} from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private httpClient: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  pesquisar(filtro: PessoaFiltro) {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    console.log('Nome', filtro.nome);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.httpClient.get(`${this.pessoasUrl}`, { params })
                          .toPromise().then(response => {
                            const pessoas = response['content'];
                            const resultado = { pessoas, total: response['totalElements'] };
                            return resultado;
                          });
  }

  listarTodos() {
    return this.httpClient.get(`${this.pessoasUrl}` )
                          .toPromise().then(response => {
                            const pessoas = response['content'];
                            const resultado = { pessoas, total: response['totalElements'] };
                            return resultado;
                          });
  }

  mudarStatus(codigo: number, ativo: boolean) {
    return this.httpClient.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo )
                          .toPromise()
                          .then(() => null);
  }

  adicionar(pessoa: Pessoa) {
    return this.httpClient.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa) )
                          .toPromise();
  }

  excluir(codigo: number) {
    return this.httpClient.delete(`${this.pessoasUrl}/${codigo}` )
                          .toPromise()
                          .then(() => null)
                          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.httpClient.put(`${this.pessoasUrl}/${pessoa.codigo}`,
      JSON.stringify(pessoa))
      .toPromise()
      .then(response => response as Pessoa);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.httpClient.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response as Pessoa);
  }
}
