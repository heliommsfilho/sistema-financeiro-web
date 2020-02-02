import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
                                     .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.httpClient.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
                          .toPromise()
                          .then(response => {
                            console.log(response);
                            this.armazenasToken(response['access_token']);
                          })
                          .catch(erro => {
                            console.log(erro);
                            if (erro.status === 400) {
                              if (erro.error.error === 'invalid_grant') {
                                return Promise.reject('Usuário ou senha inválida');
                              }
                            }

                            return Promise.reject(erro);
                          });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken() {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=refresh_token';

    return this.httpClient.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
        .then(response => {
          console.log(response);
          this.armazenasToken(response['access_token']);
          console.log('Novo access token criado');
          return Promise.resolve(null);
        })
      .catch(error => {
        console.log('Erro ao renovar token', error);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  private armazenasToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenasToken(token);
    }
  }
}
