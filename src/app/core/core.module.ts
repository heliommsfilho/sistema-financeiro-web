import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/components/common/api';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriasService } from '../categorias/categorias.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncotradaComponent } from './pagina-nao-encotrada.component';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../seguranca/auth.service';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncotradaComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastyModule.forRoot(),
    RouterModule
  ], exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    CategoriasService,
    PessoaService,
    AuthService,

    ConfirmationService,
    Title
  ]
})
export class CoreModule { }
