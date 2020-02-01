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
    return this.httpClient.post(this.oauthTokenUrl, body, { headers })
                          .toPromise()
                          .then(response => {
                            console.log(response);
                            this.armazenasToken(response['access_token']);
                          })
                          .catch(erro => {
                            console.log(erro);
                          });
  }

  private armazenasToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenasToken(token);
    }
  }
}
