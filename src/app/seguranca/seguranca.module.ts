import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import {SegurancaRoutingModule} from './seguranca-routing.module';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => ''
    }})
  ],
  providers: [ JwtHelperService ]
})
export class SegurancaModule { }
