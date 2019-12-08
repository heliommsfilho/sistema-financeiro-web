import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private httpClient : HttpClient) { }

  pesquisar(filtro: LancamentoFiltro) : Promise<any> {
    let params = new HttpParams();

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.httpClient.get(`${this.lancamentosUrl}?resumo`, { headers, params})
                          .toPromise().then(response => response['content']);
  }
}
