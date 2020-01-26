import {LancamentosModule} from './lancamentos/lancamentos.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PessoasModule} from './pessoas/pessoas.module';
import {CoreModule} from './core/core.module';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {AppRoutingModule} from './app-routing.module';
import {SegurancaModule} from './seguranca/seguranca.module';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
