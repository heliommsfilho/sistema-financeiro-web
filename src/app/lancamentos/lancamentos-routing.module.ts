import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {NgModule} from '@angular/core';
import {LancamentosPesquisaComponent} from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import {LancamentoCadastroComponent} from './lancamento-cadastro/lancamento-cadastro.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
];

registerLocaleData(localePt, 'pt-BR');

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LancamentosRoutingModule { }
