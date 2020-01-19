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

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    console.log('Nome', filtro.nome);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.httpClient.get(`${this.pessoasUrl}`, { headers, params })
                          .toPromise().then(response => {
                            const pessoas = response['content'];
                            const resultado = { pessoas, total: response['totalElements'] };
                            return resultado;
                          });
  }

  listarTodos() {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.httpClient.get(`${this.pessoasUrl}`, { headers })
                          .toPromise().then(response => {
                            const pessoas = response['content'];
                            const resultado = { pessoas, total: response['totalElements'] };
                            return resultado;
                          });
  }

  mudarStatus(codigo: number, ativo: boolean) {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
                          .toPromise()
                          .then(() => null);
  }

  adicionar(pessoa: Pessoa) {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers })
                          .toPromise();
  }

  excluir(codigo: number) {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.httpClient.delete(`${this.pessoasUrl}/${codigo}`, { headers })
                          .toPromise()
                          .then(() => null)
                          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.put(`${this.pessoasUrl}/${pessoa.codigo}`,
      JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response as Pessoa);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.httpClient.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => response as Pessoa);
  }
}
