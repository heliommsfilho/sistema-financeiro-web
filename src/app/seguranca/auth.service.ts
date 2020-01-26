import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private httpClient: HttpClient) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
                                     .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.httpClient.post(this.oauthTokenUrl, body, { headers })
                          .toPromise()
                          .then(response => {
                            console.log(response);
                          })
                          .catch(erro => {
                            console.log(erro);
                          });
  }
}
