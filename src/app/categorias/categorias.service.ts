import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private httpClient: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  listarTodas(): Promise<any> {
    return this.httpClient.get(`${this.categoriasUrl}` )
                          .toPromise()
                          .then(res => res)
                          .catch(erro => this.errorHandler.handle(erro));
  }
}
